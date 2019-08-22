window.onload = function() {
    ShowHiddenFunction();
};

function ShowHiddenFunction(requiredId = "home") {
    let hiddenitem = document.getElementsByClassName("menu-item");
    for (let indexShowHiddenFun = 0; indexShowHiddenFun < hiddenitem.length; indexShowHiddenFun++) {
        if (hiddenitem[indexShowHiddenFun].id == requiredId)
            hiddenitem[indexShowHiddenFun].style.display = "block";
        else
            hiddenitem[indexShowHiddenFun].style.display = "none";
    }
}

function ShowClickerMenuOption(event) {

    // IE does not know about the target attribute. It looks for srcElement
    // This function will get the event target in a browser-compatible way
    event = event || window.event;
    let target = event.target || event.srcElement;
    console.log(target);

    ShowHiddenFunction(target.id);
}