"use strict";
window.onload = function() {
    ShowList();
    ShowAndHideFunction();

};

function ShowList() {
    for (let showListIndex = 0; showListIndex < AutopopulateData.length; ++showListIndex) {
        let node = document.createElement("li");
        let textnode = document.createTextNode(
            AutopopulateData[showListIndex].title
        );
        node.appendChild(textnode);
        document.getElementById("showing-autopopulate-list").appendChild(node);
    }

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
    let node = document.createElement("li");
    let nodeItem = document.createTextNode(input.value);
    node.appendChild(nodeItem);
    document.getElementById("showing-autopopulate-list").appendChild(node);
    //finally added into autopopulating list
    AutopopulateData.push({
        "title": input.value
    });
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
        let searchResultValue = AutopopulateData[index].title.search(input.value);
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