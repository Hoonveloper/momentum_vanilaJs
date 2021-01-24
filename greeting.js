const form =document.querySelector(".js-form"),
input=form.querySelector("input"),
greetings=document.querySelector(".js-greetings");

function saveName(text){
    localStorage.setItem(USER_LS,text);
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue=input.value;
    paintName(currentValue);
    saveName(currentValue);
   

}
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);

}
const USER_LS="currentUser",
    SHOWING_CN="showing";

function paintName(text){
    form.classList.remove(SHOWING_CN)
    greetings.classList.add(SHOWING_CN);
    greetings.innerText=`Hello! ${text}`
    

}

function loadName(){
    const currentUser =localStorage.getItem(USER_LS);
    if (currentUser===null){
        //없을 때
        askForName();
    }   
    else{
        //있을 때 
        paintName(currentUser);
      //  console.log("currentuser찾음");
    }
}

function init(){
    loadName();
    //console.log("init is 실행");
}



init();