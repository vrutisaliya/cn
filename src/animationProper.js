


// useEffect(() => {
//   const canvasElement = canvasRef.current;
//   const canvas = new fabric.Canvas(canvasElement, {
//     width: 600,
//     height: 400,
//   });

//   let newText = 'Your paragraph text';
//   const newTextObject = new fabric.Textbox(newText, {
//     left: 50,
//     top: 50,
//     width: 500,
//     fontSize: 30,
//     lineHeight: 1.3,
//     fontFamily: 'Arial',
//     fill: 'blue',
//     opacity: 1,
//   });

//   canvas.add(newTextObject);

//   if (showAnimation) {
//     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
//       const fadeRate = 0.01; 
//       const maxBlur = 8;
//       const charObjects = [];
//       const lines = this?._textLines;
//       const lineHeights = this?.__lineHeights;
//       const lineWidths = this?.__lineWidths;

//       if (!lines || !lineHeights || !lineWidths) {
//         console.error('Text lines or dimensions are not available.');
//         return;
//       }

//       const objectCenter = this.getCenterPoint();
//       const initialLeft = objectCenter.x - this.width / 2;
//       let yOffset = objectCenter.y - this.height / 2;

//       lines.forEach((line, lineIndex) => {
//         let charLeft = initialLeft;
//         if (lineIndex > 0) {
//           yOffset += lineHeights[lineIndex - 1] * this.lineHeight;
//         }
//         for (let i = 0; i < line.length; i++) {
//           const char = line[i];
//           const charObject = new fabric.Text(char, {
//             left: charLeft,
//             top: yOffset,
//             fontSize: this.fontSize,
//             fill: this.fill,
//             fontFamily: this.fontFamily,
//             opacity: 0,
//             shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
//             selectable: false,
//             stroke: this.stroke,
//             fontWeight: this.fontWeight,
//           });
//           charObjects.push(charObject);
//           canvas.add(charObject);

//           charLeft += charObject.width;
//         }
//       });

//       let step = 0;
//       const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);

//       const animateFrame = () => {
//         fadeInOrder.forEach((charIndex, orderIndex) => {
//           if (step >= orderIndex) {
//             const charObject = charObjects[charIndex];
//             const progress = Math.min(1, (step - orderIndex) * fadeRate);
//             const blurLevel = maxBlur * (1 - progress);

//             charObject.set({
//               opacity: progress,
//               shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
//             });
//           }
//         });

//         canvas.renderAll();

//         if (step < charObjects.length + 1 / fadeRate) {
//           step++;
//           requestAnimationFrame(animateFrame);
//         } else {
//           this.set({ opacity: 1 });
//           canvas.remove(...charObjects);
//           canvas.renderAll();
//         }
//       };

//       requestAnimationFrame(() => {
//         animateFrame();
//       });
//     };

//     newTextObject._renderChar();
//   } else if (showAnimation === false) {
//     newTextObject.set({ opacity: 1 });
//     canvas.clear();
//     canvas.renderAll();
//   }

//   return () => {
//     if (canvas) {
//       canvas.clear();
//       canvas.dispose();
//     }
//   };
// }, [showAnimation]);


