const DEFAULT_COLOR = "rgb(211, 211, 211)";
const DEFAULT_MODE = "Black";
const DEFAULT_SIZE = 16;
const MAX_WIDTH = 900;
const MAX_HEIGHT = 600;

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;


// CONTAINER 
let container = document.querySelector("#container");


// FORM INPUTS

//size selector
let sizeSelector = document.querySelector("#sizeSelector");
sizeSelector.onmousemove = (e) => changeSize(e.target.value);
let sizeSelectorLabel = document.querySelector("#sizeSelectorLabel");

//color selector
let radios = document.optionsForm.color_mode;
radios.forEach(element => {
    element.addEventListener("change", function()
    {
        currentMode = this.value;
    })
});


// UPDATE FORM INPUTS
function changeSize(value){
    currentSize = value;
    sizeSelectorLabel.textContent = currentSize + "x" + currentSize;
    clearGrid();
    createGrid(value);
}


function onMouseHover(e){

    let R = Math.random() * 256;
    let G = Math.random() * 256;
    let B = Math.random() * 256;
 
    if(currentMode == "Black")
        e.target.style.backgroundColor = "rgb(0,0,0)";
    else if(currentMode == "Rainbow"){
        let code = e.target.style.backgroundColor
        if(code != "" && code != DEFAULT_COLOR){
            let match = code.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/);
            let r = parseInt(match[1]);
            let g = parseInt(match[2]);
            let b = parseInt(match[3]);
            
            r = Math.max(0,r - Math.floor(r / 10));
            g = Math.max(0,g - Math.floor(g / 10));
            b = Math.max(0,b - Math.floor(b / 10));
            e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
        }
        else{
            e.target.style.backgroundColor = `rgb(${R},${G},${B})`;
        }
    }
    else if(currentMode == "Eraser"){
        e.target.style.backgroundColor = DEFAULT_COLOR;
    }
}

function clearGrid(){
    container.innerHTML = '';
}

function createGrid(size){
    for (let i = 0; i < size * size; i++) {
        let div = document.createElement("div");
        div.style.width = (MAX_WIDTH / size) - 2 + "px";
        div.style.height = (MAX_HEIGHT / size) - 2 + "px";
        div.classList.add("grid-item");
        div.addEventListener("mouseover", onMouseHover);
        container.appendChild(div);
    }
}

createGrid(currentSize);