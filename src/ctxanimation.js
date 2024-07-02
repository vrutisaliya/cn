 useEffect(() => {
    const canvasElement = canvasRef.current;
    const ctx = canvasElement.getContext('2d');
    const width = 600;
    const height = 400;
  
    canvasElement.width = width;
    canvasElement.height = height;
  
    let newText = 'Your paragraph text';
    let fontSize = 30;
    let lineHeight = 1.3;
    let fontFamily = 'Arial';
    let fillStyle = 'blue';
  
    // Animation variables
    let fadeRate = 0.02;
    let maxBlur = 8;
    let startX = 10; // Start X position
    let startY = 50; // Y position to start rendering text
  
    // Measure the text width
    ctx.font = `${fontSize}px ${fontFamily}`;
    let textWidth = ctx.measureText(newText).width;
  
    // Calculate center X position
    let centerX = (width - textWidth) / 2;
  
    // Initialize animation state
    let opacity = 0;
    let blurLevel = maxBlur;
    let currentPosition = startX;
  
    // Function to render text with animation
    function renderTextWithAnimation() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = fillStyle;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = 'top';
  
      ctx.globalAlpha = opacity;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = blurLevel;
  
      ctx.fillText(newText, currentPosition, startY);
  
      // Reset canvas settings
      ctx.globalAlpha = 1;
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  
    // Animation loop
    let animationFrameId = null;
  
    function animate() {
      if (currentPosition < centerX) { // Center X position
        opacity = Math.min(1, opacity + fadeRate);
        blurLevel = maxBlur * (1 - opacity);
        currentPosition += 3; // Adjust speed of transition
  
        animationFrameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId);
        return;
      }
  
      renderTextWithAnimation();
    }
  
    // Start animation
    animate();
  
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);