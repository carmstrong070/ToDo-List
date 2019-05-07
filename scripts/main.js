var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addBtn = document.querySelector("#create-item > button");
    addBtn.onclick = processNewItem;
};
function processNewItem() {
    var item = getItemFromForm();
    saveItem(item);
    notifyUser();
    clearForm();
}
function clearForm() {
    var textElements = document.querySelectorAll("input[type=text], textarea");
    textElements.forEach(function (element) {
        element.value = "";
    });
    document.querySelector("#is-complete").checked = false;
    document.querySelector("#urgency").selectedIndex = 0;
}
function notifyUser() {
    alert("Your item was saved.");
}
function saveItem(item) {
    var data = JSON.stringify(item);
    console.log("Converting todoitem into JSON string....");
    console.log(data);
    if (typeof (Storage) != "undefined") {
        localStorage.setItem("todo", data);
    }
}
function getItemFromForm() {
    var item = new ToDoItem();
    item.title =
        document.getElementById("title").value;
    item.description =
        document.getElementById("description").value;
    var itemStartDate = document.getElementById("start-date").value;
    item.startDate = new Date(itemStartDate);
    var itemEndDate = document.getElementById("end-date").value;
    item.endDate = new Date(itemEndDate);
    item.isComplete =
        document.getElementById("is-complete").checked;
    var urgencyElem = document.getElementById("urgency");
    item.urgency = urgencyElem.options[urgencyElem.selectedIndex].text;
    return item;
}
