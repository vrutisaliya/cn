import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const AnimatedTextCanvas = () => {
    const canvasRef = useRef(null);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        const canvas = new fabric.Canvas('canvasElement', {
            width: 600,
            height: 400,
        });

        const initialText = "Your paragraph text";
        const newTextObject = new fabric.Textbox(initialText, {
            left: 50,
            top: 50,
            width: 500,
            fontSize: 30,
            lineHeight: 1,
            fontFamily: 'Arial',
            fill: 'black',
            opacity: 1,
        });

        canvas.add(newTextObject);

        let startTime = null;
        const blurAmount = 10; // Initial blur amount
        const blurDuration = 2000; // Duration for the blur effect in ms
        const charDelay = 100; // Delay between each character appearance in ms

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            newTextObject.dirty = true; // Mark object as dirty to force redraw

            newTextObject._render = function (ctx) {
                ctx.save();

                this.textLines.forEach((line, lineIndex) => {
                    let offsetLeft = this._getLeftOffset();
                    const words = line.split(' ');

                    words.forEach((word, wordIndex) => {
                        const wordWidth = ctx.measureText(word).width;

                        [...word].forEach((char, charIndex) => {
                            const charProgress = progress - (charIndex + wordIndex * word.length) * charDelay;

                            if (charProgress > 0) {
                                const isStart = charIndex === 0;
                                const isMiddle = charIndex === Math.floor(word.length / 2);
                                const isEnd = charIndex === word.length - 1;

                                let blurFactor = 0;
                                let darkenFactor = 1; // Initial brightness

                                if (isStart || isMiddle || isEnd) {
                                    blurFactor = Math.max(blurAmount - (charProgress / blurDuration) * blurAmount, 0);
                                }

                                if (charProgress > blurDuration) {
                                    darkenFactor = Math.max(0, 1 - ((charProgress - blurDuration) / blurDuration));
                                }

                                ctx.filter = `blur(${blurFactor}px) brightness(${darkenFactor})`;
                                ctx.globalAlpha = Math.min(charProgress / blurDuration, 1); // Gradually show the characters

                                ctx.fillText(char, offsetLeft, this._getTopOffset() + this.fontSize * lineIndex);
                            }

                            offsetLeft += ctx.measureText(char).width; // Increment by character width for natural spacing
                        });

                        offsetLeft += ctx.measureText(' ').width; // Add space between words
                    });
                });

                ctx.restore();
            };

            canvas.renderAll();

            if (showAnimation) {
                requestAnimationFrame(animate);
            } else {
                newTextObject._render = fabric.Textbox.prototype._render; // Reset to default behavior
                canvas.renderAll();
            }
        };

        if (showAnimation) {
            newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
                console.log("Character render info:", { method, ctx, lineIndex, charIndex, _char, left, top });

                const charProgress = performance.now() - startTime - (charIndex + lineIndex * _char.length) * charDelay;
                let blurFactor = 0;
                let darkenFactor = 1; // Initial brightness

                if (charProgress > 0) {
                    const isStart = charIndex === 0;
                    const isMiddle = charIndex === Math.floor(_char.length / 2);
                    const isEnd = charIndex === _char.length - 1;

                    if (isStart || isMiddle || isEnd) {
                        blurFactor = Math.max(blurAmount - (charProgress / blurDuration) * blurAmount, 0);
                    }

                    if (charProgress > blurDuration) {
                        darkenFactor = Math.max(0, 1 - ((charProgress - blurDuration) / blurDuration));
                    }

                    ctx.filter = `blur(${blurFactor}px) brightness(${darkenFactor})`;
                    ctx.globalAlpha = Math.min(charProgress / blurDuration, 1); // Gradually show the characters
                }

                fabric.Text.prototype._renderChar.call(this, method, ctx, lineIndex, charIndex, _char, left, top);
            };

            requestAnimationFrame(animate);
        } else {
            newTextObject._renderChar = fabric.Text.prototype._renderChar; // Reset to default behavior
            newTextObject._render = fabric.Textbox.prototype._render; // Reset to default behavior
            canvas.renderAll();
        }
    }, [showAnimation]);

    const toggleAnimation = () => {
        setShowAnimation((prev) => !prev);
    };

    return (
        <>
            <canvas id="canvasElement" ref={canvasRef} />
            <button onClick={toggleAnimation}>
                {showAnimation ? 'Stop Animation' : 'Start Animation'}
            </button>
        </>
    );
};

export default AnimatedTextCanvas;
