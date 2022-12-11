function saveData() {

    //saves stuff to local storage
    window.localStorage.setItem("saveKey", JSON.stringify({
        data,
        routeNames,
        routes
    }))

}

function loadData() {

    //loads stuff from local storage
    const saveString = localStorage.getItem("saveKey");
    if (!saveString) return;
    const save = JSON.parse(saveString);

    data = save.data;
    routeNames = save.routeNames;
    routes = save.routes;
    updateResources();

}

function resetData() {
    //do this if your workers go on strike
    localStorage.clear();
    location.reload();
}

//from henryL from an earlier project
function downloadData() {
    //exports data as json file
    saveData();
    const json = localStorage.getItem("saveKey");
    const fileName = "save.json";
    const a = document.createElement('a');
    const type = fileName.split(".").pop();
    a.href = URL.createObjectURL(new Blob([json], { type: `text/${type === "txt" ? "plain" : type}` }));
    a.download = fileName;
    a.click();
}

async function uploadData() {
    //imports data from json file
    try {
        const [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const contents = await file.text();
        localStorage.setItem("saveKey", contents);
        loadData();
    } catch (err) { }
}

loadData();
setInterval(saveData, 15000);