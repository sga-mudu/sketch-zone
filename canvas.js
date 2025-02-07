
/**@type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d"); // returns object

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

context.fillStyle = "white";
context.fillRect(0,0, canvas.width, canvas.height);


const drawCircle = (x, y, outerRadius, hue, colorPicked) =>{
    context.shadowColor = "transparent";
    context.fillStyle = "fff";
    if(hue){
        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    } 
    if(colorPicked){
        context.fillStyle = colorPicked;
    }
    
    //hsl = (hue, saturation, lightness)
    context.beginPath();
    context.arc(x, y, outerRadius, 0, Math.PI*2);
    context.closePath();
    context.fill();
}

export const drawSmooth = (lastX, lastY, currentX, currentY, outerRadius, hue, colorPicked) => {
    const distance = Math.hypot(currentX - lastX, currentY - lastY);
    const numOfCircles = Math.ceil(distance / outerRadius) * 5;
    for(let i=0; i<numOfCircles; i++){
        const progress = i / numOfCircles;
        const x = lastX + (currentX - lastX) * progress;
        const y = lastY + (currentY - lastY) * progress;
        drawCircle(x, y, outerRadius, hue, colorPicked);
        
    }
};


export const drawShape = (x, y, outerRadius, innerRadius, numOfSides, hue, colorPicked) =>{
    context.fillStyle = colorPicked ? colorPicked : `hsl(${hue}, 100%, 50%)`;
    context.shadowOffsetY = 5;
    context.shadowOffsetX = 5;
    context.shadowBlur = 10;
    context.shadowColor = "black";
    context.beginPath();
    context.save();
    context.translate(x, y);
    context.moveTo(0, -outerRadius);
    for(let i=0; i<numOfSides; i++){
        context.rotate(Math.PI / numOfSides);
        context.lineTo(0, -outerRadius * innerRadius);
        context.rotate(Math.PI / numOfSides);
        context.lineTo(0, -outerRadius);
    }
    context.restore();
    context.closePath();
    context.stroke();
    context.fill();
};


export const clearCanvas = () =>{
    context.clearRect(0,0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0,0, canvas.width, canvas.height);
}

export const resizeCanvas = () => {
    canvas.height = window.innnerHeight;
    canvas.width = window.innnerWidth;
    context.shadowOffsetY = 5;
    context.shadowOffsetX = 5;
    context.shadowBlur = 10;
};

