import Light from "./Light.js";

export default class LightBoard{

    constructor(canvas) {
        this.canvas = canvas;
        this.ctxt = this.canvas.getContext("2d");
        this.updateLightsFromServer();
        this.selectedLight = null;
        this.currentMode = 1; //1: edit
        this.currentMouseUp = null;
        this.currentMouseDown = null;
        this.currentMouseMove = null;
        this.lightUpdater = null;
        this.toggleEditMode();// immediately toggle

    }

    refresh(){
        this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log(this.lightList);
        for(let l of this.lightList){
            l.drawLight(this.ctxt);
        }
    }

    toggleEditMode(){
        console.log(this.currentMode);
        if(this.currentMode == 0){
            this.currentMode = 1;//1: edit
            clearInterval(this.lightUpdater);
            this.editModeMouseDown();
            this.editModeMouseMove();
            this.editModeMouseUp();
        }
        else{
            this.currentMode = 0;//0: no edit
            this.lightUpdater = setInterval(() => this.updateLightsFromServer(), 5000);
            this.normalModeMouseDown();
            this.normalModeMouseMove();
            this.normalModeMouseUp();
        }

    }

    editModeMouseDown(){
        this.canvas.removeEventListener("mousedown", this.currentMouseDown);
        this.currentMouseDown = (event) =>{
            let xVal = event.pageX - this.canvas.offsetLeft;
            let yVal = event.pageY - this.canvas.offsetTop;
            for(let l of this.lightList){
                if (yVal > l.yCord && yVal < l.yCord + l.size && xVal > l.xCord && xVal < l.xCord + l.size) {
                    this.selectedLight = l;
                }
            }
        }
        this.canvas.addEventListener("mousedown", this.currentMouseDown);

    }

    editModeMouseUp(){
        this.canvas.removeEventListener("mouseup", this.currentMouseUp);
        this.currentMouseUp = (event) =>{
            this.selectedLight = null;
        }
        this.canvas.addEventListener("mouseup", this.currentMouseUp);

    }

    editModeMouseMove(){
        this.canvas.removeEventListener("mousemove", this.currentMouseMove);
        this.currentMouseMove = (event) => {
            if(this.selectedLight != null){
                let xVal = event.pageX - this.canvas.offsetLeft;
                let yVal = event.pageY - this.canvas.offsetTop;

                this.selectedLight.setCords(xVal, yVal);
                this.refresh();
            }
        }
        this.canvas.addEventListener("mousemove", this.currentMouseMove);

    }

    normalModeMouseDown(){
        this.canvas.removeEventListener("mousedown", this.currentMouseDown);
        this.currentMouseDown = (event) => {
            console.log("mouse down in normal mode");
        }
        this.canvas.addEventListener("mousedown", this.currentMouseDown);
    }

    normalModeMouseUp(){
        this.canvas.removeEventListener("mouseup", this.currentMouseUp);
        this.currentMouseUp = (event) => {
            console.log("mouse up in normal mode");
            let xVal = event.pageX - this.canvas.offsetLeft;
            let yVal = event.pageY - this.canvas.offsetTop;
            for(let l of this.lightList){
                if (yVal > l.yCord && yVal < l.yCord + l.size && xVal > l.xCord && xVal < l.xCord + l.size) {
                    l.toggle();
                    this.updateLightsToServer();
                    this.refresh();
                }
            }
        }
        this.canvas.addEventListener("mouseup", this.currentMouseUp);

    }

    normalModeMouseMove(){
        this.canvas.removeEventListener("mousemove", this.currentMouseMove);
        this.currentMouseMove = (event) => {
            console.log("mouse move in normal mode");
        }
        this.canvas.addEventListener("mousemove", this.currentMouseMove);


    }

    readJSON(jsonObj){
        let returnArray = new Array();
        for(let l of jsonObj){
            returnArray.push(new Light(this.ctxt, l.x, l.y, l.size, l.onIMG, l.offIMG,l.state));
        }
        this.lightList = returnArray;
        this.refresh();
    }

    updateLightsFromServer(){
        fetch("/lightStorage").then(res => res.json()).then(res => this.readJSON(res));
    }

    updateLightsToServer(){
        let sendObbject = new Array();
        let counter = 0;
        console.log(this.lightList);
        for(let l of this.lightList){
            console.log(l);
            sendObbject[counter] = {
                "x": l.xCord,
                "y": l.yCord,
                "size": l.size,
                "onIMG": l.onIMG,
                "offIMG": l.offIMG,
                "state": l.state
            }
            counter++;
        }
        console.log(sendObbject);


        fetch("/lightStorage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendObbject)
        }).then( (res) => console.log(res));


    }

}



