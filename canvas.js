const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

context.lineWidth = 2;
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 5;

export const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
};

export const resizeCanvas = () => {
    context.shadowColor = "black";
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
};

export const drawShape = (
    x,
    y,
    outerRadius,
    innerRadius,
    numberOfSides,
    hue,
    colorPicked
) => {
    context.shadowColor = "black";
    context.fillStyle = colorPicked ? colorPicked : `hsl(${hue}, 100%, 50%)`;
    context.beginPath();
    context.save();
    context.translate(x, y);
    context.moveTo(0, -outerRadius);
    for (let i = 0; i < numberOfSides; i++) {
        context.rotate(Math.PI / numberOfSides);
        context.lineTo(0, -outerRadius * innerRadius);
        context.rotate(Math.PI / numberOfSides);
        context.lineTo(0, -outerRadius);
    }
    context.restore();
    context.closePath();
    context.stroke();
    context.fill();
};

export const drawCircle = (x, y, radius, hue, colorPicked) => {
    context.fillStyle = colorPicked
        ? colorPicked
        : hue
        ? `hsl(${hue}, 100%, 50%)`
        : "white";
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
};

export const smoothDraw = (x1, y1, x2, y2, outerRadius, hue, colorPicked) => {
    context.shadowColor = "transparent";
    const distance = Math.hypot(x2 - x1, y2 - y1);
    const step = outerRadius / 2;
    for (let i = 0; i < distance; i += step) {
        const x = x1 + (x2 - x1) * (i / distance);
        const y = y1 + (y2 - y1) * (i / distance);
        drawCircle(x, y, outerRadius, hue, colorPicked);
    }
};
