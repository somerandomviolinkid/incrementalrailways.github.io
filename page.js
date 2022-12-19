function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

let progress1 = 0;
let progress1ID;
function moveFreightProgressBar() {

    document.getElementById("collectFeesButton").style.display = "none";

    function nextFrame() {
        progress1 += (data.buildingStats.freightDepot.tracks);
        document.getElementById("freightProgressBar").style.width = (progress1 / 5) + "%";
    }
    progress1ID = setInterval(nextFrame, 20);
    setTimeout(stopFreightTimer, (10000 / data.buildingStats.freightDepot.tracks))
}


function defaultTabColor(tabName) {
    document.getElementById(tabName).style.color = "black";
}

function highlightTab(tabName) {
    document.getElementById(tabName).style.color = "red";
    setTimeout(defaultTabColor, 1500, tabName);
}