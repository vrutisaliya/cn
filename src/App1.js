import React, { useEffect, useRef, useState } from 'react';
import { fabric, getStringWidth } from 'fabric';

const TextAnimationCanvas = () => {
    const canvasRef = useRef(null);
    const [showAnimation, setShowAnimation] = useState(false);


    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   const newText = 'Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 1,
    //   });
    //   canvas.add(newTextObject);

    //   const moveDistance = 6;
    //   const fadeRate = 0.01; // Slower fade rate
    //   const maxBlur = 5;
    //   let animationInterval = null;

    //   const textLines = newTextObject.text.split('\n');
    //   const charPositions = textLines.map(line => {
    //     return Array.from({ length: line.length }, (_, i) => ({
    //       x: newTextObject.left + canvas.getContext('2d').measureText(line.substring(0, i)).width,
    //       opacity: 0
    //     }));
    //   });

    //   const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //   let step = 0;
    //   let direction = 1;

    //   animationInterval = setInterval(() => {
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     let animationComplete = true;

    //     textLines.forEach((line, lineIndex) => {
    //       const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //       for (let i = 0; i < line.length; i++) {
    //         const charIndex = fadeInAni[lineIndex][i];
    //         const baseXPos = charPositions[lineIndex][charIndex].x;

    //         const xPos = baseXPos + (moveDistance / 30) * direction * step;

    //         if (step >= i) {
    //           const opacity = charPositions[lineIndex][charIndex].opacity;
    //           ctx.fillStyle = newTextObject.fill;

    //           charPositions[lineIndex][charIndex].opacity = Math.min(1, charPositions[lineIndex][charIndex].opacity + fadeRate);
    //           ctx.globalAlpha = charPositions[lineIndex][charIndex].opacity;

    //           const blurAmount = maxBlur * (1 - charPositions[lineIndex][charIndex].opacity);
    //           ctx.filter = `blur(${blurAmount}px)`;
    //         } else {
    //           ctx.globalAlpha = 0;
    //           ctx.filter = `blur(${maxBlur}px)`;
    //         }

    //         ctx.fillText(line[charIndex], xPos, yPos);

    //         if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //           animationComplete = false;
    //         }
    //       }
    //     });

    //     if (animationComplete && step >= Math.max(...textLines.map(line => line.length))) {
    //       clearInterval(animationInterval);
    //       animationInterval = null;
    //     }
    //     step++;
    //   }, 100); // Slower animation interval

    //   return () => {
    //     if (animationInterval) {
    //       clearInterval(animationInterval);
    //     }
    //     canvas.dispose();
    //   };
    // }, []);
    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   let newText = 'Hello, How Are You Hello, How Are You Hello, How Are You Hello, How Are You !!';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 0, // Start with opacity 0 for fade-in effect
    //   });
    //   canvas.add(newTextObject);

    //   const moveDistance = 6;
    //   const fadeRate = 0.03; // Adjusted fade rate for smoother transition
    //   const maxBlur = 2; // Adjusted max blur amount
    //   let animationInterval = null;

    //   const animateText = () => {
    //     const ctx = canvas.getContext('2d');
    //     if (!ctx) return;

    //     const text = newTextObject.text;
    //     const yPos = newTextObject.top + newTextObject.fontSize / 2;
    //     const textWidth = ctx.measureText(text).width;
    //     const startX = newTextObject.left;
    //     const charPositions = [];

    //     ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;

    //     for (let i = 0; i < text.length; i++) {
    //       charPositions.push({ x: startX + ctx.measureText(text.substring(0, i)).width, opacity: 0 });
    //     }

    //     const fadeInAni = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    //     let step = 0;

    //     animationInterval = setInterval(() => {
    //       ctx.clearRect(0, 0, canvas.width, canvas.height);

    //       let animationComplete = true;

    //       for (let i = 0; i < text.length; i++) {
    //         const charIndex = fadeInAni[i];
    //         const baseXPos = charPositions[charIndex].x;

    //         const xPos = baseXPos + (moveDistance / 20) * step;

    //         if (step >= i) {
    //           const opacity = charPositions[charIndex].opacity;
    //           const color = newTextObject.fill;
    //           ctx.fillStyle = color;

    //           charPositions[charIndex].opacity = Math.min(1, charPositions[charIndex].opacity + fadeRate);
    //           ctx.globalAlpha = charPositions[charIndex].opacity;

    //           const blurAmount = maxBlur * (1 - charPositions[charIndex].opacity);
    //           ctx.filter = `blur(${blurAmount}px)`;
    //         } else {
    //           ctx.globalAlpha = 0;
    //           ctx.filter = `blur(${maxBlur}px)`;
    //         }

    //         ctx.fillText(text[charIndex], xPos, yPos);

    //         if (step < text.length || charPositions[charIndex].opacity < 1) {
    //           animationComplete = false;
    //         }
    //       }

    //       if (animationComplete) {
    //         clearInterval(animationInterval);
    //         animationInterval = null;
    //         canvas.clear();
    //         const finalTextObject = new fabric.Textbox(newText, {
    //           left: 50,
    //           top: 50,
    //           width: 500,
    //           fontSize: 30,
    //           lineHeight: 1.3,
    //           fontFamily: 'Arial',
    //           fill: 'black',
    //           opacity: 1,
    //         });
    //         canvas.add(finalTextObject);
    //         canvas.renderAll();
    //       }
    //       step++;
    //     }, 30);
    //   };

    //   const clearAnimation = () => {
    //     if (animationInterval) {
    //       clearInterval(animationInterval);
    //       animationInterval = null;
    //     }
    //     canvas.clear();
    //     canvas.renderAll();
    //   };

    //   if (showAnimation) {
    //     clearAnimation();
    //     newTextObject.opacity = 0; // Ensure opacity is 0 before starting animation
    //     animateText();
    //   } else {
    //     // Reset text and properties when animation is not shown
    //     newTextObject.set({ opacity: 1, fontFamily: 'Arial', fontSize: 30 });
    //     newText = 'Hello, How Are You !!';
    //     newTextObject.set({ text: newText });
    //     canvas.renderAll();
    //   }

    //   return () => {
    //     canvas.dispose(); // Cleanup canvas resources
    //   };
    // }, [showAnimation, canvasRef]);


    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   let newText = 'Hello, How Are You Hello, How Are You Hello, How Are You Hello, How Are You !!';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 1,
    //   });
    //   canvas.add(newTextObject);

    //   const moveDistance = 20;
    //   const fadeRate = 0.02;
    //   const maxBlur = 5;
    //   let animationInterval = null;

    //   if (showAnimation) {
    //     newTextObject._renderChar = function () {
    //       const ctx = canvas.getContext('2d');
    //       if (!ctx) return;

    //       const text = newTextObject.text;
    //       console.log("text",text)
    //       console.log("newTextObject.text",ctx)
    //       const yPos = newTextObject.top + newTextObject.fontSize / 2;
    //       const textWidth = ctx.measureText(text)?.width;
    //       const startX = newTextObject.left - textWidth;
    //       const charPositions = [];

    //       ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;

    //       for (let i = 0; i < text?.length; i++) {
    //         charPositions.push({ x: startX + ctx.measureText(text?.substring(0, i)).width, opacity: 0 });
    //       }

    //       const fadeInAni = Array.from({ length: text?.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    //       let step = 0;
    //       let direction = 1;
    //       let xPos = startX;

    //       animationInterval = setInterval(() => {
    //         ctx.clearRect(0, 0, canvas?.width, canvas?.height);

    //         let animationComplete = true;

    //         for (let i = 0; i < text?.length; i++) {
    //           const charIndex = fadeInAni[i];
    //           const baseXPos = charPositions[charIndex].x;

    //           xPos = baseXPos + (moveDistance / 10) * direction * step;

    //           if (step >= i) {
    //             const opacity = charPositions[charIndex].opacity;
    //             const color = newTextObject.fill;
    //             ctx.fillStyle = color;

    //             charPositions[charIndex].opacity = Math.min(1, charPositions[charIndex].opacity + fadeRate);
    //             ctx.globalAlpha = charPositions[charIndex].opacity;

    //             const blurAmount = maxBlur * (1 - charPositions[charIndex].opacity);
    //             ctx.filter = `blur(${blurAmount}px)`;
    //           } else {
    //             ctx.globalAlpha = 0;
    //             ctx.filter = `blur(${maxBlur}px)`;
    //           }

    //           ctx.fillText(text[charIndex], xPos, yPos);

    //           if (step < text?.length || charPositions[charIndex].opacity < 1) {
    //             animationComplete = false;
    //           }
    //         }

    //         if (animationComplete && xPos >= newTextObject.left) {
    //           clearInterval(animationInterval);
    //           animationInterval = null;
    //         }
    //         step++;
    //       }, 30);
    //     };


    //     const clearAnimation = () => {
    //       if (animationInterval) {
    //         clearInterval(animationInterval);
    //         animationInterval = null;
    //       }
    //       canvas.clear();
    //       canvas.renderAll();
    //     };

    //     clearAnimation();
    //     newTextObject._renderChar();
    //   } else {
    //     newTextObject.set({ opacity: 1, fontFamily: 'Arial', fontSize: 30 });
    //     newText = 'Hello, How Are You Hello, How Are You Hello, How Are You Hello, How Are You!!';
    //     newTextObject.set({ text: newText });
    //     canvas.renderAll();
    //   }

    //   return () => {
    //     canvas.dispose();
    //   };
    // }, [showAnimation,canvasRef]);

    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   let newText = 'Hello, How Are You Hello, How Are You Hello, How Are You Hello, How Are You !!';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 1,
    //   });
    //   canvas.add(newTextObject);

    //   // Get the text lines from the Textbox object
    //   const textLines = newTextObject.textLines;
    //   console.log("textLines", textLines)
    //   // Hide all lines initially
    //   textLines.forEach((_, index) => {
    //     newTextObject.textLines[index] = '';
    //   });

    //   // Function to gradually reveal text line by line
    //   function animateTextReveal() {
    //     let index = 0;
    //     const animationInterval = setInterval(function () {
    //       if (index < textLines.length) {
    //         newTextObject.textLines[index] = textLines[index]; // Show current line
    //         console.log("  newTextObject.textLines[index] ", newTextObject.textLines[index])
    //         canvas.renderAll(); // Render canvas to show changes
    //         index++;
    //       } else {
    //         clearInterval(animationInterval); // Stop animation when all lines are shown
    //       }
    //     }, 500); // Adjust interval as needed for animation speed
    //   }

    //   if (showAnimation) {
    //     animateTextReveal();
    //   }
    // }, [showAnimation])


    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   let newText = 'Hello, How Are You Hello, How Are You Hello, How Are You Hello, How Are You !!';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 1,
    //   });
    //   canvas.add(newTextObject);
    //   const textLines = newTextObject.textLines;
    //   console.log('textLines',textLines)
    //   const moveDistance = 20;
    //   const fadeRate = 0.02;
    //   const maxBlur = 5;
    //   let animationInterval = null;

    //   if (showAnimation) {
    //     newTextObject._renderChar = function () {
    //       const ctx = canvas.getContext('2d');
    //       if (!ctx) return;

    //       const text = newTextObject.text;
    //       console.log("text",text)
    //       console.log("newTextObject.text",ctx)
    //       const yPos = newTextObject.top + newTextObject.fontSize / 2;
    //       const textWidth = ctx.measureText(text)?.width;
    //       const startX = newTextObject.left - textWidth;
    //       const charPositions = [];

    //       ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;

    //       for (let i = 0; i < text?.length; i++) {
    //         charPositions.push({ x: startX + ctx.measureText(text?.substring(0, i)).width, opacity: 0 });
    //       }

    //       const fadeInAni = Array.from({ length: text?.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    //       let step = 0;
    //       let direction = 1;
    //       let xPos = startX;

    //       animationInterval = setInterval(() => {
    //         ctx.clearRect(0, 0, canvas?.width, canvas?.height);

    //         let animationComplete = true;

    //         for (let i = 0; i < text?.length; i++) {
    //           const charIndex = fadeInAni[i];
    //           const baseXPos = charPositions[charIndex].x;

    //           xPos = baseXPos + (moveDistance / 10) * direction * step;

    //           if (step >= i) {
    //             const opacity = charPositions[charIndex].opacity;
    //             const color = newTextObject.fill;
    //             ctx.fillStyle = color;

    //             charPositions[charIndex].opacity = Math.min(1, charPositions[charIndex].opacity + fadeRate);
    //             ctx.globalAlpha = charPositions[charIndex].opacity;

    //             const blurAmount = maxBlur * (1 - charPositions[charIndex].opacity);
    //             ctx.filter = `blur(${blurAmount}px)`;
    //           } else {
    //             ctx.globalAlpha = 0;
    //             ctx.filter = `blur(${maxBlur}px)`;
    //           }

    //           ctx.fillText(text[charIndex], xPos, yPos);

    //           if (step < text?.length || charPositions[charIndex].opacity < 1) {
    //             animationComplete = false;
    //           }
    //         }

    //         if (animationComplete && xPos >= newTextObject.left) {
    //           clearInterval(animationInterval);
    //           animationInterval = null;
    //         }
    //         step++;
    //       }, 30);
    //     };


    //     const clearAnimation = () => {
    //       if (animationInterval) {
    //         clearInterval(animationInterval);
    //         animationInterval = null;
    //       }
    //       canvas.clear();
    //       canvas.renderAll();
    //     };

    //     clearAnimation();
    //     newTextObject._renderChar();
    //   } else {
    //     newTextObject.set({ opacity: 1, fontFamily: 'Arial', fontSize: 30 });
    //     newText = 'Hello, How Are You Hello, How Are You Hello, How Are You Hello, How Are You !!';
    //     newTextObject.set({ text: newText });
    //     canvas.renderAll();
    //   }

    //   return () => {
    //     canvas.dispose();
    //   };
    // }, [showAnimation,canvasRef]);

    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   let newText = 'Hello, How Are You Hello, How Are You Hello, How Are You Hello, How Are You !!';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 1,
    //   });
    //   canvas.add(newTextObject);

    //   const moveDistance = 6;
    //   const fadeRate = 0.02;
    //   const maxBlur = 5;
    //   let animationIntervals = [];

    //   const clearAnimation = () => {
    //     animationIntervals.forEach(interval => clearInterval(interval));
    //     animationIntervals = [];
    //     canvas.clear();
    //     canvas.renderAll();
    //   };

    //   if (showAnimation) {
    //     const textLines = newTextObject.textLines;

    //     const animateLine = (lineIndex) => {
    //       const lineText = textLines[lineIndex];
    //       const ctx = canvas.getContext('2d');
    //       if (!ctx) return;

    //       const yPos = newTextObject.top + newTextObject.fontSize / 2 + (lineIndex * newTextObject.lineHeight * newTextObject.fontSize);
    //       const textWidth = ctx.measureText(lineText)?.width;
    //       const startX = newTextObject.left - textWidth;
    //       ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //       let charPositions = [];
    //       for (let i = 0; i < lineText.length; i++) {
    //         charPositions.push({ x: startX + ctx.measureText(lineText.substring(0, i)).width, opacity: 0 });
    //       }

    //       const fadeInAni = Array.from({ length: lineText.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    //       let step = 0;
    //       let direction = 1;
    //       let xPos = startX;

    //       const animate = (timestamp) => {
    //         ctx.clearRect(0, yPos - newTextObject.fontSize, canvas.width, canvas.height);

    //         let animationComplete = true;

    //         for (let i = 0; i < lineText.length; i++) {
    //           const charIndex = fadeInAni[i];
    //           const baseXPos = charPositions[charIndex].x;

    //           xPos = baseXPos + (moveDistance / 10) * direction * step;

    //           if (step >= i) {
    //             const opacity = charPositions[charIndex].opacity;
    //             const color = newTextObject.fill;
    //             ctx.fillStyle = color;

    //             charPositions[charIndex].opacity = Math.min(1, charPositions[charIndex].opacity + fadeRate);
    //             ctx.globalAlpha = charPositions[charIndex].opacity;

    //             const blurAmount = maxBlur * (1 - charPositions[charIndex].opacity);
    //             ctx.filter = `blur(${blurAmount}px)`;
    //           } else {
    //             ctx.globalAlpha = 0;
    //             ctx.filter = `blur(${maxBlur}px)`;
    //           }

    //           ctx.fillText(lineText[charIndex], xPos, yPos);

    //           if (step < lineText.length || charPositions[charIndex].opacity < 1) {
    //             animationComplete = false;
    //           }
    //         }

    //         if (animationComplete && xPos >= newTextObject.left) {
    //           return;
    //         }

    //         step++;
    //         requestAnimationFrame(animate);
    //       };

    //       requestAnimationFrame(animate);
    //     };

    //     textLines.forEach((line, index) => animateLine(index));
    //   } else {
    //     newTextObject.set({ opacity: 1, fontFamily: 'Arial', fontSize: 30 });
    //     newText = 'Hello, How Are You Hello, How Are You Hello, How Are You Hello, How Are You !!';
    //     newTextObject.set({ text: newText });
    //     canvas.renderAll();
    //     clearAnimation();
    //   }

    //   return () => {
    //     clearAnimation();
    //     canvas.dispose();
    //   };
    // }, [showAnimation, canvasRef]);




    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   const newText = 'Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 0,
    //   });
    //   canvas.add(newTextObject);

    //   const fadeRate = 0.2; // Faster fade rate
    //   const maxBlur = 5;
    //   let animationFrameId = null;

    //   const textLines = newTextObject.text.split('\n');
    //   const charPositions = textLines.map(line => {
    //     const positions = [];
    //     for (let i = 0; i < line.length; i++) {
    //       const width = canvas.getContext('2d').measureText(line.substring(0, i)).width;
    //       positions.push({ x: newTextObject.left + width, opacity: 0 });
    //     }
    //     return positions;
    //   });

    //   const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //   let step = 0;

    //   const animate = () => {
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     let animationComplete = true;

    //     textLines.forEach((line, lineIndex) => {
    //       const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //       for (let i = 0; i < line.length; i++) {
    //         const charIndex = fadeInAni[lineIndex][i];
    //         const baseXPos = charPositions[lineIndex][charIndex].x;

    //         if (step >= i) {
    //           const opacity = charPositions[lineIndex][charIndex].opacity;
    //           ctx.fillStyle = newTextObject.fill;

    //           charPositions[lineIndex][charIndex].opacity = Math.min(1, charPositions[lineIndex][charIndex].opacity + fadeRate);
    //           ctx.globalAlpha = charPositions[lineIndex][charIndex].opacity;

    //           const blurAmount = maxBlur * (1 - charPositions[lineIndex][charIndex].opacity);
    //           ctx.filter = `blur(${blurAmount}px)`;
    //         } else {
    //           ctx.globalAlpha = 0;
    //           ctx.filter = `blur(${maxBlur}px)`;
    //         }

    //         ctx.fillText(line[charIndex], baseXPos, yPos);

    //         if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //           animationComplete = false;
    //         }
    //       }
    //     });

    //     if (!animationComplete) {
    //       step++;
    //       animationFrameId = requestAnimationFrame(animate);
    //     }
    //   };

    //   if (showAnimation) {
    //     animationFrameId = requestAnimationFrame(animate);
    //   }

    //   return () => {
    //     if (animationFrameId) {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //     canvas.dispose();
    //   };
    // }, [showAnimation]);

    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   const newText = 'Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 0,
    //     scaleX: 0.5,
    //     scaleY: 0.5,
    //   });
    //   canvas.add(newTextObject);
    //   canvas.renderAll();
    //   const fadeRate = 0.05; // Fade rate
    //   const scaleRate = 0.02; // Scale rate
    //   const maxBlur = 5;
    //   let animationFrameId = null;

    //   const textLines = newTextObject.text.split('\n');
    //   const charPositions = textLines.map(line => {
    //     const positions = [];
    //     for (let i = 0; i < line.length; i++) {
    //       const width = canvas.getContext('2d').measureText(line.substring(0, i)).width;
    //       positions.push({ x: newTextObject.left + width, opacity: 0, scale: 0.5 });
    //     }
    //     return positions;
    //   });

    //   const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //   let step = 0;

    //   const animate = () => {
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     let animationComplete = true;
    //     ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //     textLines.forEach((line, lineIndex) => {
    //       const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //       for (let i = 0; i < line.length; i++) {
    //         const charIndex = fadeInAni[lineIndex][i];
    //         const baseXPos = charPositions[lineIndex][charIndex].x;

    //         if (step >= i) {
    //           const opacity = charPositions[lineIndex][charIndex].opacity;
    //           ctx.fillStyle = newTextObject.fill;

    //           charPositions[lineIndex][charIndex].opacity = Math.min(1, charPositions[lineIndex][charIndex].opacity + fadeRate);
    //           charPositions[lineIndex][charIndex].scale = Math.min(1, charPositions[lineIndex][charIndex].scale + scaleRate);
    //           ctx.globalAlpha = charPositions[lineIndex][charIndex].opacity;

    //           const blurAmount = maxBlur * (1 - charPositions[lineIndex][charIndex].opacity);
    //           ctx.filter = `blur(${blurAmount}px)`;

    //           ctx.save();
    //           ctx.translate(baseXPos, yPos);
    //           ctx.scale(charPositions[lineIndex][charIndex].scale, charPositions[lineIndex][charIndex].scale);
    //           ctx.fillText(line[charIndex], 0, 0);
    //           ctx.restore();
    //         } else {
    //           ctx.globalAlpha = 0;
    //           ctx.filter = `blur(${maxBlur}px)`;
    //         }

    //         if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //           animationComplete = false;
    //         }
    //       }
    //     });

    //     if (!animationComplete) {
    //       step++;
    //       animationFrameId = requestAnimationFrame(animate);
    //     }
    //   };

    //   if (showAnimation) {
    //     animationFrameId = requestAnimationFrame(animate);
    //   }

    //   return () => {
    //     if (animationFrameId) {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //     canvas.dispose();
    //   };
    // }, [showAnimation]);
    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   const newText = 'Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 16, // Font size of the main text object
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 1, // Start with full opacity for initial text visibility
    //   });
    //   console.log("newTextObject", newTextObject)
    //   canvas.add(newTextObject);
    //   canvas.renderAll();

    //   const fadeRate = 0.05; // Slower fade rate for smooth animation
    //   const scaleRate = 0.02; // Adjust scale rate as needed for smooth scaling
    //   const maxBlur = 5;
    //   let animationFrameId = null;

    //   const textLines = newTextObject.text.split('\n');
    //   const charPositions = textLines.map(line => {
    //     const positions = [];
    //     for (let i = 0; i < line.length; i++) {
    //       const width = canvas.getContext('2d').measureText(line.substring(0, i)).width;
    //       positions.push({ x: newTextObject.left + width, opacity: 0, scale: 0.5 });
    //     }
    //     return positions;
    //   });

    //   const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //   let step = 0;

    //   const animate = () => {
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     let animationComplete = true;

    //     textLines.forEach((line, lineIndex) => {
    //       const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //       for (let i = 0; i < line.length; i++) {
    //         const charIndex = fadeInAni[lineIndex][i];
    //         const baseXPos = charPositions[lineIndex][charIndex].x;

    //         if (step >= i) {
    //           const opacity = charPositions[lineIndex][charIndex].opacity;
    //           ctx.fillStyle = newTextObject.fill;

    //           charPositions[lineIndex][charIndex].opacity = Math.min(1, charPositions[lineIndex][charIndex].opacity + fadeRate);
    //           charPositions[lineIndex][charIndex].scale = Math.min(1, charPositions[lineIndex][charIndex].scale + scaleRate);
    //           ctx.globalAlpha = charPositions[lineIndex][charIndex].opacity;

    //           const blurAmount = maxBlur * (1 - charPositions[lineIndex][charIndex].opacity);
    //           ctx.filter = `blur(${blurAmount}px)`;

    //           ctx.save();
    //           ctx.translate(baseXPos, yPos);
    //           ctx.scale(charPositions[lineIndex][charIndex].scale, charPositions[lineIndex][charIndex].scale);
    //           ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //           ctx.fillText(line[charIndex], 0, 0);
    //           ctx.restore();
    //         }

    //         if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //           animationComplete = false;
    //         }
    //       }
    //     });

    //     if (!animationComplete) {
    //       step++;
    //       animationFrameId = requestAnimationFrame(animate);
    //     } else {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //   };

    //   if (showAnimation) {
    //     animationFrameId = requestAnimationFrame(animate);
    //   }

    //   return () => {
    //     if (animationFrameId) {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //     canvas.dispose();
    //   };
    // }, [showAnimation]);

    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   const newText = 'Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text';

    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 16,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 0, // Start with opacity set to 0 for initial fade-in effect
    //   });

    //   canvas.add(newTextObject);
    //   canvas.renderAll();

    //   // Animation parameters
    //   const fadeRate = 0.05;
    //   const scaleRate = 0.02;
    //   const maxBlur = 5;
    //   let animationFrameId = null;
    //   let step = 0;

    //   // Prepare character positions and animation sequences
    //   const textLines = newTextObject.text.split('\n');
    //   const charPositions = textLines.map(line => {
    //     return line.split('').map(() => ({
    //       opacity: 0, // Start with opacity set to 0 for initial fade-in effect
    //       scale: 0.5, // Start with scale set to 0.5 for initial scale effect
    //       width: 0, // Store width of each character for accurate positioning
    //     }));
    //   });

    //   const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));

    //   // Pre-calculate character widths for accurate positioning
    //   const ctx = canvas.getContext('2d');
    //   ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //   textLines.forEach((line, lineIndex) => {
    //     let xOffset = 0;
    //     line.split('').forEach((char, charIndex) => {
    //       const width = ctx.measureText(char).width;
    //       charPositions[lineIndex][charIndex].width = width;
    //       charPositions[lineIndex][charIndex].xOffset = xOffset; // Store xOffset for each character
    //       xOffset += width; // Update xOffset for next character
    //     });
    //   });

    //   // Animation function
    //   const animate = () => {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     let animationComplete = true;

    //     textLines.forEach((line, lineIndex) => {
    //       const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //       line.split('').forEach((char, charIndex) => {
    //         const baseXPos = newTextObject.left + charPositions[lineIndex][charIndex].xOffset;

    //         if (step >= charIndex) {
    //           const { opacity, scale } = charPositions[lineIndex][charIndex];
    //           charPositions[lineIndex][charIndex].opacity = Math.min(1, opacity + fadeRate);
    //           charPositions[lineIndex][charIndex].scale = Math.min(1, scale + scaleRate);

    //           ctx.globalAlpha = charPositions[lineIndex][charIndex].opacity;
    //           const blurAmount = maxBlur * (1 - charPositions[lineIndex][charIndex].opacity);
    //           ctx.filter = `blur(${blurAmount}px)`;

    //           ctx.save();
    //           ctx.translate(baseXPos, yPos);
    //           ctx.scale(charPositions[lineIndex][charIndex].scale, charPositions[lineIndex][charIndex].scale);
    //           ctx.font = `${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //           ctx.fillText(char, 0, 0);
    //           ctx.restore();
    //         }

    //         if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //           animationComplete = false;
    //         }
    //       });
    //     });

    //     if (!animationComplete) {
    //       step++;
    //       animationFrameId = requestAnimationFrame(animate);
    //     } else {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //   };

    //   // Start animation if showAnimation is true
    //   if (showAnimation) {
    //     animate();
    //   } else {
    //     // If animation is not shown, set initial opacity to 1 for immediate display
    //     textLines.forEach((line, lineIndex) => {
    //       line.split('').forEach((char, charIndex) => {
    //         charPositions[lineIndex][charIndex].opacity = 1;
    //       });
    //     });
    //     canvas.renderAll();
    //   }

    //   // Cleanup function
    //   return () => {
    //     if (animationFrameId) {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //     canvas.dispose();
    //   };
    // }, [showAnimation]);
    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   const newText = 'Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text';
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 16,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 0,
    //   });

    //   canvas.add(newTextObject);
    //   canvas.renderAll();

    //   const fadeRate = 0.05;
    //   const maxBlur = 5;
    //   let animationFrameId = null;

    //   const textLines = newTextObject.text.split('\n');
    //   const charPositions = textLines.map(line => {
    //     const positions = [];
    //     let xPos = newTextObject.left;

    //     for (let i = 0; i < line.length; i++) {
    //       const char = line[i];
    //       const width = canvas.getContext('2d').measureText(char).width;
    //       positions.push({ char, x: xPos, opacity: 0, scale: 0.5 });
    //       xPos += width + 5; // Adjust xPos based on character width and additional spacing (5px here as an example)
    //     }

    //     return positions;
    //   });

    //   const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //   let step = 0;

    //   const animate = () => {
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     let animationComplete = true;

    //     textLines.forEach((line, lineIndex) => {
    //       const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //       for (let i = 0; i < line.length; i++) {
    //         const charIndex = fadeInAni[lineIndex][i];
    //         const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //         if (step >= i) {
    //           const { opacity, scale } = charPositions[lineIndex][charIndex];
    //           ctx.fillStyle = newTextObject.fill;

    //           charPositions[lineIndex][charIndex].opacity = Math.min(1, opacity + fadeRate);
    //           charPositions[lineIndex][charIndex].scale = Math.min(1, scale + fadeRate / 2);
    //           ctx.globalAlpha = opacity;

    //           const blurAmount = maxBlur * (1 - opacity);
    //           ctx.filter = `blur(${blurAmount}px)`;

    //           ctx.save();
    //           ctx.translate(baseXPos, yPos);
    //           ctx.scale(scale, scale);
    //           ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //           ctx.fillText(char, 0, 0);
    //           ctx.restore();
    //         }

    //         if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //           animationComplete = false;
    //         }
    //       }
    //     });

    //     if (!animationComplete) {
    //       step++;
    //       animationFrameId = requestAnimationFrame(animate);
    //     } else {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //   };

    //   if (showAnimation) {
    //     animate();
    //   }

    //   return () => {
    //     if (animationFrameId) {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //     canvas.dispose();
    //   };
    // }, [showAnimation]);
    const canvasInstanceRef = useRef(null)
    const textObjectRef = useRef(null)

    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });
    //   canvasInstanceRef.current = canvas;
    //   const newText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text"
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: 50,
    //     top: 50,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 1,
    //   });
    //   textObjectRef.current = newTextObject;
    //   canvas.add(newTextObject);
    //   return () => {
    //     canvas.dispose();
    //   };
    // }, [canvasRef,]);


    //   useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //       width: 600,
    //       height: 400,
    //     });

    //     const newText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(newText, {
    //       left: 50,
    //       top: 50,
    //       width: 500,
    //       fontSize: 30,
    //       lineHeight: 1.3,
    //       fontFamily: 'Arial',
    //       fill: 'black',
    //       opacity: 1,
    //     });

    //     canvas.add(newTextObject);
    //     // canvas.renderAll(); 

    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;
    //     let animationStarted = false;

    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //       console.log("left", left)
    //       if (!ctx) return; // Ensure ctx is available before proceeding
    //       const textLines = this.text.split('\n');
    //       let charPositions = []; // Store character positions based on animation state

    //       // Initialize positions based on initial text position
    //       textLines.forEach((line, lineIndex) => {
    //         const positions = [];
    //         let xPos = left;
    //         for (let i = 0; i < line.length; i++) {
    //           const char = line[i];
    //           const width = ctx.measureText(char).width * this.scaleX; // Consider text scale
    //           positions.push({ char, x: xPos, opacity: 1, scale: 1 }); // Start with full opacity and scale
    //           xPos += width + 10; // Adjust xPos based on character width and additional spacing
    //         }
    //         charPositions.push(positions);
    //       });

    //       const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //       let step = 0;
    //       const animate = () => {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before rendering each frame
    //         let animationComplete = true;
    //         textLines.forEach((line, lineIndex) => {
    //           const yPos = this.top + lineIndex * this.fontSize * this.lineHeight + this.fontSize / 2;
    //           for (let i = 0; i < line.length; i++) {
    //             const charIndex = fadeInAni[lineIndex][i];
    //             const { char, x: baseXPos } = charPositions[lineIndex][charIndex];
    //             if (step >= i) {
    //               const { opacity, scale } = charPositions[lineIndex][charIndex];
    //               ctx.fillStyle = this.fill;
    //               ctx.globalAlpha = opacity;
    //               const blurAmount = maxBlur * (1 - opacity);
    //               ctx.filter = `blur(${blurAmount}px)`;
    //               ctx.save();
    //               ctx.translate(baseXPos, yPos);
    //               ctx.scale(scale, scale);
    //               ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    //               ctx.fillText(char, 0, 0);
    //               ctx.restore();
    //             }
    //             if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //               animationComplete = false;
    //             }
    //           }
    //         });
    //         if (!animationComplete) {
    //           step++;
    //           animationFrameId = requestAnimationFrame(animate);
    //         } else {
    //           cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.requestRenderAll(); // Request canvas render after changes
    //       };

    //       if (showAnimation && !animationStarted) {
    //         animationStarted = true; // Ensure animation starts only once
    //         animate(); // Start the animation loop
    //       }

    //       return () => {
    //         if (animationFrameId) {
    //           cancelAnimationFrame(animationFrameId);
    //         }
    //       };
    //     };

    //     // Start animation immediately if showAnimation is initially true
    //     if (showAnimation) {
    //       newTextObject._renderChar();
    //     }

    //     // Cleanup
    //     return () => {
    //       canvas.dispose(); // Clean up canvas
    //     };

    //   }, [showAnimation]);
    // let animationFrameId = null;
    //   useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //       width: 600,
    //       height: 400,
    //     });
    //     const newText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(newText, {
    //       left: 50,
    //       top: 50,
    //       width: 500,
    //       fontSize: 30,
    //       lineHeight: 1.3,
    //       fontFamily: 'Arial',
    //       fill: 'black',
    //       opacity: 1,
    //     });
    //     canvas.add(newTextObject);
    //     if(!showAnimation){
    //         canvas.renderAll(); 
    //     }
    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;
    //     let animationStarted = false;
    //     newTextObject._renderChar = function () {
    //       const ctx = canvas.getContext('2d');
    //       if (!ctx) return; // Ensure ctx is available before proceeding
    //       const textLines = this.text.split('\n');
    //       const charPositions = textLines.map(line => {
    //         const positions = [];
    //         let xPos = this.left;
    //         for (let i = 0; i < line.length; i++) {
    //           const char = line[i];
    //           const width = ctx.measureText(char).width * this.scaleX; // Consider text scale
    //           positions.push({ char, x: xPos, opacity: 0, scale: 0.5 });
    //           xPos += width + 10; // Adjust xPos based on character width and additional spacing (5px here as an example)
    //         }
    //         return positions;
    //       });
    //       const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //       let step = 0;
    //       const animate = () => {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before rendering each frame
    //         let animationComplete = true;
    //         textLines.forEach((line, lineIndex) => {
    //           const yPos = this.top + lineIndex * this.fontSize * this.lineHeight + this.fontSize / 2;
    //           for (let i = 0; i < line.length; i++) {
    //             const charIndex = fadeInAni[lineIndex][i];
    //             const { char, x: baseXPos } = charPositions[lineIndex][charIndex];
    //             if (step >= i) {
    //               const { opacity, scale } = charPositions[lineIndex][charIndex];
    //               ctx.fillStyle = this.fill;
    //               charPositions[lineIndex][charIndex].opacity = Math.min(1, opacity + fadeRate);
    //               charPositions[lineIndex][charIndex].scale = Math.min(1, scale + fadeRate / 2);
    //               ctx.globalAlpha = opacity;
    //               const blurAmount = maxBlur * (1 - opacity);
    //               ctx.filter = `blur(${blurAmount}px)`;
    //               ctx.save();
    //               ctx.translate(baseXPos, yPos);
    //               ctx.scale(scale, scale);
    //               ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    //               ctx.fillText(char, 0, 0);
    //               ctx.restore();
    //             }
    //             if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //               animationComplete = false;
    //             }
    //           }
    //         });
    //         if (!animationComplete) {
    //           step++;
    //           animationFrameId = requestAnimationFrame(animate);
    //         } else {
    //           cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.requestRenderAll(); // Request canvas render after changes
    //       };
    //       if (showAnimation && !animationStarted) {
    //         animationStarted = true; // Ensure animation starts only once
    //         animate(); // Start the animation loop
    //       }
    //       return () => {
    //         if (animationFrameId) {
    //           cancelAnimationFrame(animationFrameId);
    //         }
    //       };
    //     };
    //     // Start animation immediately if showAnimation is initially true
    //     if (showAnimation) {
    //       newTextObject._renderChar();
    //     }
    //     // Cleanup
    //     return () => {
    //       canvas.dispose(); // Clean up canvas
    //     };
    //   }, [showAnimation]);



    // useEffect(() => {
    //   const canvasElement = canvasRef.current;
    //   const canvas = new fabric.Canvas(canvasElement, {
    //     width: 600,
    //     height: 400,
    //   });

    //   // Define original position
    //   const originalLeft = 50;
    //   const originalTop = 50;

    //   // Create the text box with initial properties
    //   const newText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //   const newTextObject = new fabric.Textbox(newText, {
    //     left: originalLeft,
    //     top: originalTop,
    //     width: 500,
    //     fontSize: 30,
    //     lineHeight: 1.3,
    //     fontFamily: 'Arial',
    //     fill: 'black',
    //     opacity: 1,
    //   });

    //   canvas.add(newTextObject);

    //   // Animation parameters
    //   const fadeRate = 0.05;
    //   const maxBlur = 5;
    //   let animationFrameId = null;
    //   let animationStarted = false;

    //   // Custom method to render characters with animation
    //   newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //     if (!ctx) return;

    //     const textLines = this.text.split('\n');
    //     const charPositions = textLines.map(line => {
    //       const positions = [];
    //       let xPos = this.left;
    //       for (let i = 0; i < line.length; i++) {
    //         const char = line[i];
    //         const width = ctx.measureText(char).width * this.scaleX; // Consider text scale
    //         positions.push({ char, x: xPos, opacity: 0, scale: 0.5 });
    //         xPos += width; // Adjust xPos based on character width and additional spacing (5px here as an example)
    //       }
    //       return positions;
    //     });

    //     const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //     let step = 0;
    //     const animate = () => {
    //       ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before rendering each frame
    //       let animationComplete = true;
    //       textLines.forEach((line, lineIndex) => {
    //         const yPos = this.top + lineIndex * this.fontSize * this.lineHeight + this.fontSize / 2;
    //         for (let i = 0; i < line.length; i++) {
    //           const charIndex = fadeInAni[lineIndex][i];
    //           const { char, x: baseXPos } = charPositions[lineIndex][charIndex];
    //           if (step >= i) {
    //             const { opacity, scale } = charPositions[lineIndex][charIndex];
    //             ctx.fillStyle = this.fill;
    //             charPositions[lineIndex][charIndex].opacity = Math.min(1, opacity + fadeRate);
    //             charPositions[lineIndex][charIndex].scale = Math.min(1, scale + fadeRate / 2);
    //             ctx.globalAlpha = opacity;
    //             const blurAmount = maxBlur * (1 - opacity);
    //             ctx.filter = `blur(${blurAmount}px)`;
    //             ctx.save();
    //             ctx.translate(baseXPos, yPos);
    //             ctx.scale(scale, scale);
    //             ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    //             ctx.fillText(char, 0, 0);
    //             ctx.restore();
    //           }
    //           if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //             animationComplete = false;
    //           }
    //         }
    //       });
    //       if (!animationComplete) {
    //         step++;
    //         animationFrameId = requestAnimationFrame(animate);
    //       } else {
    //         cancelAnimationFrame(animationFrameId);
    //         // Animate back to original position using Fabric.js utility function
    //         fabric.util.animate({
    //           startValue: { left: this.left, top: this.top },
    //           endValue: { left: originalLeft, top: originalTop },
    //           duration: 500, // Adjust duration as needed
    //           onChange: (value) => {
    //             this.set('left', value.left).setCoords(); // Update left and setCoords to update canvas
    //             this.set('top', value.top).setCoords(); // Update top and setCoords to update canvas
    //             canvas.requestRenderAll(); // Request canvas render after changes
    //           },
    //           onComplete: () => {
    //             setShowAnimation(false);
    //           }
    //         });
    //       }
    //       canvas.requestRenderAll(); // Request canvas render after changes
    //     };

    //     // Start the animation if showAnimation is true and animation has not started
    //     if (showAnimation && !animationStarted) {
    //       animationStarted = true; // Ensure animation starts only once
    //       animate(); // Start the animation loop
    //     }

    //     return () => {
    //       // Cleanup function, cancel animation frame if exists
    //       if (animationFrameId) {
    //         cancelAnimationFrame(animationFrameId);
    //       }
    //     };
    //   };

    //   // Call _renderChar if showAnimation is true initially
    //   if (showAnimation) {
    //     newTextObject._renderChar();
    //   }

    //   // Cleanup canvas on component unmount
    //   return () => {
    //     canvas.dispose();
    //   };

    // }, [showAnimation]);



    //   useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //       width: 600,
    //       height: 400,
    //     });

    //     const newText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(newText, {
    //       left: 50,
    //       top: 50,
    //       width: 500,
    //       fontSize: 30,
    //       lineHeight: 1.3,
    //       fontFamily: 'Arial',
    //       fill: 'black',
    //       opacity: 1,
    //     });

    //     canvas.add(newTextObject);

    //     if (!showAnimation) {
    //       canvas.renderAll()
    //     }

    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;
    //     let animationStarted = false;

    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //       // const ctx = canvas.getContext('2d');
    //       console.log("newTextObject", lineIndex, charIndex, _char, left, top)
    //       if (!ctx) return;

    //       const textLines = this.text.split('\n');
    //       const charPositions = textLines.map(line => {
    //         const positions = [];
    //         let xPos = this.left;
    //         for (let i = 0; i < line.length; i++) {
    //           const char = line[i];
    //           const width = ctx.measureText(char).width * this.scaleX; // Consider text scale
    //           positions.push({ char, x: xPos,opacity: 0, scale: 0.5 });
    //           xPos += width + 10; // Adjust xPos based on character width and additional spacing (5px here as an example)
    //         }
    //         return positions;
    //       });
    //       const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //       let step = 0;
    //       const animate = () => {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before rendering each frame
    //         let animationComplete = true;
    //         textLines.forEach((line, lineIndex) => {
    //           const yPos = this.top + lineIndex * this.fontSize * this.lineHeight + this.fontSize / 2;
    //           for (let i = 0; i < line.length; i++) {
    //             const charIndex = fadeInAni[lineIndex][i];
    //             const { char, x: baseXPos } = charPositions[lineIndex][charIndex];
    //             if (step >= i) {
    //               const { opacity, scale } = charPositions[lineIndex][charIndex];
    //               ctx.fillStyle = this.fill;
    //               charPositions[lineIndex][charIndex].opacity = Math.min(1, opacity + fadeRate);
    //               charPositions[lineIndex][charIndex].scale = Math.min(1, scale + fadeRate / 2);
    //               ctx.globalAlpha = opacity;
    //               const blurAmount = maxBlur * (1 - opacity);
    //               ctx.filter = `blur(${blurAmount}px)`;
    //               ctx.save();
    //               ctx.translate(baseXPos, yPos);
    //               ctx.scale(scale, scale);
    //               ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    //               ctx.fillText(char, 0, 0);
    //               ctx.restore();
    //             }
    //             if (step < line.length || charPositions[lineIndex][charIndex].opacity < 1) {
    //               animationComplete = false;
    //             }
    //           }
    //         });
    //         if (!animationComplete) {
    //           step++;
    //           animationFrameId = requestAnimationFrame(animate);
    //         } else {
    //           cancelAnimationFrame(animationFrameId);
    //           setShowAnimation(false)
    //         }
    //         canvas.requestRenderAll(); // Request canvas render after changes
    //       };

    //       if (showAnimation && !animationStarted) {
    //         animationStarted = true; // Ensure animation starts only once
    //         animate(); // Start the animation loop
    //       }

    //       return () => {
    //         if (animationFrameId) {
    //           cancelAnimationFrame(animationFrameId);
    //         }
    //       };
    //     };

    //     if (showAnimation) {
    //       newTextObject._renderChar();
    //     }

    //     return () => {
    //       canvas.dispose();
    //     };

    //   }, [showAnimation]);
    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";

    //     // Create the initial text box with initial position
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 500,
    //         fontSize: 30,
    //         lineHeight: 1.3,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 0, // Start with opacity 0 for animation effect
    //     });

    //     // Add the text box to the canvas
    //     canvas.add(newTextObject);

    //     // Function to animate the text
    //     const animateText = () => {
    //         const ctx = canvas.getContext('2d');
    //         if (!ctx) return;

    //         const textLines = initialText.split('\n');
    //         const charPositions = textLines.map(line => {
    //             const positions = [];
    //             let xPos = newTextObject.left;
    //             for (let i = 0; i < line.length; i++) {
    //                 const char = line[i];
    //                 const width = ctx.measureText(char).width;
    //                 positions.push({ char, x: xPos, opacity: 0, scale: 0.5 });
    //                 xPos += width + 10; // Adjust the spacing between characters as needed
    //             }
    //             return positions;
    //         });

    //         const fadeInAni = textLines.map(line => Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5));
    //         let step = 0;

    //         const animate = () => {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);

    //             let animationComplete = true;
    //             textLines.forEach((line, lineIndex) => {
    //                 const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;
    //                 for (let i = 0; i < line.length; i++) {
    //                     const charIndex = fadeInAni[lineIndex][i];
    //                     const { char, x: baseXPos } = charPositions[lineIndex][charIndex];
    //                     if (step >= i) {
    //                         const { opacity, scale } = charPositions[lineIndex][charIndex];
    //                         const newOpacity = Math.min(1, opacity + 0.05);
    //                         const newScale = Math.min(1, scale + 0.025);
    //                         const blurAmount = 5 * (1 - newOpacity);

    //                         ctx.save();
    //                         ctx.translate(baseXPos, yPos);
    //                         ctx.scale(newScale, newScale);
    //                         ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //                         ctx.fillStyle = newTextObject.fill;
    //                         ctx.globalAlpha = newOpacity;
    //                         ctx.filter = `blur(${blurAmount}px)`;
    //                         ctx.fillText(char, 0, 0);
    //                         ctx.restore();

    //                         charPositions[lineIndex][charIndex].opacity = newOpacity;
    //                         charPositions[lineIndex][charIndex].scale = newScale;

    //                         if (newOpacity < 1) {
    //                             animationComplete = false;
    //                         }
    //                     }
    //                 }
    //             });

    //             if (!animationComplete) {
    //                 step++;
    //                 requestAnimationFrame(animate);
    //             } else {
    //                 newTextObject.set({
    //                     opacity: 1,
    //                     text: initialText,
    //                 });
    //                 canvas.renderAll(); // Ensure the final state is rendered
    //             }
    //         };

    //         animate();
    //     };

    //     // Trigger animation after ensuring text box properties are set
    //     if (showAnimation) {
    //         newTextObject.set({
    //             left: 100, // Example: Change text box position
    //             top: 100,  // Example: Change text box position
    //         });

    //         setTimeout(() => {
    //             animateText();
    //         }, 500); // Delay to ensure position change is applied before animation starts
    //     }

    //     return () => {
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);

    useEffect(() => {
        const canvasElement = canvasRef.current;
        const canvas = new fabric.Canvas(canvasElement, {
            width: 600,
            height: 400,
        });

        const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
        const newTextObject = new fabric.Textbox(initialText, {
            left: 50,
            top: 50,
            width: 500,
            fontSize: 30,
            lineHeight: 1.3,
            fontFamily: 'Arial',
            fill: 'black',
            opacity: 0, // Start with opacity 0 for animation effect
        });

        canvas.add(newTextObject);

        if (!showAnimation) {
            canvas.renderAll()
        }

        const fadeRate = 0.05;
        const maxBlur = 5;
        let animationFrameId = null;

        const animateText = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const textLines = initialText.split('\n');
            const charPositions = textLines.map((line, lineIndex) => {
                const positions = [];
                let xPos = newTextObject.left;
                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    const width = ctx.measureText(char).width;
                    positions.push({
                        char,
                        x: xPos,
                        opacity: 0, // Start with opacity 0 for fade-in effect
                        scale: 0.5, // Start with scale 0.5 for animation effect
                    });
                    xPos += width + 10; // Adjust the spacing between characters as needed
                }
                return positions;
            });

            const fadeInAni = textLines.map((line) =>
                Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
            );

            let step = 0;
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let animationComplete = true;

                textLines.forEach((line, lineIndex) => {
                    const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

                    for (let i = 0; i < line.length; i++) {
                        const charIndex = fadeInAni[lineIndex][i];
                        const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

                        if (step >= i) {
                            const { opacity, scale } = charPositions[lineIndex][charIndex];
                            const newOpacity = Math.min(1, opacity + fadeRate);
                            const newScale = Math.min(1, scale + fadeRate / 2);
                            const blurAmount = maxBlur * (1 - newOpacity);

                            ctx.save();
                            ctx.translate(baseXPos, yPos);
                            ctx.scale(newScale, newScale);
                            ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
                            ctx.fillStyle = newTextObject.fill;
                            ctx.globalAlpha = newOpacity;
                            ctx.filter = `blur(${blurAmount}px)`;
                            ctx.fillText(char, 0, 0);
                            ctx.restore();

                            charPositions[lineIndex][charIndex].opacity = newOpacity;
                            charPositions[lineIndex][charIndex].scale = newScale;

                            if (newOpacity < 1) {
                                animationComplete = false;
                            }
                        }
                    }
                });

                if (!animationComplete) {
                    step++;
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    cancelAnimationFrame(animationFrameId);
                    newTextObject.set({
                        opacity: 1,
                        text: initialText,
                    });
                    canvas.renderAll();
                }
            };

            animate();
        };

        if (showAnimation) {
            animateText();
        }

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            canvas.dispose();
        };
    }, [showAnimation]);




    const toggleAnimation = () => {
        setShowAnimation((prev) => !prev);
    };

    useEffect(() => {
        console.log("showAnimation", showAnimation)
    }, [showAnimation])

    return (
        <div>
            <canvas
                ref={canvasRef}
                id="canvas-id"
                width={600}
                height={400}
                style={{ border: '1px solid #ccc' }}
            />
            <button onClick={toggleAnimation}>
                {showAnimation ? 'Stop Animation' : 'Start Animation'}
            </button>
        </div>
    );
};

export default TextAnimationCanvas;
