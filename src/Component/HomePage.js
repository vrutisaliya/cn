import React, { useEffect, useRef, useState } from "react";
import initialData from './data'
import Text from '../extra/TextInput';
import AnimationText3 from "../assets/animationStyle/animationText3.webp";
import AnimationText4 from "../assets/animationStyle/animationText4.webp";
import "./style.css";
import DesignCanvas from "./CanvasPage";

export default function HomePage() {

  const [data, setData] = useState(initialData.children || []);
  const [selectedObject, setSelectedObject] = useState(null);
  const canvasRef = useRef(null);

  const createElements = () => {
    return data.map(model => {
      if (model.type === 'text') {
        return <Text canvasRef={canvasRef.current} key={model.id} selectedObject={selectedObject} setAnimationStyle={setAnimationStyle} model={model} animationStyle={animationStyle} />;
      } else {
        return null;
      }
    });
  };
  const [animationStyle, setAnimationStyle] = useState({
    clarifyAnimation: false,
    fadeAnimation: false
  });

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const canvas = new fabric.Canvas(canvasElement, {
      width: 600,
      height: 400,
    });

    let newText = 'Your paragraph text';
    const newTextObject = new fabric.Textbox(newText, {
      left: 50,
      top: 50,
      width: 500,
      fontSize: 30,
      lineHeight: 1.3,
      fontFamily: 'Arial',
      fill: 'blue',
      opacity: 0, // Start with opacity 0 for animation
    });

    canvas.add(newTextObject);

    if (showAnimation) {
      newTextObject.animate('opacity', 1, {
        duration: 1000, // Animation duration in milliseconds
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease.easeInOutCubic,
        onComplete: () => {
          // Animation complete logic
          newTextObject.set({ opacity: 1 }); // Ensure opacity is set to 1 at the end
          canvas.renderAll();
          console.log("newTextObject", newTextObject)
        },
      });
    } else {
      newTextObject.set({ opacity: 1 }); // Show immediately if animation is disabled
      canvas.renderAll();
    }

    return () => {
      canvas.dispose(); // Dispose Fabric canvas properly
    };
  }, [showAnimation]);


  const handleAnimationStyleClick = (type) => {
    switch (type) {
      case "clarify":
        setAnimationStyle({
          ...animationStyle,
          clarifyAnimation: true,
        });
        break;
      case "fade":
        setAnimationStyle({
          ...animationStyle,
          fadeAnimation: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="homePage">
      <div className="animationFilter">
        <div className="textBox">
          <div className="animationText fontStyle">
            <h6>Animation Text</h6>
            <div className="styleFont">
              <div className="fontBox">
                <button
                  className={`${animationStyle.fadeAnimation ? "fontBoxButtonActive" : ""
                    }`}
                  style={{ opacity: `${animationStyle.fadeAnimation === true ? "0.6" : "1"}` }}
                  disabled={animationStyle.fadeAnimation === true ? true : false}
                  onClick={() => handleAnimationStyleClick("fade")}
                >
                  <img src={AnimationText3} draggable={false} />
                </button>
                <span>Fade</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${animationStyle.clarifyAnimation ? "fontBoxButtonActive" : ""
                    }`}
                  style={{ opacity: `${animationStyle.clarifyAnimation === true ? "0.6" : "1"}` }}
                  disabled={animationStyle.clarifyAnimation === true ? true : false}
                  onClick={() => handleAnimationStyleClick("clarify")}
                >
                  <img src={AnimationText4} draggable={false} />
                </button>
                <span>Clarify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="showCanvas">
        <div className="showPage">
          <DesignCanvas showGrid={true} selectedObject={selectedObject} setSelectedObject={setSelectedObject} setAnimationStyle={setAnimationStyle} animationStyle={animationStyle}>{createElements()}</DesignCanvas>
        </div>
      </div>
    </div>
  );
}