  const   arrow1 = (context) => {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(25, 25);
    context.lineTo(0, 50);
    context.lineTo(0, 35);
    context.lineTo(-25, 35);
    context.lineTo(-25, 15);
    context.lineTo(0, 15);
    context.closePath();
    context.fill();
  };
  export { arrow1 };



    const arrow2 = (context) => {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(25, 25);
    context.lineTo(0, 50);
    context.lineTo(0, 35);
    context.lineTo(-25, 35);
    context.lineTo(-25, 15);

    context.lineTo(0, 15);
    context.closePath();
    context.stroke();
  }
  export { arrow2 };