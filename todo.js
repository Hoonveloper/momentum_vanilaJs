const toDoForm=document.querySelector(".js-toDoForm"),
toDoInput=toDoForm.querySelector("input"),
toDoList=document.querySelector(".js-toDoList");

const TODOS_LS='toDos';
var toDos=[];

function delToDo(event){
    // html상에서 삭제 , localstorage 삭제 2가지 해주어야함
    // 1. html상에서 삭제.
    //console.dir(event.target.parentNode);
    const btn=event.target;
    const li= btn.parentNode;
    const num=li.id;
    console.log(num);
    toDoList.removeChild(li);
    // 2. localstorage 삭제
    console.log(toDos);
    const cleanToDos = toDos.filter(function(todo){
        
        return todo.id !== li.id;
    });
    //filter는 array의 모든 아이템을 통해 함수 실행하고 ,
    //true인 값만 반환시켜서 새로운 array 만듬
   // console.log(cleanToDos);
    toDos=cleanToDos;
    saveToDos();
    
    
    
}
//toDos를 localstorage에 올리는 함수. 
function saveToDos(){
    
    //console.log(toDos);
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    //json.stringfy 는 모든 object를 string 으로 변환해줌
    //localstorage에는 string으로 밖에 못넣기 때문에. 
}

//엔터 들어왔거나 새로고침 했을때 todo그리기 작업 함수 .
function paintToDo(text){
    
    // li 엘리먼트 만들어서 btn, span 넣기.
    // span 엘리먼트에 text(todo) 넣기.
    const plusLi=document.createElement('li');
    const delBtn=document.createElement("button");
    const span = document.createElement('span');
    const newId = toDos.length + 1 ;
    plusLi.id= newId;
    delBtn.innerHTML="❌"
    delBtn.addEventListener("click",delToDo);
    span.innerText=text;
    plusLi.appendChild(delBtn);
    plusLi.appendChild(span);

    toDoList.appendChild(plusLi);//html에 추가.

    //이하 localstorage에 추가 .
    const toDoObj = {
        text:text , 
        id:plusLi.id
    };
    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue =toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";

}

//3. localstorage에 이미 있으면 todolist 다시 그려주기.
function loadToDos(){
    const loadedtoDos=localStorage.getItem(TODOS_LS);
    if (loadedtoDos!==null){
        
        const parsedToDos =JSON.parse(loadedtoDos);
        //parse로 string->object로 바꿔줌 . 
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        //바로 함수를 만들어버림. 

    }
   
}

// 2.loadToDos로 localstorage확인 및 엔터 대기 .
function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

// 1. 시작하면 이것 실행 
init();