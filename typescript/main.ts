
/**
 * Represents a single task in a ToDo list
 */
class ToDoItem{
    title:string;
    description:string;
    startDate:Date;
    endDate:Date;
    isComplete:boolean;
    urgency:string;
    //subTasks:Array<ToDoItem>;
}
/*
let testItem = new ToDoItem();
testItem.title = "Teach CPW 203";
testItem.startDate = new Date("April 30, 2019");
testItem.description = "Lecture advanced JavaScript like a boss!";
testItem.isComplete = true;
if(testItem.isComplete){
}
*/

const itemKey:string = "todo";

window.onload = function(){
    let addBtn = <HTMLButtonElement> document.querySelector("#create-item > button");
    addBtn.onclick = processNewItem;

    let readItemBtn = <HTMLButtonElement> document.querySelector("#read-item > button");
    readItemBtn.onclick = readItem;
}

function processNewItem(){
    let item:ToDoItem = getItemFromForm();
    saveItem(item);
    notifyUser();
    clearForm();
}

function clearForm(){
    // Clear all textboxes
    let textElements = document.querySelectorAll("input[type=text], textarea");
    textElements.forEach(element => {
        (<HTMLInputElement>element).value = "";
    });

    // Clear checkbox
    (<HTMLInputElement>document.querySelector("#is-complete")).checked = false;

    //Reset urgency
    (<HTMLSelectElement>document.querySelector("#urgency")).selectedIndex = 0;
}

function notifyUser(){
    alert("Your item was saved.");
}

/**
 *  Saves item to local storage
 * @param item ToDoItem retrieved from form
 */
function saveItem(item:ToDoItem):void{

    let data:string = JSON.stringify(item);
    console.log("Converting todoitem into JSON string....");
    console.log(data);

    //ensure user can use localStorage
    if(typeof(Storage) != "undefined"){
        localStorage.setItem(itemKey, data);
    }
}

/**
 * Get all user input from Form
 * and wrap it in a ToDoItem
 */
function getItemFromForm():ToDoItem{
    let item = new ToDoItem();

    item.title = 
        (<HTMLInputElement>document.getElementById("title")).value;
    item.description = 
        (<HTMLTextAreaElement>document.getElementById("description")).value;

    let itemStartDate:string = 
        (<HTMLInputElement>document.getElementById("start-date")).value;
    item.startDate = new Date(itemStartDate);

    let itemEndDate:string = 
        (<HTMLInputElement>document.getElementById("end-date")).value;
    item.endDate = new Date(itemEndDate);

    item.isComplete = 
        (<HTMLInputElement>document.getElementById("is-complete")).checked;

    let urgencyElem = <HTMLSelectElement>document.getElementById("urgency");
    item.urgency = urgencyElem.options[urgencyElem.selectedIndex].text;

    return item;
}

function readItem(){
    // get item from local storage
    let item:ToDoItem = JSON.parse(localStorage.getItem(itemKey));

    // display item
    alert(item.title + "\n" + item.description);
}