import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const Text = ({ canvas, model }) => {
  useEffect(() => {
    const { width, fontFamily, textAlign, text, fontSize, x, y } = model;
    const textbox = new fabric.Textbox(text, {
      width,
      fontSize,
      fontFamily,
      textAlign,
      // charSpacing: 1000,
      // lineHeight:2,
      left: x,
      top: y,
      ...model,
    });
    canvas.add(textbox);

    return () => {
      canvas.remove(textbox);
    };
  }, [canvas, model]);

  return null;
};

export default Text;
