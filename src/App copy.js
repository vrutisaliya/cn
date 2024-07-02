import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export default function App() {
  const [selectedObject, setSelectedObject] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const fabricCanvas = useRef(null)

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas-id');
    fabricCanvas.current = canvas
    const newTextObject = new fabric.Text('Your paragraph text', {
      left: 50,
      top: 50,
      fontSize: 30,
      fontFamily: 'Arial',
      fill: 'blue',
      opacity: 1,
    });

    // abc._renderChar(method, ctx, lineIndex, charIndex, _char, left, top) {
    // }

    canvas.add(newTextObject);
    canvas.on('selection:created', (e) => {
      if (e.selected && e.selected.length > 0) {
        const selected = e.selected[0];
        if (selected.type === 'textbox' || selected.type === 'text') {
          setSelectedObject(selected);
        }
      }
    });

    canvas.on('selection:updated', (e) => {
      if (e.selected && e.selected.length > 0) {
        const selected = e.selected[0];
        if (selected.type === 'textbox' || selected.type === 'text') {
          setSelectedObject(selected);
        }
      }
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });
    return () => {
      canvas.dispose();
    };
  }, []);


  useEffect(() => {
    if (showAnimation && selectedObject && !animationStarted) {
      const canvas = selectedObject.canvas;
      canvas.discardActiveObject();
      const textObject = selectedObject;
      const fadeRate = 0.02;
      const maxBlur = 8;
      const animationTypeSpeed = 60;
      const originalOpacity = textObject.opacity;
      const originalLeft = textObject.left + textObject.width / 2;
      const originalTop = textObject.top;
      const lines = textObject._textLines;
      const lineHeights = textObject.__lineHeights;
      const lineWidths = textObject.__lineWidths;
      const charObjects = [];
      lines.forEach((line, lineIndex) => {
        const initialLeft = originalLeft - lineWidths[lineIndex] / 2;
        const yOffset = originalTop + lineIndex * lineHeights[lineIndex];

        let charLeft = initialLeft;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          const charObject = new fabric.Text(char, {
            left: charLeft,
            top: yOffset,
            fontSize: textObject.fontSize,
            fill: textObject.fill,
            fontFamily: textObject.fontFamily,
            opacity: 0,
            shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
            selectable: false,
            stroke: textObject.stroke,
            fontWeight: textObject.fontWeight,
          });
          charObjects.push(charObject);
          canvas.add(charObject);

          if (i === 0 && lineIndex === 0) {
            charLeft += charObject.width - 2.50;
          } else {
            charLeft += charObject.width;
          }
        }
      });
      let step = 0;
      const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);

      const animateChars = () => {
        fadeInOrder.forEach((charIndex, orderIndex) => {
          if (step >= orderIndex) {
            const charObject = charObjects[charIndex];
            const progress = Math.min(1, (step - orderIndex) * fadeRate);
            const blurLevel = maxBlur * (1 - progress);

            charObject.set({
              opacity: progress,
              shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
            });
          }
        });
        console.log("charObjects", charObjects)

        if (step < charObjects.length + 1 / fadeRate) {
          step++;
          setTimeout(animateChars, animationTypeSpeed);
        } else {
          textObject.set({ opacity: originalOpacity });
          canvas.remove(...charObjects);
          canvas.renderAll();
          setAnimationStarted(false);
        }
      };

      setTimeout(() => {
        textObject.set({ opacity: 0 });
        canvas.renderAll();
        animateChars();
        setAnimationStarted(true);
      }, animationTypeSpeed);
    }
  }, [showAnimation, selectedObject, animationStarted]);

  return (
    <div>
      {/* <HomePage /> */}
      <button onClick={() => setShowAnimation(!showAnimation)}>
        {showAnimation ? 'Stop Animation' : 'Animate Text'}
      </button>
      <canvas id='canvas-id' width={400} height={400}></canvas>
    </div>
  );
}
