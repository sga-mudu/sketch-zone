import { clearCanvas, drawShape, drawSmooth, resizeCanvas } from "./canvas.js";



let isDrawing = false;
let lastX;
let lastY;
let hue = 0;
let colorPicked = null;

let drawingMode = 'smooth';

const canvas = document.querySelector("#canvas");
const outerRadiusInput = document.querySelector("#outer-radius input");
const colorPickers = document.querySelector(".color-pickers");
const modeButtons = document.querySelector(".mode-buttons");
const innerRadiusInput = document.querySelector("#inner-radius input");
const numbOfSidesInput = document.querySelector("#number-of-side input");
const clearButton = document.querySelector("#clear")
const downloadButton = document.querySelector("#download")


window.addEventListener("mousedown", (e) =>{
    if(e.target === canvas){
        isDrawing = true;
        lastX = e.x;
        lastY = e.y;
    } else {
        isDrawing = false;
    }
});
window.addEventListener("mouseup", () =>{
    isDrawing = false;
});


window.addEventListener("mousemove", (e) =>{
    if(isDrawing){
        draw(e.x, e.y);
    }
});

const draw = (x, y) => {
    const outerRadius = outerRadiusInput.value;
    const innerRadius = innerRadiusInput.value;
    const numOfSides = numbOfSidesInput.value;


    if(drawingMode === 'smooth'){
        drawSmooth(lastX, lastY, x, y, outerRadius, hue, colorPicked);
    } else if(drawingMode === 'shape') {
        drawShape(x, y, outerRadius, innerRadius, numOfSides, hue, colorPicked);
    } else if (drawingMode === 'eraser'){
        drawSmooth(lastX, lastY, x, y, outerRadius);
    }
    lastX = x;
    lastY = y;
    hue += 0.5;
};



colorPickers.addEventListener("click", (e) => {
    const colorPicker = e.target;
    if(!colorPicker.id) return;
    if(colorPicker.id === "solid-color"){
        colorPicker.addEventListener("change", () => {
            colorPicked = e.target.value;
        });
    }

    if(colorPicker.id === "hue-cycling"){
        colorPicked = "";
        hue = 0;
    }

    document.querySelector(".color-container").forEach((container) => {
        container.classList.remove("active");
    });

    colorPicker.parentElement.calssList.add("active");
});


modeButtons.addEventListener("click", (e) => {
    console.log(e.target);
    const selectedButton = e.target;
    if(!selectedButton.id) return;

    Array.from(modeButtons.children).forEach((button) => 
        button.classList.remove("active")
    );

    selectedButton.classList.add("active");

    drawingMode = selectedButton.id;

    if(drawingMode === 'shape'){
        innerRadiusInput.parentElement.classList.add("active");
        numbOfSidesInput.parentElement.classList.add("active");
    }else {
        innerRadiusInput.parentElement.classList.remove("active");
        numbOfSidesInput.parentElement.classList.remove("active");
    }
});

clearButton.addEventListener("click", clearCanvas);

downloadButton.addEventListener("click", () =>{
    const a = document.createElement("a");
    a.download = `${new Date().getTime}.jpg`;
    a.href = canvas.toDataURL();
    a.click();
});


window.addEventListener("resize", resizeCanvas);
