  import React, { useEffect, useRef, useState } from 'react';
  import { fabric } from 'fabric';

  export default function TextAnimation() {
    const [showAnimation, setShowAnimation] = useState(false);
    const fabricCanvas = useRef(null);
    const selectedObject = useRef(null);

    useEffect(() => {
      const canvas = new fabric.Canvas('canvas-id', {
        width: 600,
        height: 400,
      });
      fabricCanvas.current = canvas;

      let newText = 'Your paragraph text';
      const newTextObject = new fabric.Textbox(newText, {
        left: 50,
        top: 50,
        fontSize: 30,
        fontFamily: 'Arial',
        fill: 'blue',
        opacity: 1,
      });
      canvas.add(newTextObject);
      selectedObject.current = newTextObject;

      newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
        ctx.save();
        ctx.font = this._getFontDeclaration(this);
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;

        const animationDuration = 1000; 
        const animationDelay = charIndex * 50; 
        const initialOpacity = 0;
        let animationStart = null;
        const fontSize = this.fontSize; 
        function animate(timestamp) {
          if (!animationStart) animationStart = timestamp;
          const progress = (timestamp - animationStart) / animationDuration;

          ctx.globalAlpha = initialOpacity + Math.min(progress, 1) * (1 - initialOpacity);
          ctx.fillText(_char, left, top + fontSize * 0.9); 

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        setTimeout(() => {
          requestAnimationFrame(animate);
        }, animationDelay);

        ctx.restore();
      };

      canvas.renderAll();

      return () => {
        canvas.dispose();
      };
    }, []);

    const startAnimation = () => {
      setShowAnimation(true);
      animateCharacters();
    };

    const animateCharacters = () => {
      const { current: canvas } = fabricCanvas;
      const { current: textObject } = selectedObject;

      if (!canvas || !textObject) return;

      const animationDuration = 1000;
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

      const animate = () => {
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

        canvas.renderAll();

        if (step < charObjects.length + 1 / fadeRate) {
          step++;
          setTimeout(animate, animationTypeSpeed);
        } else {
          textObject.set({ opacity: originalOpacity });
          canvas.remove(...charObjects);
          canvas.renderAll();
          setShowAnimation(false);
        }
      };

      setTimeout(() => {
        textObject.set({ opacity: 0 });
        canvas.renderAll();
        animate();
      }, animationTypeSpeed);
    };

    return (
      <div>
        <button onClick={startAnimation} disabled={showAnimation}>
          {showAnimation ? 'Animating...' : 'Start Animation'}
        </button>
        <canvas id='canvas-id' width={600} height={400}></canvas>
      </div>
    );
  }
