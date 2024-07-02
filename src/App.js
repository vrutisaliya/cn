import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const AnimatedTextCanvas = () => {
    const canvasRef = useRef(null);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        const canvas = new fabric.Canvas("canvasElement", {
            width: 600,
            height: 400,
        });

        const initialText = "Your paragraph text";
        const newTextObject = new fabric.Textbox(initialText, {
            left: 50,
            top: 50,
            width: 400,
            fontSize: 30,
            lineHeight: 1,
            fontFamily: 'Arial',
            fill: 'black',
            opacity: 1,
        });

        canvas.add(newTextObject);

        let animationFrameId = null;
        let animationIndex = 0;

        const animateText = () => {
            const textLines = newTextObject.textLines;
            const maxLines = textLines.length;

            if (animationIndex < maxLines) {
                const line = textLines[animationIndex];
                for (let j = 0; j < line.length; j++) {
                    setTimeout(() => {
                        newTextObject.setSelectionStyles({ fill: 'red' }, animationIndex, j);
                        newTextObject.animate('left', '+=10', {
                            onChange: canvas.renderAll.bind(canvas),
                            duration: 1000,
                            easing: fabric.util.ease.easeInOutBack
                        });
                        newTextObject.animate('top', '+=10', {
                            onChange: canvas.renderAll.bind(canvas),
                            duration: 1000,
                            easing: fabric.util.ease.easeInOutBack
                        });
                    }, 100 * j); // Adjust timing as needed
                }
                animationIndex++;
                animationFrameId = requestAnimationFrame(animateText);
            }
        };

        const stopAnimation = () => {
            cancelAnimationFrame(animationFrameId);
            animationIndex = 0;
        };

        if (showAnimation) {
            animateText();
        } else {
            stopAnimation();
        }

        return () => {
            stopAnimation();
        };
    }, [showAnimation]);

    const toggleAnimation = () => {
        setShowAnimation((prev) => !prev);
    };

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
