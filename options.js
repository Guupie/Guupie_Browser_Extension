let page = document.getElementById("buttonDiv");
let pages = document.getElementById("inputs");
let selectedClassName = "current";
let selectedYoutuber = "";
let youtuberSave = document.getElementById("saveButton");
let addInput = document.getElementById("addInputButton");
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
const CREATION = 1;
const NEWINPUT = 2;

// Reacts to a button click by marking marking the selected button and saving
// the selection
function handleButtonClick(event) {
    // Remove styling from the previously selected color
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }

    // Mark the button as selected
    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({color});
}

function handleYtSaveClick(event) {
    let current = event.target.parentElement.querySelector(
        `.${selectedYoutuber}`
    );
    if (current && current !== event.target) {
        current.classList.remove(selectedYoutuber);
    }

    let youtuber = event.target.dataset.youtuber;
    event.target.classList.add(selectedYoutuber);
    chrome.storage.sync.set({youtuber});
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        let currentColor = data.color;

        // For each color we were provided…
        for (let buttonColor of buttonColors) {
            // …crate a button with that color…
            let button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            // …mark the currently selected color…
            if (buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }

            // …and register a listener for when that button is clicked
            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
        }
    });
}

function constructYtOptions() {
    chrome.storage.sync.get("youtuberList", (data) => {
        console.log(data);
        createYoutuberInput(CREATION, data);
    })
}

function saveYoutuber() {
    let youtubeUrls = document.getElementsByClassName('youtuberInput');
    let counter = document.getElementsByClassName('youtuberInput').length;
    let youtuberList = [];

    for (let i = 0; i < counter; i++) {
        youtuberList[i] = document.getElementById(i.toString()).value;
    }

    console.log(youtuberList);

    chrome.storage.sync.set({youtuberList});
}


youtuberSave.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: saveYoutuber(),
    });

});

addInput.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: createYoutuberInput(NEWINPUT),
    });
});

function createYoutuberInput(type, data = []) {

    if (type === CREATION) {
        for(let i = 0;i < data.youtuberList.length; i++)
        {
            let youtuberInput = document.createElement("input");
            youtuberInput.classList.add('youtuberInput');
            youtuberInput.id = i.toString();
            youtuberInput.setAttribute('placeholder', 'www.youtube.com/channel/....');
            youtuberInput.value = data.youtuberList[i];
            pages.appendChild(youtuberInput);
            pages.appendChild(document.createElement("br"));
        }

    } else if (type === NEWINPUT) {
        let counter = document.getElementsByClassName('youtuberInput').length;
        let input = document.createElement("input");
        input.classList.add('youtuberInput');
        input.id = counter.toString();
        pages.appendChild(input);
        pages.appendChild(document.createElement("br"));
    }
}


// Initialize the page by constructing the color options
constructOptions(presetButtonColors);
constructYtOptions();