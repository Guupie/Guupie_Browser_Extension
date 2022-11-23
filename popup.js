// Initialize button with users's prefered color
let changeColor = document.getElementById("changeColor");
let changePiece = document.getElementById("changePawn");
let removeYtVideo = document.getElementById("removeYtVideo");
let likeVideo = document.getElementById("likeVideo");
let lookupQuestions = document.getElementById("lookupQuestions");

chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: setPageBackgroundColor,
    });
});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({color}) => {
        document.body.style.backgroundColor = color;
    });
}


//--------------------------------- Change Chess Piece Colors ----------------------------------


changePiece.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: setWhitePawnColor,
    });
});

function setWhitePawnColor() {
    chrome.storage.sync.get("pawn", ({}) => {

        let pawnsWhite = document.getElementsByClassName('wp');

        for (let pawns of pawnsWhite) {
            pawns.classList.add('bp');
        }

    });
}
//-------------------------- like Tallions Videos -----------------------------------


likeVideo.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: likeYtVideo,
    });

    let Tallion = new RegExp('^Tallion$');
});

function likeYtVideo() {

    let youtuberUrl = '';

    chrome.storage.sync.get("youtuber", ({youtuber}) => {
        yotuberUrl = youtuber;
    });

    console.log(yotuberUrl);

    if (document.querySelector('[href~="/channel/UCn8AIYjCVblHqTqE2PMsrMA"]')) {
        if (document.getElementsByClassName('style-default-active').length === 0) {
            let likeButtonGerman = document.querySelector('[aria-label~="Ich"]');
            let likeButtonEnglish = document.querySelector('[aria-label~="Like"]');

            if (likeButtonGerman) {
                likeButtonGerman.click();
                console.log('Daumen hoch für Tallion!');
            } else if (likeButtonEnglish) {
                likeButtonEnglish.click();
                console.log('Thumbs up for Tallion!');
            }
        } else {
            console.log('You already liked the Video!')
        }
    } else {
        console.log('This is not Tallions Channel!');
    }
}


// ---------------------------------- lookup questions -----------------------------

lookupQuestions.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: lookupQuestion,
    });

});

function lookupQuestion()
{
    let Elements = document.getElementsByClassName('office-form-question-title 2text-format-content');

    console.log(Elements);

    for(let i = 0;i<=Elements.length;i++)
    {
    console.log(Elements[i].valueOf());
    }


}