useEffect(() => {
  const canvasElement = canvasRef.current;
  const canvas = new fabric.Canvas(canvasElement, {
    width: 600,
    height: 400,
  });

  let newText = 'Hello, How Are You !!';
  const newTextObject = new fabric.Textbox(newText, {
    left: 50,
    top: 50,
    width: 500,
    fontSize: 30,
    lineHeight: 1.3,
    fontFamily: 'Arial',
    fill: 'black',
    opacity: 1,
  });
  canvas.add(newTextObject);

  const moveDistance = 20; // Define moveDistance
  const fadeRate = 0.02; // Define fadeRate
  const maxBlur = 5;
  let animationInterval = null;

  if (showAnimation) {
    // newTextObject._renderChar = function () {
    //   const ctx = canvas.getContext('2d');
    //   if (!ctx) return;

    //   const text = newTextObject.text;
    //   const yPos = newTextObject.top + newTextObject.fontSize / 2; // Adjust yPos for vertical centering
    //   const textWidth = ctx.measureText(text).width;
    //   const startX = newTextObject.left - textWidth; // Start from the left side, just off-screen
    //   const charPositions = [];

    //   ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //   for (let i = 0; i < text.length; i++) {
    //     charPositions.push({ x: startX + ctx.measureText(text.substring(0, i)).width, opacity: 0 });
    //   }

    //   const fadeInAni = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    //   let step = 0;
    //   let direction = 1;
    //   let xPos = startX; // Start xPos from startX

    //   animationInterval = setInterval(() => {
    //     ctx.clearRect(0, 0, canvas?.width, canvas?.height);

    //     for (let i = 0; i < text.length; i++) {
    //       const charIndex = fadeInAni[i];
    //       const baseXPos = charPositions[charIndex].x;

    //       // Smooth movement calculation
    //       xPos = baseXPos + (moveDistance / 10) * direction * step;

    //       if (step >= i) {
    //         const opacity = charPositions[charIndex].opacity;
    //         const color = newTextObject.fill;
    //         ctx.fillStyle = color;

    //         charPositions[charIndex].opacity = Math.min(1, charPositions[charIndex].opacity + fadeRate);
    //         ctx.globalAlpha = charPositions[charIndex].opacity;

    //         // Calculate blur amount based on distance from original position
    //         const blurAmount = maxBlur * (1 - charPositions[charIndex].opacity);
    //         ctx.filter = `blur(${blurAmount}px)`;
    //       } else {
    //         ctx.globalAlpha = 0;
    //         ctx.filter = `blur(${maxBlur}px)`;
    //       }

    //       // Adjust text position based on xPos
    //       ctx.fillText(text[charIndex], xPos, yPos);
    //     }

    //     if (step >= text.length && charPositions.every(char => char.opacity >= 1)) {
    //       clearInterval(animationInterval);
    //       animationInterval = null;
    //     }

    //     // Update direction based on position threshold
    //     if (direction === 1 && xPos >= startX + textWidth + 30) { // Adjust the threshold for direction change
    //       direction = -1;
    //     } else if (direction === -1 && xPos <= startX - 20) { // Adjust the threshold for direction change
    //       direction = 1;
    //     }

    //     step++;
    //   }, 30); // Adjust interval duration for smoother animation (lower value means smoother)

    // };


    newTextObject._renderChar = function () {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const text = newTextObject.text;
      console.log("newTextObject.text",)
      const yPos = newTextObject.top + newTextObject.fontSize / 2; // Adjust yPos for vertical centering
      const textWidth = ctx.measureText(text).width;
      const startX = newTextObject.left - textWidth; // Start from the left side, just off-screen
      const charPositions = [];

      ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;

      for (let i = 0; i < text.length; i++) {
        charPositions.push({ x: startX + ctx.measureText(text.substring(0, i)).width, opacity: 0 });
      }

      const fadeInAni = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
      let step = 0;
      let direction = 1; // Direction to move from left to right
      let xPos = startX; // Start xPos from startX

      animationInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas?.width, canvas?.height);

        let animationComplete = true; // Flag to track if animation is complete

        for (let i = 0; i < text.length; i++) {
          const charIndex = fadeInAni[i];
          const baseXPos = charPositions[charIndex].x;

          // Smooth movement calculation
          xPos = baseXPos + (moveDistance / 10) * direction * step;

          if (step >= i) {
            const opacity = charPositions[charIndex].opacity;
            const color = newTextObject.fill;
            ctx.fillStyle = color;

            charPositions[charIndex].opacity = Math.min(1, charPositions[charIndex].opacity + fadeRate);
            ctx.globalAlpha = charPositions[charIndex].opacity;

            // Calculate blur amount based on distance from original position
            const blurAmount = maxBlur * (1 - charPositions[charIndex].opacity);
            ctx.filter = `blur(${blurAmount}px)`;
          } else {
            ctx.globalAlpha = 0;
            ctx.filter = `blur(${maxBlur}px)`;
          }

          // Adjust text position based on xPos
          ctx.fillText(text[charIndex], xPos, yPos);

          // Check if animation is complete for this character
          if (step < text.length || charPositions[charIndex].opacity < 1) {
            animationComplete = false;
          }
        }

        // If all characters are fully visible and xPos reaches the original position, end the animation
        if (animationComplete && xPos >= newTextObject.left) {
          clearInterval(animationInterval);
          animationInterval = null;
        }

        step++;
      }, 30); // Adjust interval duration for smoother animation (lower value means smoother)
    };


    const clearAnimation = () => {
      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
      canvas.clear();
      canvas.renderAll();
    };

    clearAnimation();
    newTextObject._renderChar();
  } else {
    newTextObject.set({ opacity: 1, fontFamily: 'Arial', fontSize: 30 });
  }

  return () => {
    canvas.dispose();
  };
}, [showAnimation]);