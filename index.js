var logoDiv = document.getElementById("logoimage");
var doneLoading = false;

if(/*location.href.indexOf("nl=1") == -1*/false) {
    document.getElementById("wrapper").classList.add("loading");
    logoDiv.classList.add("loadanimation");
    var listener = logoDiv.addEventListener("animationiteration", function(){
        if(doneLoading) {
            setTimeout(function(){
                logoDiv.classList.remove("loadanimation");
                logoDiv.removeEventListener("animationiteration", listener);
                showPage();
            }, 2000);
        }
    }, 2000);
} else {
    document.getElementsByClassName("overlay")[0].style.display = "none";
    document.getElementById("logotext").classList.add("shown");
    document.getElementById("wrapper").classList.remove("loading");
}

setTimeout(function(){
    doneLoading = true;
}, 4000);

function showPage() {
    document.getElementById("logotext").classList.add("shown");
    setTimeout(function(){
        document.getElementsByClassName("overlay")[0].classList.add("hidden");
        document.getElementById("wrapper").classList.remove("loading");
    }, 2000);
}

var panels = document.getElementsByClassName("panel");

var scrollEvent = function(event) {
    if(event.ctrlKey) {
        return;
    }
    event.preventDefault();

    var nextPanel;

    if(event.deltaY < 0) {
        nextPanel = panels[getCurrentPanelIndex() - 1];
    }

    if(event.deltaY > 0) {
        nextPanel = panels[getCurrentPanelIndex() + 1];
    }
    
    if(nextPanel == undefined) {
        return;
    }

    if(!handleTimeout()) {
        return;
    }
    
    var newYpos = getYPosition(nextPanel);

    window.scroll({
        top: newYpos,
        left: 0,
        behavior: "smooth"
    });

    if(document.getElementById("arrow").classList.contains("bobbing")) {
        document.getElementById("arrow").classList.remove("bobbing");
    }
}

window.addEventListener("wheel", scrollEvent);

function getCurrentPanelIndex() {
    var currentPanelIndex;
    for(var i=0; i<panels.length; i++) {
        if(getYPosition(panels[i]) > window.scrollY) {
            currentPanelIndex = i - 1;
            return currentPanelIndex;
        }
    }
    return panels.length - 1;
}

function getYPosition(element) {
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
}

var lastScroll = 0;
function handleTimeout() {
    var currentTime = new Date().getTime();
    if(currentTime - lastScroll >= 400) {
        lastScroll = currentTime;
        return true;
    }
    return false;
}