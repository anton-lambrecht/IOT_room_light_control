import Light from "./Light.js";
import LightBoard from "./LightBoard.js";

let canvas = document.getElementById("canvas");
let toggleBtn = document.getElementById("toggle");
let upBtn = document.getElementById("updateToServer");
let lb = new LightBoard(canvas);
toggleBtn.addEventListener("click", (event)=> lb.toggleEditMode());
upBtn.addEventListener("click", (event)=> lb.updateLightsToServer());

/*

let ctxt = canvas.getContext("2d");
let elemLeft = canvas.offsetLeft;
let elemTop = canvas.offsetTop;

let lights = [new Light(ctxt, 10, 10, 50, "Loff.jpeg"), new Light(ctxt, 20, 20, 50, "Loff.jpeg")];
//let img = new Light(ctxt, 10, 10, 50, "Loff.jpeg");



canvas.addEventListener("mousedown", function (event) {
    canvas.addEventListener("mousemove", mouseMoveEvent);
});

canvas.addEventListener("mouseup", function (event){
   canvas.removeEventListener("mousemove", mouseMoveEvent);
});

function mouseMoveEvent (event){
    let xVal = event.pageX - elemLeft;
    let yVal = event.pageY - elemTop;
    if (yVal > img.yCord && yVal < img.yCord + img.height && xVal > img.xCord && xVal < img.xCord + img.width) {
        img.setCords(xVal, yVal);
        ctxt.clearRect(0, 0, canvas.width, canvas.height);
        img.drawLight(ctxt);
    }

}*/


