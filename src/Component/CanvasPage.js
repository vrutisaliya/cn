import React, { Fragment, useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { initAligningGuidelines, initCenteringGuidelines } from './fabric-addon';

const DesignCanvas = ({ width = 600, height = 500, animationStyle, setAnimationStyle, background = '#fff', showGrid: showGridProp = false, children }) => {
  const [canvas, setCanvas] = useState(null);
  const gridRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    console.log("selectedObject", selectedObject)
  }, [selectedObject])

  const renderGrid = () => {
    const gridCanvas = new fabric.Canvas(gridRef.current);
    const options = {
      distance: 10,
      param: {
        stroke: '#ebebeb',
        strokeWidth: 1,
        selectable: false,
      },
    };
    let gridLen = width / options.distance;

    for (let i = 0; i < gridLen; i++) {
      let distance = i * options.distance;
      let horizontal = new fabric.Line([distance, 0, distance, width], options.param);
      let vertical = new fabric.Line([0, distance, width, distance], options.param);
      gridCanvas.add(horizontal);
      gridCanvas.add(vertical);
      if (i % 5 === 0) {
        horizontal.set({ stroke: '#cccccc' });
        vertical.set({ stroke: '#cccccc' });
      }
    }
  };

  useEffect(() => {
    const mainCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: background,
      preserveObjectStacking: true,
    });

    initAligningGuidelines(fabric, mainCanvas);
    initCenteringGuidelines(fabric, mainCanvas);

    if (showGridProp) {
      renderGrid();
    }
    setCanvas(mainCanvas);

    mainCanvas.on('selection:created', (e) => {
      if (e.selected && e.selected.length > 0) {
        const selected = e.selected[0];
        if (selected.type === 'textbox' || selected.type === 'text') {
          console.log("selected", selected)
          setSelectedObject(selected);
        }
      }
    });

    mainCanvas.on('selection:updated', (e) => {
      if (e.selected && e.selected.length > 0) {
        const selected = e.selected[0];
        if (selected.type === 'textbox' || selected.type === 'text') {
          setSelectedObject(selected);
        }
      }
    });

    mainCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    return () => {
      mainCanvas.dispose();
      mainCanvas.off('selection:created');
      mainCanvas.off('selection:updated');
      mainCanvas.off('selection:cleared');
    };
  }, [background, showGridProp]);

  const renderedChildren = React.Children.map(children, child => {
    return React.cloneElement(child, {
      canvas: canvas,
    });
  });

  useEffect(() => {
    if (selectedObject && animationStyle?.clarifyAnimation === true) {
      clarifyAnimation();
    } else if (animationStyle?.fadeAnimation) {
      // fadeAnimation()
    }
  }, [animationStyle, selectedObject])

  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     console.log("selectedObject", selectedObject);
  //     canvas.discardActiveObject();
  //     const textObject = selectedObject;
  //     const fadeRate = 0.02;
  //     const maxBlur = 8;
  //     const animationTypeSpeed = 60;
  //     const originalOpacity = textObject.opacity;
  //     const originalLeft = textObject.left + 100;
  //     const originalTop = textObject.top;
  //     const lines = textObject._textLines;
  //     const lineHeights = textObject.__lineHeights;
  //     console.log("lines", lines);
  //     console.log("lineHeights", lineHeights);
  //     const charObjects = [];

  //     lines.forEach((line, lineIndex) => {
  //       const lineWidth = textObject.__lineWidths[lineIndex];
  //       const initialLeft = originalLeft - lineWidth / 2;
  //       const yOffset = originalTop + (lineIndex === 0 ? 0 : lineHeights[lineIndex - 1]);
  //       console.log(`lineIndex: ${lineIndex}, initialLeft: ${initialLeft}, yOffset: ${yOffset}`);

  //       let charLeft = initialLeft;
  //       for (let i = 0; i < line.length; i++) {
  //         const char = line[i];
  //         const charObject = new fabric.Text(char, {
  //           left: charLeft,
  //           top: yOffset,
  //           fontSize: textObject.fontSize,
  //           fill: textObject.fill,
  //           fontFamily: textObject.fontFamily,
  //           opacity: 0,
  //           shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //           selectable: false,
  //           stroke: textObject.stroke,
  //           fontWeight: textObject.fontWeight,
  //         });
  //         charObjects.push(charObject);
  //         canvas.add(charObject);

  //         if (i === 0 && lineIndex === 0) {
  //           charLeft += charObject.width - 2.50;
  //           console.log("charLeft +++", charLeft)
  //         } else {
  //           console.log("charLeft ---", charLeft)
  //           charLeft += charObject.width;
  //         }
  //         console.log(`char: ${char}, charLeft: ${charLeft}`);
  //       }
  //     });

  //     let step = 0;
  //     const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);

  //     const animate = () => {
  //       fadeInOrder.forEach((charIndex, orderIndex) => {
  //         if (step >= orderIndex) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);
  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });
  //       canvas.renderAll();
  //       if (step < charObjects.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       } else {
  //         textObject.set({ opacity: originalOpacity });
  //         canvas.remove(...charObjects);
  //         canvas.renderAll();
  //         setAnimationStyle({ clarifyAnimation: false });
  //       }
  //     };

  //     setTimeout(() => {
  //       textObject.set({ opacity: 0 });
  //       canvas.renderAll();
  //       animate();
  //     }, animationTypeSpeed);
  //   }
  // };

  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     console.log("selectedObject",selectedObject)
  //     canvas.discardActiveObject(); 
  //     const textObject = selectedObject;
  //     // const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 8;
  //     const animationTypeSpeed = 60;
  //     const originalOpacity = textObject.opacity;
  //     const originalLeft = textObject.left + 100; 
  //     const originalTop = textObject.top; 
  //     const lines = textObject._textLines;
  //     const charObjects = [];
  //     const lineHeight = textObject.fontSize * 1.5; 

  //     lines.forEach((line, lineIndex) => {
  //       const lineWidth = textObject.__lineWidths[lineIndex];
  //       const initialLeft = originalLeft - lineWidth / 2;
  //       const yOffset = originalTop + lineIndex * lineHeight; 

  //       let charLeft = initialLeft;
  //       for (let i = 0; i < line.length; i++) {
  //         const char = line[i];
  //         const charObject = new fabric.Text(char, {
  //           left: charLeft,
  //           top: yOffset,
  //           fontSize: textObject.fontSize,
  //           fill: textObject.fill,
  //           fontFamily: textObject.fontFamily,
  //           opacity: 0, 
  //           shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //           selectable: false,
  //           stroke: textObject.stroke,
  //           fontWeight: textObject.fontWeight,
  //         });
  //         charObjects.push(charObject);
  //         canvas.add(charObject);
  //         if (i === 0 && lineIndex === 0) {
  //           charLeft += charObject.width - 2.50;
  //           console.log("charLeft +++", charLeft)
  //         } else {
  //           console.log("charLeft ---", charLeft)
  //           charLeft += charObject.width;
  //         }
  //       }
  //     });

  //     let step = 0;
  //     const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);

  //     const animate = () => {
  //       fadeInOrder.forEach((charIndex, orderIndex) => {
  //         if (step >= orderIndex) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < charObjects.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       } else {
  //         textObject.set({ opacity: originalOpacity }); 
  //         canvas.remove(...charObjects);
  //         canvas.renderAll();
  //         setAnimationStyle({ clarifyAnimation: false });
  //       }
  //     };
  //     setTimeout(() => {
  //       textObject.set({ opacity: 0 });
  //       canvas.renderAll();
  //       animate();
  //     }, animationTypeSpeed);
  //   }
  // };
  const clarifyAnimation = () => {
    if (selectedObject && canvas) {
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
            console.log("charLeft +++", charLeft)
          } else {
            console.log("charLeft ---", charLeft)
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
          setAnimationStyle({ clarifyAnimation: false });
        }
      };

      setTimeout(() => {
        textObject.set({ opacity: 0 });
        canvas.renderAll();
        animate();
      }, animationTypeSpeed);
    }
  };



  return (
    <Fragment>
      {showGridProp && (
        <div style={{ position: 'absolute', overflow: "hidden" }}>
          <canvas ref={gridRef} width={width} height={height} />
        </div>
      )}
      <div style={{ position: 'absolute', overflow: "hidden" }}>
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
      {canvas && renderedChildren}
      <button
        style={{ position: 'absolute', top: 30, right: 0 }}
        onClick={e => {
          e.preventDefault();
          console.log(canvas.toJSON());
        }}
      >
        Save To JSON
      </button>
    </Fragment>
  );
};

export default DesignCanvas;
