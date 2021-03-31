let but1 = document.getElementById("l1");
let but2 = document.getElementById("l2");
let but3 = document.getElementById("l3");

but1.style.background = "#838584";
but2.style.background = "#838584";
but3.style.background = "#838584";

but1.onclick = () =>{
    if(but1.getAttribute("value") == "off"){
        fetch('/light1');
        but1.style.background = "#f5f242";
        but1.setAttribute("value" , "on");
    }
    else {
        fetch('/light1');
        but1.style.background= "#838584";
        but1.setAttribute("value" , "off");
    }
}

but2.onclick = () =>{
    if(but2.getAttribute("value") == "off"){
        fetch('/light2');
        but2.style.background = "#f5f242";
        but2.setAttribute("value" , "on");
    }
    else {
        fetch('/light2');
        but2.style.background= "#838584";
        but2.setAttribute("value" , "off");
    }
}

but3.onclick = () =>{
    if(but3.getAttribute("value") == "off"){
        fetch('/light3');
        but3.style.background = "#f5f242";
        but3.setAttribute("value" , "on");
    }
    else {
        fetch('/light3');
        but3.style.background= "#838584";
        but3.setAttribute("value" , "off");
    }
}
