const body=document.querySelector("body");

const IMG_NUMBER = 5;



function paintImage(IMGNUMBER){
    const image = new Image();
    
    image.src=`images/${IMGNUMBER }.jpg`;
    body.appendChild(image);
    image.classList.add("bgimage");
    image.classList.add("rubberBand");
    

}

function genRandom(){
    //ceil- 천장 (올림) floor- 바닥(내림)
    const num= Math.ceil(Math.random() * IMG_NUMBER);
    //console.log(num);
    return num;

}

function init(){
    const randomNumber = genRandom();
    //console.log(randomNumber);
    paintImage(randomNumber);
}

init();