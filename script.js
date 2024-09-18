import { clearCanvas, drawShape, smoothDraw } from "./canvas.js";

let drawingMode = "smooth";
let colorPicked = "";
let isDrawing = false;
let isRotating = true;
let hue = 0;
let angle = 0;
let lastX = 0;
let lastY = 0;

const outerRadiusInput = document.querySelector("#outerRadius input");
const innerRadiusInput = document.querySelector("#innerRadius input");
const numberOfSidesInput = document.querySelector("#numberOfSides input");
const clearButton = document.querySelector("#clear");
const downloadButton = document.querySelector("#download");
const modeButtons = document.querySelector(".mode-buttons");
const colorPickers = document.querySelector(".color-pickers");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const draw = (x, y) => {
    const outerRadius = outerRadiusInput.value;
    const innerRadius = innerRadiusInput.value;
    const numberOfSides = numberOfSidesInput.value;

    hue += 0.5;
    if (drawingMode === "smooth") {
        smoothDraw(lastX, lastY, x, y, outerRadius, hue, colorPicked);
    } else if (drawingMode === "eraser") {
        smoothDraw(lastX, lastY, x, y, outerRadius);
    } else if (drawingMode === "shape") {
        drawShape(
            x,
            y,
            outerRadius,
            innerRadius,
            numberOfSides,
            hue,
            colorPicked
        );
    }
    lastX = x;
    lastY = y;
};

window.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        if (isRotating && drawingMode === "shape") {
            context.save();
            context.translate(e.x, e.y);
            context.rotate(angle);
            draw(0, 0);
            angle += 0.1;
            context.restore();
        } else {
            console.log("hii");
            draw(e.x, e.y);
        }
    }
});

window.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.x;
    lastY = e.y;
    draw(e.x, e.y);
});

window.addEventListener("mouseup", () => {
    isDrawing = false;
});

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 5;
    context.shadowColor = "black";
});

clearButton.addEventListener("click", () => {
    clearCanvas();
});

downloadButton.addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = `${new Date().getTime()}.jpg`;
    a.href = canvas.toDataURL();
    a.click();
});

modeButtons.addEventListener("click", (e) => {
    const button = e.target;
    Array.from(modeButtons.children).forEach((button) =>
        button.classList.remove("active")
    );
    button.classList.add("active");
    drawingMode = button.id;

    if (drawingMode === "shape") {
        innerRadiusInput.parentElement.classList.add("active");
        numberOfSidesInput.parentElement.classList.add("active");
    } else {
        innerRadiusInput.parentElement.classList.remove("active");
        numberOfSidesInput.parentElement.classList.remove("active");
    }
});

colorPickers.addEventListener("click", (e) => {
    const colorPicker = e.target;
    if (colorPicker.id === "solid-color") {
        colorPicker.addEventListener("change", (e) => {
            colorPicked = e.target.value;
        });
    }
    if (colorPicker.id === "hue-cycling") {
        colorPicked = "";
        hue = 0;
    }
    Array.from(colorPicker.parentElement.parentElement.children).forEach(
        (picker) => {
            picker.classList.remove("active");
        }
    );
    colorPicker.parentElement.classList.add("active");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "r") {
        isRotating = !isRotating;
    }
});
