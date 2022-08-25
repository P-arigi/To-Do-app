//Create buttons
//Add button
var addButton=document.getElementById("add-button");
addButton.addEventListener("click",addToDoItem );
function addToDoItem(){
    var itemText=toDoEntryBox.value;
    newToDoItem(itemText, false);
}
//Clear button 
var clearCompleted=document.getElementById("clear-completed-button");
clearCompleted.addEventListener("click",clearCompletedToDoItem);
function clearCompletedToDoItem(){
    var completedItems=toDoList.getElementsByClassName("completed");
    while(completedItems.length>0){
        completedItems.item(0).remove();
    }
}
//empty button
var emptyList=document.getElementById("empty-button");
emptyList.addEventListener("click",emptyToDoList);
function emptyToDoList(){
    var toDoItems=toDoList.children;
    while(toDoItems.length>0){
        toDoItems.item(0).remove();
    }
}
//var editList=document.getElementById("edit-button");
//editList.addEventListener("click",editToDoList);
//function editToDoList(){
 //items[index].innerHTML= toDoEntryBox.value
    

//}

//save button
var saveList=document.getElementById("save-button");
saveList.addEventListener("click",saveToDoList);
function saveToDoList(){
    var toDos=[];
    for( var i=0;i<toDoList.children.length;i++){
        var toDo=toDoList.children.item(i);
        var toDoInfo={                               //object we created
            "task":toDo.innerText,
            "completed":toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo);
    }  
    localStorage.setItem("toDos",JSON.stringify(toDos));   // to convert array to string we use the stringify
}

//creating variables to select the textbox and the list.
var toDoEntryBox=document.getElementById("todo-entry-box");
var toDoList=document.getElementById("todo-list");

//creating function, it will need to kow two things:
//1.What is the text of the item?
//2.Should the item be marked as completed>

function newToDoItem(itemText, completed){
    var toDoItem=document.createElement("li");
    var toDoText=document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed){
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick",toggleToDoItemState);

}

function toggleToDoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    }
    else{
        this.classList.add("completed")
    }
}
function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList()

