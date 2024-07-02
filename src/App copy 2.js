import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const AnimatedTextCanvas = () => {
    const canvasRef = useRef(null);
    const [showAnimation, setShowAnimation] = useState(false);
    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 500,
    //         fontSize: 30,
    //         lineHeight: 1.3,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: showAnimation ? 0 : 1, // Start opacity at 0 if showAnimation is true
    //     });

    //     canvas.add(newTextObject);
    //     canvas.renderAll();

    //     // Animation variables
    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;
    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //         const ctxNew = canvas.getContext('2d');

    //         console.log("_char", ctx)
    //         if (!ctxNew) return;
    //         const textLines = initialText.split('\n');
    //         const charPositions = textLines.map((line, lineIndex) => {
    //             const positions = [];
    //             let xPos = left;
    //             for (let i = 0; i < line.length; i++) {
    //                 const char = line[i];
    //                 const width = ctxNew.measureText(char).width;
    //                 positions.push({
    //                     char,
    //                     x: xPos,
    //                     opacity: 0, // Start with opacity 0 for fade-in effect
    //                     scale: 0.5, // Start with scale 0.5 for animation effect
    //                 });
    //                 xPos += width + 10; // Adjust the spacing between characters as needed
    //             }
    //             return positions;
    //         });

    //         const fadeInAni = textLines.map((line) =>
    //             Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //         );

    //         let step = 0;
    //         const animate = () => {
    //             ctxNew.clearRect(0, 0, canvas.width, canvas.height);
    //             let animationComplete = true;

    //             textLines.forEach((line, lineIndex) => {
    //                 const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //                 for (let i = 0; i < line.length; i++) {
    //                     const charIndex = fadeInAni[lineIndex][i];
    //                     const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //                     if (step >= i) {
    //                         const { opacity, scale } = charPositions[lineIndex][charIndex];
    //                         const newOpacity = Math.min(1, opacity + fadeRate);
    //                         const newScale = Math.min(1, scale + fadeRate / 2);
    //                         const blurAmount = maxBlur * (1 - newOpacity);

    //                         ctxNew.save();
    //                         ctxNew.translate(baseXPos, yPos);
    //                         // ctxNew.translate(left, top);
    //                         ctxNew.scale(newScale, newScale);
    //                         ctxNew.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //                         ctxNew.fillStyle = newTextObject.fill;
    //                         ctxNew.globalAlpha = newOpacity;
    //                         ctxNew.filter = `blur(${blurAmount}px)`;
    //                         ctxNew.fillText(char, 0, 0);
    //                         ctxNew.restore();

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
    //                 animationFrameId = requestAnimationFrame(animate);
    //             } else {
    //                 cancelAnimationFrame(animationFrameId);
    //             }
    //         };

    //         animate();
    //     }

    //     if (showAnimation) {
    //         newTextObject._renderChar();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);
    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 500,
    //         fontSize: 30,
    //         lineHeight: 1.3,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: showAnimation ? 0 : 1, // Start opacity at 0 if showAnimation is true
    //     });

    //     canvas.add(newTextObject);
    //     // canvas.renderAll();

    //     // Animation variables
    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;

    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //         // const ctxNew = canvas.getContext('2d');
    //         const ctxNew = ctx;
    //         if (!ctxNew) return;

    //         const textLines = initialText.split('\n');
    //         const charPositions = textLines.map((line, lineIndex) => {
    //             const positions = [];
    //             let xPos = left;
    //             for (let i = 0; i < line.length; i++) {
    //                 const char = line[i];
    //                 const width = ctxNew.measureText(char).width;
    //                 positions.push({
    //                     char,
    //                     x: xPos,
    //                     opacity: 0, // Start with opacity 0 for fade-in effect
    //                     scale: 0.5, // Start with scale 0.5 for animation effect
    //                 });
    //                 xPos += width + 10; // Adjust the spacing between characters as needed
    //             }
    //             return positions;
    //         });

    //         const fadeInAni = textLines.map((line) =>
    //             Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //         );

    //         let step = 0;
    //         const animate = () => {
    //             ctxNew.clearRect(0, 0, canvas.width, canvas.height);
    //             let animationComplete = true;

    //             textLines.forEach((line, lineIndex) => {
    //                 const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //                 for (let i = 0; i < line.length; i++) {
    //                     const charIndex = fadeInAni[lineIndex][i];
    //                     const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //                     if (step >= i) {
    //                         const { opacity, scale } = charPositions[lineIndex][charIndex];
    //                         const newOpacity = Math.min(1, opacity + fadeRate);
    //                         const newScale = Math.min(1, scale + fadeRate / 2);
    //                         const blurAmount = maxBlur * (1 - newOpacity);

    //                         ctxNew.save();
    //                         ctxNew.translate(baseXPos, yPos);
    //                         ctxNew.scale(newScale, newScale);
    //                         ctxNew.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //                         ctxNew.fillStyle = newTextObject.fill;
    //                         ctxNew.globalAlpha = newOpacity;
    //                         ctxNew.filter = `blur(${blurAmount}px)`;
    //                         ctxNew.fillText(char, 0, 0);
    //                         ctxNew.restore();

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
    //                 animationFrameId = requestAnimationFrame(animate);
    //             } else {
    //                 cancelAnimationFrame(animationFrameId);
    //             }
    //         };

    //         animate();
    //     };

    //     if (showAnimation) {
    //         newTextObject._renderChar();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);






    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 500,
    //         fontSize: 30,
    //         lineHeight: 1.3,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 1,
    //     });

    //     canvas.add(newTextObject);

    //     // Animation variables
    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;

    //     if (showAnimation) {
    //         newTextObject.animate('opacity', '1', {
    //             onChange: canvas.renderAll.bind(canvas),
    //             duration: 2000,
    //             onComplete: function () {
    //                 // newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //                 console.log("ctx", this.ctx)
    //                 const ctxNew = canvas.getContext('2d');
    //                 // const ctxNew = ctx;
    //                 if (!ctxNew) return;
    //                 const textLines = initialText.split('\n');
    //                 const charPositions = textLines.map((line, lineIndex) => {
    //                     const positions = [];
    //                     let xPos = newTextObject.left;
    //                     for (let i = 0; i < line.length; i++) {
    //                         const char = line[i];
    //                         const width = ctxNew.measureText(char).width;
    //                         positions.push({
    //                             char,
    //                             x: xPos,
    //                             opacity: 0, // Start with opacity 0 for fade-in effect
    //                             scale: 0.5, // Start with scale 0.5 for animation effect
    //                         });
    //                         xPos += width + 10; // Adjust the spacing between characters as needed
    //                     }
    //                     return positions;
    //                 });

    //                 const fadeInAni = textLines.map((line) =>
    //                     Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //                 );

    //                 let step = 0;
    //                 const animate = () => {
    //                     ctxNew.clearRect(0, 0, canvas.width, canvas.height);
    //                     // this?.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //                     let animationComplete = true;

    //                     textLines.forEach((line, lineIndex) => {
    //                         const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //                         for (let i = 0; i < line.length; i++) {
    //                             const charIndex = fadeInAni[lineIndex][i];
    //                             const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //                             if (step >= i) {
    //                                 const { opacity, scale } = charPositions[lineIndex][charIndex];
    //                                 const newOpacity = Math.min(1, opacity + fadeRate);
    //                                 const newScale = Math.min(1, scale + fadeRate / 2);
    //                                 const blurAmount = maxBlur * (1 - newOpacity);

    //                                 ctxNew.save();
    //                                 ctxNew.translate(baseXPos, yPos);
    //                                 ctxNew.scale(newScale, newScale);
    //                                 ctxNew.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //                                 ctxNew.fillStyle = newTextObject.fill;
    //                                 ctxNew.globalAlpha = newOpacity;
    //                                 ctxNew.filter = `blur(${blurAmount}px)`;
    //                                 ctxNew.fillText(char, 0, 0);
    //                                 ctxNew.restore();

    //                                 charPositions[lineIndex][charIndex].opacity = newOpacity;
    //                                 charPositions[lineIndex][charIndex].scale = newScale;

    //                                 if (newOpacity < 1) {
    //                                     animationComplete = false;
    //                                 }
    //                             }
    //                         }
    //                     });

    //                     if (!animationComplete) {
    //                         step++;
    //                         animationFrameId = requestAnimationFrame(animate);
    //                     } else {
    //                         cancelAnimationFrame(animationFrameId);
    //                     }
    //                 };

    //                 animate();
    //                 newTextObject._renderChar(newTextObject)
    //                 console.log('Animation complete');
    //             },
    //             easing: fabric.util.ease.easeOutBounce
    //         });
    //     } else {
    //         canvas.renderAll();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);

    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 500,
    //         fontSize: 30,
    //         lineHeight: 1.3,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 1,
    //     });

    //     canvas.add(newTextObject);
    //     if (!showAnimation === false) {

    //     }

    //     // Animation variables
    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;

    //     if (showAnimation === true) {
    //         newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //             // const ctxNew = canvas.getContext('2d');
    //             const ctxNew = ctx;
    //             console.log("_char", ctx)
    //             if (!ctxNew) return;
    //             const textLines = initialText.split('\n');
    //             const charPositions = textLines.map((line, lineIndex) => {
    //                 const positions = [];
    //                 let xPos = newTextObject.left;
    //                 for (let i = 0; i < line.length; i++) {
    //                     const char = line[i];
    //                     const width = ctxNew.measureText(char).width;
    //                     positions.push({
    //                         char,
    //                         x: xPos,
    //                         opacity: 0, // Start with opacity 0 for fade-in effect
    //                         scale: 0.5, // Start with scale 0.5 for animation effect
    //                     });
    //                     xPos += width + 10; // Adjust the spacing between characters as needed
    //                 }
    //                 return positions;
    //             });

    //             const fadeInAni = textLines.map((line) =>
    //                 Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //             );

    //             let step = 0;
    //             const animate = () => {
    //                 // ctxNew.clearRect(0, 0, canvas.width, canvas.height);
    //                 this?.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //                 let animationComplete = true;

    //                 textLines.forEach((line, lineIndex) => {
    //                     const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //                     for (let i = 0; i < line.length; i++) {
    //                         const charIndex = fadeInAni[lineIndex][i];
    //                         const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //                         if (step >= i) {
    //                             const { opacity, scale } = charPositions[lineIndex][charIndex];
    //                             const newOpacity = Math.min(1, opacity + fadeRate);
    //                             const newScale = Math.min(1, scale + fadeRate / 2);
    //                             const blurAmount = maxBlur * (1 - newOpacity);

    //                             ctxNew.save();
    //                             ctxNew.translate(baseXPos, yPos);
    //                             ctxNew.scale(newScale, newScale);
    //                             ctxNew.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //                             ctxNew.fillStyle = newTextObject.fill;
    //                             ctxNew.globalAlpha = newOpacity;
    //                             ctxNew.filter = `blur(${blurAmount}px)`;
    //                             ctxNew.fillText(char, 0, 0);
    //                             ctxNew.restore();

    //                             charPositions[lineIndex][charIndex].opacity = newOpacity;
    //                             charPositions[lineIndex][charIndex].scale = newScale;

    //                             if (newOpacity < 1) {
    //                                 animationComplete = false;
    //                             }
    //                         }
    //                     }
    //                 });

    //                 if (!animationComplete) {
    //                     step++;
    //                     animationFrameId = requestAnimationFrame(animate);
    //                 } else {
    //                     cancelAnimationFrame(animationFrameId);
    //                 }
    //             };

    //             animate();
    //         }
    //         setTimeout(() => {
    //             newTextObject._renderChar();
    //         }, 500);
    //     } else {
    //         canvas.renderAll();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);

    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 500,
    //         fontSize: 30,
    //         lineHeight: 1.3,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 1,
    //     });

    //     canvas.add(newTextObject);

    //     // Animation variables
    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;

    //     if (showAnimation) {
    //         newTextObject.animate('opacity', '1', {
    //             onChange: canvas.renderAll.bind(canvas),
    //             duration: 2000,
    //             onComplete: function () {
    //                 const textLines = initialText.split('\n');
    //                 const charPositions = textLines.map((line, lineIndex) => {
    //                     const positions = [];
    //                     let xPos = newTextObject.left;
    //                     for (let i = 0; i < line.length; i++) {
    //                         const char = line[i];
    //                         const width = canvas.getContext().measureText(char).width;
    //                         positions.push({
    //                             char,
    //                             x: xPos,
    //                             opacity: 0, // Start with opacity 0 for fade-in effect
    //                             scale: 0.5, // Start with scale 0.5 for animation effect
    //                         });
    //                         xPos += width + 10; // Adjust the spacing between characters as needed
    //                     }
    //                     return positions;
    //                 });

    //                 const fadeInAni = textLines.map((line) =>
    //                     Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //                 );

    //                 let step = 0;

    //                 // Override the _renderChar method
    //                 newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //                     const { char, opacity, scale } = charPositions[lineIndex][charIndex];
    //                     const newOpacity = Math.min(1, opacity + fadeRate);
    //                     const newScale = Math.min(1, scale + fadeRate / 2);
    //                     const blurAmount = maxBlur * (1 - newOpacity);

    //                     ctx.save();
    //                     ctx.translate(left, top);
    //                     ctx.scale(newScale, newScale);
    //                     ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //                     ctx.fillStyle = newTextObject.fill;
    //                     ctx.globalAlpha = newOpacity;
    //                     ctx.filter = `blur(${blurAmount}px)`;
    //                     ctx.fillText(_char, 0, 0);
    //                     ctx.restore();

    //                     charPositions[lineIndex][charIndex].opacity = newOpacity;
    //                     charPositions[lineIndex][charIndex].scale = newScale;
    //                 };
    //                 const animate = () => {
    //                     canvas.clear();
    //                     let animationComplete = true;

    //                     textLines.forEach((line, lineIndex) => {
    //                         const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //                         for (let i = 0; i < line.length; i++) {
    //                             const charIndex = fadeInAni[lineIndex][i];
    //                             const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //                             if (step >= i) {
    //                                 newTextObject._renderChar('fillText', canvas.getContext(), lineIndex, charIndex, char, baseXPos, yPos);

    //                                 if (charPositions[lineIndex][charIndex].opacity < 1) {
    //                                     animationComplete = false;
    //                                 }
    //                             }
    //                         }
    //                     });

    //                     if (!animationComplete) {
    //                         step++;
    //                         animationFrameId = requestAnimationFrame(animate);
    //                     } else {
    //                         console.log('Animation complete');
    //                     }
    //                 };


    //                 animate();
    //             },
    //             easing: fabric.util.ease.easeOutBounce
    //         });
    //     } else {
    //         canvas.renderAll();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);

    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50, // Initial left position
    //         top: 50, // Initial top position
    //         width: 500,
    //         fontSize: 30,
    //         lineHeight: 1.3,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 0, // Start with opacity 0 for fade-in effect
    //     });

    //     canvas.add(newTextObject);

    //     // Animation variables
    //     const fadeRate = 0.05;
    //     const maxBlur = 5;
    //     let animationFrameId = null;

    //     if (showAnimation) {
    //         newTextObject.animate('opacity', '1', {
    //             onChange: canvas.renderAll.bind(canvas),
    //             duration: 2000,
    //             onComplete: function () {
    //                 const textLines = initialText.split('\n');
    //                 const charPositions = textLines.map((line, lineIndex) => {
    //                     const positions = [];
    //                     let xPos = newTextObject.left;
    //                     for (let i = 0; i < line.length; i++) {
    //                         const char = line[i];
    //                         const width = canvas.getContext().measureText(char).width;
    //                         positions.push({
    //                             char,
    //                             x: xPos,
    //                             opacity: 0, // Start with opacity 0 for fade-in effect
    //                             scale: 0.5, // Start with scale 0.5 for animation effect
    //                         });
    //                         xPos += width + 10; // Adjust the spacing between characters as needed
    //                     }
    //                     return positions;
    //                 });

    //                 const fadeInAni = textLines.map((line) =>
    //                     Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //                 );

    //                 let step = 0;

    //                 // Override the _renderChar method
    //                 newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //                     const { char, opacity, scale } = charPositions[lineIndex][charIndex];
    //                     const newOpacity = Math.min(1, opacity + fadeRate);
    //                     const newScale = Math.min(1, scale + fadeRate / 2);
    //                     const blurAmount = maxBlur * (1 - newOpacity);

    //                     // Example: Dynamic left and top calculation
    //                     const dynamicLeft = left + (step * 5); // Adjust left dynamically
    //                     const dynamicTop = top; // Keep top static for this example

    //                     ctx.save();
    //                     ctx.translate(dynamicLeft, dynamicTop);
    //                     ctx.scale(newScale, newScale);
    //                     ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //                     ctx.fillStyle = newTextObject.fill;
    //                     ctx.globalAlpha = newOpacity;
    //                     ctx.filter = `blur(${blurAmount}px)`;
    //                     ctx.fillText(_char, 0, 0);
    //                     ctx.restore();

    //                     charPositions[lineIndex][charIndex].opacity = newOpacity;
    //                     charPositions[lineIndex][charIndex].scale = newScale;
    //                 };

    //                 const animate = () => {
    //                     canvas.clear();
    //                     let animationComplete = true;

    //                     textLines.forEach((line, lineIndex) => {
    //                         const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //                         for (let i = 0; i < line.length; i++) {
    //                             const charIndex = fadeInAni[lineIndex][i];
    //                             const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //                             if (step >= i) {
    //                                 newTextObject._renderChar('fillText', canvas.getContext(), lineIndex, charIndex, char, baseXPos, yPos);

    //                                 if (charPositions[lineIndex][charIndex].opacity < 1) {
    //                                     animationComplete = false;
    //                                 }
    //                             }
    //                         }
    //                     });

    //                     // Update animation step
    //                     if (!animationComplete) {
    //                         step++;
    //                         animationFrameId = requestAnimationFrame(animate);
    //                     } else {
    //                         console.log('Animation complete');
    //                     }
    //                 };

    //                 animate();
    //             },
    //             easing: fabric.util.ease.easeOutBounce
    //         });
    //     } else {
    //         canvas.renderAll();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);


    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 400,
    //         fontSize: 30,
    //         lineHeight: 1,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 0,
    //     });

    //     newTextObject.setSelectionStyles({ fontSize: 20 }, 0, 5);
    //     canvas.add(newTextObject);

    //     const textLines = initialText.split('\n');
    //     let animationFrameId = null;
    //     let step = 0;
    //     const fadeInAni = textLines.map((line) =>
    //         Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //     );
    //     const charPositions = textLines.map((line, lineIndex) => {
    //         const positions = [];
    //         let xPos = newTextObject.left;
    //         for (let i = 0; i < line.length; i++) {
    //             const char = line[i];
    //             const width = canvas.getContext().measureText(char).width;
    //             positions.push({
    //                 char,
    //                 x: xPos,
    //                 opacity: 0,
    //                 scale: 0.5,
    //             });
    //             xPos += width + 10;
    //         }
    //         return positions;
    //     });
    //     console.log("charPositions", charPositions)

    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //         console.log("efrdegd", method, _char,)
    //         const { char, opacity, scale } = charPositions[lineIndex][charIndex];
    //         const newOpacity = Math.min(1, opacity + 0.05);
    //         const newScale = Math.min(1, scale + 0.025);
    //         const blurAmount = 5 * (1 - newOpacity);


    //         ctx.save();
    //         ctx.translate(left, top);
    //         ctx.scale(newScale, newScale);
    //         ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //         ctx.fillStyle = newTextObject.fill;
    //         ctx.globalAlpha = newOpacity;
    //         ctx.filter = `blur(${blurAmount}px)`;
    //         ctx.fillText(_char, 0, 0);
    //         ctx.restore();

    //         charPositions[lineIndex][charIndex].opacity = newOpacity;
    //         charPositions[lineIndex][charIndex].scale = newScale;
    //     };


    //     const animate = () => {
    //         canvas.clear();
    //         let animationComplete = true;

    //         textLines.forEach((line, lineIndex) => {
    //             newTextObject.lineHeight = Math.min(1.3, newTextObject.lineHeight + 0.01);

    //             const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //             for (let i = 0; i < line.length; i++) {
    //                 const charIndex = fadeInAni[lineIndex][i];
    //                 const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //                 if (step >= i) {
    //                     newTextObject._renderChar('fillText', canvas.getContext(), lineIndex, charIndex, char, baseXPos, yPos);

    //                     if (charPositions[lineIndex][charIndex].opacity < 1) {
    //                         animationComplete = false;
    //                     }
    //                 }
    //             }
    //         });

    //         if (!animationComplete || newTextObject.lineHeight < 1.3) {
    //             step++;
    //             animationFrameId = requestAnimationFrame(animate);
    //         } else {
    //             console.log('Animation complete');
    //             setShowAnimation(false);
    //         }
    //     };
    //     if (showAnimation) {
    //         animate();
    //     } else {
    //         canvas.renderAll();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);

    //    useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 400,
    //         fontSize: 30,
    //         lineHeight: 1,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 1,
    //     });

    //     // newTextObject.setSelectionStyles({ fontSize: 20 }, 0, 5);
    //     canvas.add(newTextObject);

    //     const textLines = initialText.split('\n');
    //     let animationFrameId = null;
    //     let step = 0;
    //     const fadeInAni = textLines.map((line) =>
    //         Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //     );

    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //         const charFadeStep = step - charIndex;
    //         const opacity = Math.min(1, charFadeStep * 0.05);
    //         const scale = Math.min(1, 0.5 + charFadeStep * 0.025);
    //         const blurAmount = 5 * (1 - opacity);

    //         ctx.save();
    //         ctx.translate(left, top);
    //         ctx.scale(scale, scale);
    //         ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //         ctx.fillStyle = newTextObject.fill;
    //         ctx.globalAlpha = opacity;
    //         ctx.filter = `blur(${blurAmount}px)`;
    //         ctx.fillText(_char, 0, 0);
    //         ctx.restore();
    //     };

    //     const animate = () => {
    //         canvas.clear();
    //         let animationComplete = true;

    //         textLines.forEach((line, lineIndex) => {
    //             newTextObject.lineHeight = Math.min(1.3, newTextObject.lineHeight + 0.01);

    //             const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //             let xPos = newTextObject.left;

    //             for (let i = 0; i < line.length; i++) {
    //                 const charIndex = i; // Sequential index for typewriter effect
    //                 const char = line[charIndex];

    //                 if (step >= charIndex) {
    //                     newTextObject._renderChar('fillText', canvas.getContext(), lineIndex, charIndex, char, xPos, yPos);

    //                     if (step < charIndex + 20) {
    //                         animationComplete = false;
    //                     }
    //                 }

    //                 const charWidth = canvas.getContext().measureText(char).width;
    //                 xPos += charWidth + 10; // Adjust the 10 as needed for spacing
    //             }
    //         });

    //         if (!animationComplete || newTextObject.lineHeight < 1.3) {
    //             step++;
    //             animationFrameId = requestAnimationFrame(animate);
    //         } else {
    //             console.log('Animation complete');
    //             setShowAnimation(false);
    //         }
    //     };

    //     if (showAnimation) {
    //         animate();
    //     } else {
    //         canvas.renderAll();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);

    // useEffect(() => {
    //     const canvasElement = canvasRef.current;
    //     const canvas = new fabric.Canvas(canvasElement, {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 400,
    //         fontSize: 30,
    //         lineHeight: 1,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 0,
    //     });

    //     newTextObject.setSelectionStyles({ fontSize: 20 }, 0, 5);
    //     canvas.add(newTextObject);

    //     const textLines = newTextObject.textLines
    //     console.log("textLines", textLines)
    //     const charPositions = textLines.map((line, lineIndex) => {
    //         const positions = [];
    //         let xPos = newTextObject.left;
    //         for (let i = 0; i < line.length; i++) {
    //             const char = line[i];
    //             const width = canvas.getContext().measureText(char).width;
    //             positions.push({
    //                 char,
    //                 x: xPos,
    //                 opacity: 0,
    //                 scale: 0.5,
    //             });
    //             xPos += width + 10;
    //         }
    //         return positions;
    //     });

    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //         console.log("efrdegd", method, _char,)
    //         const { char, opacity, scale } = charPositions[lineIndex][charIndex];
    //         const newOpacity = Math.min(1, opacity + 0.05);
    //         const newScale = Math.min(1, scale + 0.025);
    //         const blurAmount = 5 * (1 - newOpacity);

    //         ctx.save();
    //         ctx.translate(left, top);
    //         ctx.scale(newScale, newScale);
    //         ctx.font = `${newTextObject.fontWeight} ${newTextObject.fontSize}px ${newTextObject.fontFamily}`;
    //         ctx.fillStyle = newTextObject.fill;
    //         ctx.globalAlpha = newOpacity;
    //         ctx.filter = `blur(${blurAmount}px)`;
    //         ctx.fillText(_char, 0, 0);
    //         ctx.restore();

    //         charPositions[lineIndex][charIndex].opacity = newOpacity;
    //         charPositions[lineIndex][charIndex].scale = newScale;
    //     };
    //     let animationFrameId = null;
    //     if (showAnimation) {
    //         newTextObject.animate('opacity', '1', {
    //             duration: 3000,
    //             onChange: canvas.renderAll.bind(canvas),
    //             onComplete: function () {
    //                 const textLines = initialText.split('\n');
    //                 const charPositions = textLines.map((line, lineIndex) => {
    //                     const positions = [];
    //                     let xPos = newTextObject.left;
    //                     for (let i = 0; i < line.length; i++) {
    //                         const char = line[i];
    //                         const width = canvas.getContext().measureText(char).width;
    //                         positions.push({
    //                             char,
    //                             x: xPos,
    //                             opacity: 0,
    //                             scale: 0.5,
    //                         });
    //                         xPos += width + 10;
    //                     }
    //                     return positions;
    //                 });

    //                 const fadeInAni = textLines.map((line) =>
    //                     Array.from({ length: line.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    //                 );

    //                 let step = 0;



    //                 const animate = () => {
    //                     canvas.clear();
    //                     let animationComplete = true;

    //                     textLines.forEach((line, lineIndex) => {
    //                         newTextObject.lineHeight = Math.min(1.3, newTextObject.lineHeight + 0.01);

    //                         const yPos = newTextObject.top + lineIndex * newTextObject.fontSize * newTextObject.lineHeight + newTextObject.fontSize / 2;

    //                         for (let i = 0; i < line.length; i++) {
    //                             const charIndex = fadeInAni[lineIndex][i];
    //                             const { char, x: baseXPos } = charPositions[lineIndex][charIndex];

    //                             if (step >= i) {
    //                                 newTextObject._renderChar('fillText', canvas.getContext(), lineIndex, charIndex, char, baseXPos, yPos);

    //                                 if (charPositions[lineIndex][charIndex].opacity < 1) {
    //                                     animationComplete = false;
    //                                 }
    //                             }
    //                         }
    //                     });

    //                     if (!animationComplete || newTextObject.lineHeight < 1.3) {
    //                         step++;
    //                         animationFrameId = requestAnimationFrame(animate);
    //                     } else {
    //                         console.log('Animation complete');
    //                         setShowAnimation(false);
    //                     }
    //                 };

    //                 animate();
    //             },
    //             easing: fabric.util.ease.easeOutBounce,
    //         });
    //     } else {
    //         canvas.renderAll();
    //     }

    //     return () => {
    //         if (animationFrameId) {
    //             cancelAnimationFrame(animationFrameId);
    //         }
    //         canvas.dispose();
    //     };
    // }, [showAnimation]);


    // useEffect(()=> {
    //     const canvas = new fabric.Canvas("canvasElement", {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 400,
    //         fontSize: 30,
    //         lineHeight: 1,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 1,
    //     });

    //     newTextObject.setSelectionStyles({ fontSize: 20 }, 0, 5);
    //     canvas.add(newTextObject);

    //     newTextObject._renderChar =  (method, ctx, lineIndex, charIndex, _char, left, top) => {

    //         console.log("effasfsardegd", {method, ctx, lineIndex, charIndex, _char, left, top});


    //         const decl = newTextObject._getStyleDeclaration(lineIndex, charIndex),
    //         fullDecl = newTextObject.getCompleteStyleDeclaration(lineIndex, charIndex),
    //         shouldFill = method === 'fillText' && fullDecl.fill,
    //         shouldStroke =
    //           method === 'strokeText' && fullDecl.stroke && fullDecl.strokeWidth;

    //       if (!shouldStroke && !shouldFill) {
    //         return;
    //       }
    //       ctx.save();

    //       ctx.font = newTextObject._getFontDeclaration(fullDecl);

    //      if (decl) {
    //         if (decl.textBackgroundColor) {
    //             newTextObject._removeShadow(ctx);
    //           }
    //           if (decl.deltaY) {
    //             top += decl.deltaY;
    //           }
    //      }

    //       if (shouldFill) {
    //         const fillOffsets = newTextObject._setFillStyles(ctx, fullDecl);
    //         ctx.fillText(
    //           _char,
    //           left - fillOffsets.offsetX,
    //           top - fillOffsets.offsetY
    //         );
    //       }

    //       if (shouldStroke) {
    //         const strokeOffsets = newTextObject._setStrokeStyles(ctx, fullDecl);
    //         ctx.strokeText(
    //           _char,
    //           left - strokeOffsets.offsetX,
    //           top - strokeOffsets.offsetY
    //         );
    //       }

    //       ctx.restore();

    //         // // newAnimateObj = { ctx: ctx, lineIndex: lineIndex, charIndex: charIndex, char: _char, left: left, top: top }
    //         // const { char, opacity, scale } = charPositions[lineIndex][charIndex];
    //         // const newOpacity = Math.min(1, opacity + 0.05);
    //         // const newScale = Math.min(1, scale + 0.025);
    //         // const blurAmount = 5 * (1 - newOpacity);

    //         // ctx.save();
    //         // ctx.translate(left, top);
    //         // ctx.scale(newScale, newScale);
    //         // ctx.fillStyle = newTextObject.fill;
    //         // ctx.globalAlpha = newOpacity;
    //         // ctx.filter = `blur(${blurAmount}px)`;
    //         // ctx.fillText(_char, 0, 0);
    //         // ctx.restore();

    //         // charPositions[lineIndex][charIndex].opacity = newOpacity;
    //         // charPositions[lineIndex][charIndex].scale = newScale;
    //         // // opacity = newOpacity
    //         // // scale = newScale
    //     };
    // }, [])

    // useEffect(() => {
    //     const canvas = new fabric.Canvas("canvasElement", {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 400,
    //         fontSize: 30,
    //         lineHeight: 1,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 1,
    //     });
    //     newTextObject.setSelectionStyles({ fontSize: 20 }, 0, 5);
    //     canvas.add(newTextObject);

    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //         console.log("_char", lineIndex);
    //         const getText = newTextObject?.textLines
    //         const totalLength = newTextObject?.textLines
    //         console.log("getText", getText, totalLength)
    //         for (let index = 0; index < getText.length; index++) {
    //             const LineText = getText[lineIndex];
    //             console.log("LineText", LineText)
    //             for (let index = 0; index < LineText.length; index++) {
    //                 const charGet = LineText[charIndex];
    //                 console.log("charGet", charGet)

    //             }

    //         }

    //         ctx.restore();
    //     };

    //     canvas.renderAll();
    // }, [showAnimation]);

    // useEffect(() => {
    //     const canvas = new fabric.Canvas("canvasElement", {
    //         width: 600,
    //         height: 400,
    //     });

    //     const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
    //     const newTextObject = new fabric.Textbox(initialText, {
    //         left: 50,
    //         top: 50,
    //         width: 400,
    //         fontSize: 30,
    //         lineHeight: 1,
    //         fontFamily: 'Arial',
    //         fill: 'black',
    //         opacity: 1,
    //     });

    //     newTextObject.setSelectionStyles({ fontSize: 20 }, 0, 5);
    //     canvas.add(newTextObject);

    //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
    //         console.log(`Rendering char '${_char}' at line ${lineIndex}, index ${charIndex}`);

    //         const textLines = this.textLines || [];

    //         if (textLines[lineIndex]) {
    //             const lineText = textLines[lineIndex];
    //             if (lineText[charIndex]) {
    //                 const charGet = lineText[charIndex];
    //                 console.log("charGet", charGet);
    //                 // Example: Apply blur effect based on character
    //                 ctx.filter = 'blur(2px)';  // Adjust blur effect as needed
    //             }
    //         }

    //         // Call the original _renderChar method to perform the actual rendering
    //         this.callSuper('_renderChar', method, ctx, lineIndex, charIndex, _char, left, top);

    //         ctx.restore();
    //     };

    //     canvas.renderAll();
    // }, [showAnimation]);

    // useEffect(() => {
        // const canvas = new fabric.Canvas("canvasElement", {
        //     width: 600,
        //     height: 400,
        // });
    
        // const initialText = "Your paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text\nYour paragraph text";
        // const newTextObject = new fabric.Textbox(initialText, {
        //     left: 50,
        //     top: 50,
        //     width: 400,
        //     fontSize: 30,
        //     lineHeight: 1,
        //     fontFamily: 'Arial',
        //     fill: 'black',
        //     opacity: 1,
        // });
    
    //     newTextObject.setSelectionStyles({ fontSize: 20 }, 0, 5);
    //     canvas.add(newTextObject);
    //     const getData = newTextObject?.textLines;
    //     let secondSplitArray = getData[0].split("");
    
    //     function generateRandomNumberArray(arrayLength) {
    //         if (arrayLength < 1) return [];
    //         let arr = Array.from({ length: arrayLength }, (_, i) => i);
    //         for (let i = arr.length - 1; i > 0; i--) {
    //             const j = Math.floor(Math.random() * (i + 1));
    //             [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    //         }
    //         return arr;
    //     }
    
    //     let randomCountArray = generateRandomNumberArray(secondSplitArray.length);
    
    //     // Override the _renderChar method
    //     newTextObject._renderChar = function(method, ctx, lineIndex, charIndex, _char, left, top) {
    //         // Apply blur effect
    //         ctx.filter = 'blur(2px)'; // Adjust the blur amount as needed
    
    //         // Save the current context state
    //         ctx.save();
    
    //         // Randomly scale the character
    //         const scaleFactor = 1 + Math.random() * 0.5; // Scale factor between 1 and 1.5
    //         ctx.translate(left, top);
    //         ctx.scale(scaleFactor, scaleFactor);
    //         ctx.translate(-left, -top);
    
    //         // Render the character
    //         ctx[method](_char, left, top);
    
    //         // Restore the context state
    //         ctx.restore();
    
    //         // Reset the filter
    //         ctx.filter = 'none';
    //     };
    
    //     canvas.renderAll();
    // }, [showAnimation]);

  

    const toggleAnimation = () => {
        setShowAnimation((prev) => !prev);
    };

    // useEffect(() => {
    //     console.log("showAnimation", showAnimation)
    // }, [showAnimation])

    return (
        <>
            <canvas id="canvasElement" />
            <button onClick={toggleAnimation}>
                {showAnimation ? 'Stop Animation' : 'Start Animation'}
            </button>
        </>
    );
};

export default AnimatedTextCanvas;
