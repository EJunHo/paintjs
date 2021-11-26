const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBT = document.getElementById("jsSave");
const Initial_color = "#2c2c2c";
const Canvas_Size = 700;

canvas.width = Canvas_Size;
canvas.height = Canvas_Size;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, Canvas_Size, Canvas_Size);
ctx.strokeStyle = "Initial_color";
ctx.fillStyle = "Initial_color"
ctx.lineWidth = 2.5;

let painting = false; 
let filling = false;

function stopPainting() {
    painting = false;
}
function startPainting() {
    painting = true;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
       // console.log("creating Path in", x , y)
        ctx.beginPath(); //path = Line
        ctx.moveTo(x, y);
    } else {
       // console.log("creating Line in", x , y)
        ctx.lineTo(x, y);
        ctx.stroke(); //획을 긋다
    }
}


function onmouseup(event) {
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function hadnleRangeCheange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick() {
   if(filling === true) {
       filling = false;
       mode.innerText = "Fill";
   } else {
       filling = true;
       mode.innerText = "Paint";
      
   }
}

function handleCanvasClick() { 
    if(filling){
        ctx.fillRect(0, 0,Canvas_Size, Canvas_Size);
    }
    
}
function handelCM(event) {
   event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handelCM);
}
//console.log(colors); 
//1. ProtoType object length HTMLcollectiong
//console.log(Array.from(colors));
//2. Array object

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", hadnleRangeCheange)
}

if(mode) {
    mode.addEventListener("click", handleModeClick)
}

if(saveBT) {
    saveBT.addEventListener("click",handleSaveClick)
}
 