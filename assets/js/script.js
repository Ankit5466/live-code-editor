var j = 0;
//Function for live Rendering
function update(i) {
    if (i == 0) {
        let htmlCode = document.getElementById("htmlCode").value;
        let cssCode = document.getElementById("cssCode").value;
        let javascriptCode = document.getElementById("javascriptCode").value;
        let text = htmlCode + "<style>" + cssCode + "</style>" + "<scri" + "pt>" + javascriptCode + "</scri" + "pt>";
        let iframe = document.getElementById('viewer').contentWindow.document;
        iframe.open();
        iframe.write(text);
        iframe.close();
    }

    else if (i == 1) {

        let htmlCode = document.getElementById("htmlCode").value;
        let html = htmlCode.slice(0, htmlCode.length);
        document.getElementById("htmlCode").value = html;
        j = 1;

    }
}

// Copying the Code
document.getElementById("copy-html").addEventListener("click", function () {
    copyTextareaToClipboard("htmlCode");
});

document.getElementById("copy-css").addEventListener("click", function () {
    copyTextareaToClipboard("cssCode");
});

document.getElementById("copy-javascript").addEventListener("click", function () {
    copyTextareaToClipboard("javascriptCode");
});

function copyTextareaToClipboard(textareaId) {
    const textarea = document.getElementById(textareaId);
    textarea.select();

    try {
        document.execCommand("copy");
        alert("Text has been copied to the clipboard.");
    } catch (err) {
        alert("Oops, unable to copy the text. Please copy it manually.");
    }
}

// Savefile Functionality
function saveFile(){
    var fileName = prompt("Enter Filename: ", "");
    if (fileName != null && (document.getElementById("htmlCode").value != "" || document.getElementById("cssCode").value != "" || document.getElementById("javascriptCode").value != "")){
        var htmlCode = document.getElementById("htmlCode").value;
        var cssCode = document.getElementById("cssCode").value;
        var javascriptCode = document.getElementById("javascriptCode").value;
        let text = htmlCode + "<style>" + cssCode + "</style>" + "<scri"+"pt>" + javascriptCode + "</scri"+"pt>";
        download(text, fileName + ".html", "text/plain");
    } 
    else{
        alert("Please Enter the Filename");
    }
}

function download(data, filename, type) {
    var userFile = new Blob([data], { type: type });
    var a = document.createElement("a"),
    url = URL.createObjectURL(userFile);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}


// Tag Closing Functionality
const closeTags = new Map([
    ['{','}'],
    ['(',')'],
    ['<','>'],
    ['[',']'],
    ['"','"'],
    ["'","'"]
])

// Html code Tag Auto Closing
htmlCode = document.getElementById("htmlCode");
htmlCode.addEventListener('input', function (e){
    if(j!=1){
        const position = e.target.selectionStart;
        const val = [...e.target.value];
        const tag = val.slice(position-1, position)[0];
        const closeTag = closeTags.get(tag);
        if(closeTag){
            val.splice(position, 0 , closeTag);
            e.target.value = val.join('');
            e.target.selectionEnd = position;
        }
    }
    j = 0;
});

// CSS code Tag Auto Closing
cssCode = document.getElementById("cssCode");
cssCode.addEventListener('input', function (e){
    if(j!=1){
        const position = e.target.selectionStart;
        const val = [...e.target.value];
        const tag = val.slice(position-1, position)[0];
        const closeTag = closeTags.get(tag);
        if(closeTag){
            val.splice(position, 0 , closeTag);
            e.target.value = val.join('');
            e.target.selectionEnd = position;
        }
    }
    j = 0;
});

// Javascript code Tag Auto Closing
javascriptCode = document.getElementById("javascriptCode");
javascriptCode.addEventListener('input', function (e){
    if(j!=1){
        const position = e.target.selectionStart;
        const val = [...e.target.value];
        const tag = val.slice(position-1, position)[0];
        const closeTag = closeTags.get(tag);
        if(closeTag){
            val.splice(position, 0 , closeTag);
            e.target.value = val.join('');
            e.target.selectionEnd = position;
        }
    }
    j = 0;
});

// Lock Button Functinality
    const lockButton = document.getElementById("lock-button");
    let isLocked = false;

    lockButton.addEventListener("click", function(){
        if (isLocked) {
            htmlCode.readOnly = false;
            cssCode.readOnly = false;
            javascriptCode.readOnly = false;
            lockButton.textContent = "Lock"
            lockButton.style.backgroundColor = "#E32A2A"
        }
        else{
            htmlCode.readOnly = true;
            cssCode.readOnly = true;
            javascriptCode.readOnly = true;
            lockButton.textContent = "Unlock";
            lockButton.style.backgroundColor = "#3DCCA7"

        }
        isLocked = !isLocked;
    });


// Spliting the screen to inc/dec size
Split([".container", ".iframe-container"]);