"use strict";
window.onload = function() {
    ShowList();
    ShowAndHideFunction();

};

function ShowList() {
    // for (let showListIndex = 0; showListIndex < AutopopulateData.length; ++showListIndex) {
    //     let node = document.createElement("li");
    //     let textnode = document.createTextNode(
    //         AutopopulateData[showListIndex].title
    //     );
    //     node.appendChild(textnode);
    //     document.getElementById("showing-autopopulate-list").appendChild(node);
    // }

    let html = `<table><tr>`;
    for (let index = 0; index < AutopopulateData.length; index++) {
        html += `
        <td id="${index}">${AutopopulateData[index]}</td>
        <td id="btn${index}">
		<button type="button" onclick="EditItemInList(this)" class=${index}>EDIT</button>
		<button type="button" onclick="DeleteItemInList(this)" class=${index}>DELETE</button>
        </td>
        `;
        html += "</tr><tr>";
    }
    html += "</tr></table>";
    document.getElementById("showing-autopopulate-list").innerHTML = html;
    ClearSearch();

}

function ShowAndHideFunction(requiredId = "home-section") {
    let hiddenitem = document.getElementsByClassName("menu-item");
    for (let index = 0; index < hiddenitem.length; ++index) {
        if (hiddenitem[index].id == requiredId)
            hiddenitem[index].style.display = "block";
        else
            hiddenitem[index].style.display = "none";
    }
    ClearSearch();
}
//adding the searching input in a list...
function AddItem() {
    let input = document.getElementById("myInputSearch");
    let textInSearchBox = input.value;
    // console.log();
    // node.appendChild(nodeItem);
    // document.getElementById("showing-autopopulate-list").appendChild(node);
    // //finally added into autopopulating list
    // AutopopulateData.push({
    //     "title": input.value
    // });

    if (!AutopopulateData.includes(textInSearchBox) && textInSearchBox != "")
        AutopopulateData.push(textInSearchBox);
    ShowList();
    ClearSearch();
}

function ClearSearch() {
    document.getElementById("myInputSearch").value = "";
    RemoveSearchFromHTMLDOM();
}


function RemoveSearchFromHTMLDOM() {
    const previousSearchList = document.getElementById("showing-search-list");
    while (previousSearchList.firstChild) {
        previousSearchList.removeChild(previousSearchList.firstChild);
    }
}
/*
function SearchingTheItem() {
    RemoveSearchFromHTMLDOM();
    let input = document.getElementById("myInputSearch");
    // Loop through all list items, and hide those who don't match the search query
    for (let searchingIndex = 0; searchingIndex < AutopopulateData.length; searchingIndex++) {

        if (AutopopulateData[searchingIndex].title.search(input.value) != -1) {
            let node = document.createElement("p");

            let textnode = document.createTextNode(
                AutopopulateData[searchingIndex].title
            );

            node.appendChild(textnode);
            document.getElementById("showing-search-list").appendChild(node);
        }
    }

}*/
function SearchingTheItem() {
    let input = document.getElementById("myInputSearch");
    let searchResults = [];
    for (let index = 0; index < AutopopulateData.length; ++index) {
        let searchResultValue = AutopopulateData[index].search(input.value);
        if (searchResultValue > 0) {
            searchResults.push(AutopopulateData[index]);
        }
    }
    RemoveSearchFromHTMLDOM();
    for (let index = 0; index < 5; ++index) {
        if (searchResults.length > index) {
            let node = document.createElement("p");
            let textnode = document.createTextNode(
                searchResults[index].title
            );
            node.appendChild(textnode);
            document.getElementById("showing-search-list").appendChild(node);
        }
    }
}

function ShowClickerMenuOption(event) {

    // IE does not know about the target attribute. It looks for srcElement
    // This function will get the event in a browser-compatible way
    event = event || window.event;
    let target = event.target || event.srcElement;
    ShowHiddenFunction(target.id + "-section");
}

function DeleteItemInList(el) {
    AutopopulateData.splice(Number(el.className), 1);
    ShowList();
}

function EditItemInList(el) {
    let tableCell = document.getElementById(el.className);
    let tableButton = document.getElementById("btn" + el.className);
    let inputUpdateBtn = document.createElement('button');
    let inputCancelBtn = document.createElement('button');
    inputUpdateBtn.setAttribute('onclick', 'UpdateList(' + el.className + ')');
    inputCancelBtn.setAttribute('onclick', 'CancelUpdate(' + el.className + ')');
    inputCancelBtn.id = "cancel";
    inputUpdateBtn.id = "update";
    inputUpdateBtn.innerHTML = "UPDATE";
    inputCancelBtn.innerHTML = "CANCEL";
    tableButton.innerHTML = '';
    tableButton.appendChild(inputUpdateBtn);
    tableButton.appendChild(inputCancelBtn);
    let input = document.createElement('input');
    input.type = "text";
    input.value = tableCell.textContent;
    input.className = "changeListItem" + el.className;
    tableCell.innerHTML = '';
    tableCell.appendChild(input);
    input.focus();
}

function UpdateList(index) {
    let classValue = "changeListItem" + index;
    let itemListValue = document.getElementsByClassName(classValue)[0].value;
    if (SearchInList(itemListValue, index)) {
        AutopopulateData[index] = itemListValue;
        let tableCell = document.getElementById(index);
        tableCell.innerHTML = '';
        let html = `<td id="${index}">${AutopopulateData[index]}</td>`;
        tableCell.innerHTML = html;
        let buttonCell = document.getElementById("btn" + index);
        buttonCell.innerHTML = '';
        html = `<td id="btn${index}">
		<button type="button" onclick="EditItemInList(this)" class=${index}>EDIT</button>
		<button type="button" onclick="DeleteItemInList(this)" class=${index}>DELETE</button>
		</td>`;
        buttonCell.innerHTML = html;
    }
}

function CancelUpdate(index) {
    let classValue = "changeListItem" + index;
    let tableCell = document.getElementById(index);
    tableCell.innerHTML = '';
    let html = `<td id="${index}">${AutopopulateData[index]}</td>`;
    tableCell.innerHTML = html;
    let buttonCell = document.getElementById("btn" + index);
    buttonCell.innerHTML = '';
    html = `<td id="btn${index}">
	<button type="button" onclick="EditItemInList(this)" class=${index}>EDIT</button>
	<button type="button" onclick="DeleteItemInList(this)" class=${index}>DELETE</button>
	</td>`;
    buttonCell.innerHTML = html;
}

function SearchInList(itemListValue, dataIndex) {
    for (let index = 0; index < AutopopulateData.length; index++) {
        if (AutopopulateData[index] == itemListValue && index != Number(dataIndex)) {
            return false;
        }
    }
    return true;
}