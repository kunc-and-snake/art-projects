let thoughts = [
    "Was I cool?",
    "Why did I say that?",
    "Why was I quiet?",
    "Why am I always quiet?",
    "What should I have said?",
    "Am I OK?",
    "Why do I feel sad?",
    "Why am I always sad?",
    "Why am I always lonely?",
    "Who can I talk to?",
    "Why isn't there anybody?",
    "Why don't I trust anyone?",
    "How can I feel better?",
    "How can I be better?",
    "Why can't I be better?",
    "What's wrong with me?",
    "Why can't I find anyone?",
    "Am I alone?",
    "Will I be alone?",
    "Who will I hold at night?",
    "Who would hold me?",
    "Who will love me?",
    "Who would love me?",
    "Am I lovable?"
    
]

function createFrame() {
    const cubeSize = Math.min(window.innerHeight, window.innerWidth) * 0.7;

    let newFrame = document.createElement("div");
    newFrame.style.width = "" + cubeSize + "px";
    newFrame.style.height = "" + cubeSize + "px";
    newFrame.classList.add("frame");
    for (let i = 0; i < 25; i++) {
        let newTile = document.createElement("div");
        newTile.classList.add("tile");
        newTile.style.width = "" + cubeSize/5 + "px";
        newTile.style.height = "" + cubeSize/5 + "px";
        if (i==12) {
            let video = document.createElement("video");
            video.id = "myVidPlayer";
            // video.classList.add("tile");
            video.style.width = "" + cubeSize/5 + "px";
            video.style.height = "" + cubeSize/5 + "px";
            newTile.appendChild(video);
        }
        newFrame.appendChild(newTile);
        document.querySelector(".container").appendChild(newFrame)
    }
}

createFrame()

//Selector for your <video> element
const video = document.querySelector('#myVidPlayer');

//Core
window.navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
        };
    })
    .catch( () => {
        alert('You have give browser the permission to run Webcam and mic ;( ');
    });
  
    
const extractFromColorString = (colorString)  => {
    return colorString.match(/[0-9]+/g).map(e => parseInt(e));
}

function getNewShade(rgbString, valueChange) {
    let rgbValues = extractFromColorString(rgbString);
    if (rgbValues[0] + valueChange < 0 || rgbValues[0] + valueChange > 255) {return rgbString};
    return `rgb(${rgbValues[0] + valueChange},${rgbValues[1] + valueChange},${rgbValues[2] + valueChange})`
}

function onTileClick(event) {
    const tile = event.target;
    if (!tile.innerText) {
    tile.innerText = thoughts.shift();
    let tiles = document.querySelectorAll(".tile");
    tiles.forEach(changeTilesColor);
    if (thoughts.length == 0) {tile.style.color = "red"}
    }

}

function changeTilesColor(tile) {
    const originalColor = getComputedStyle(tile).getPropertyValue("background-color");
    const originalFont = getComputedStyle(tile).getPropertyValue("color")
    const newShade = getNewShade(originalColor, -10);
    tile.style.backgroundColor = newShade;
    document.getElementById("myVidPlayer").style.backgroundColor = newShade;
    document.body.style.backgroundColor = getNewShade(getComputedStyle(tile).getPropertyValue("background-color"), -10);
    tile.style.color = getNewShade(originalFont, 10);

}

function onMouseOver(event) {
    const tile = event.target;
    const originalColor = getComputedStyle(tile).getPropertyValue("background-color");
    tile.style.backgroundColor = getNewShade(originalColor, 10);
}

function onMouseLeave(event) {
    const tile = event.target;
    const originalColor = getComputedStyle(tile).getPropertyValue("background-color");
    tile.style.backgroundColor = getNewShade(originalColor, -10);
}

let tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => {
    if (!tile.hasChildNodes())
    {tile.addEventListener("click", onTileClick);}
    tile.addEventListener("mouseover", onMouseOver);
    tile.addEventListener("mouseleave", onMouseLeave);
})


