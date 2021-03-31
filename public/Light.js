export default class Light extends Image{

    constructor(ctxt, xCord, yCord, size, onIMG, offIMG, state) {
        super();
        this.xCord = xCord;
        this.yCord = yCord;
        this.size = size;
        this.onIMG = onIMG;
        this.offIMG = offIMG;
        this.state = state;
        if(this.state == 0){
            super.src = this.offIMG;
        }
        else{
            super.src = this.onIMG;
        }
        super.onload = onload = () =>{
            ctxt.drawImage(this, this.xCord, this.yCord, this.size, this.size);
        }


    }

    drawLight(ctxt){
        ctxt.drawImage(this, this.xCord, this.yCord, this.size, this.size);
    }

    setCords(xCord, yCord){
        this.xCord = xCord - (this.size/2);
        this.yCord = yCord - (this.size/2);
    }

    toggle(){
        if(this.state == 0){
            this.state = 1;
            super.src = this.onIMG;
        }
        else{
            this.state = 0;
            super.src = this.offIMG;
        }
    }
}