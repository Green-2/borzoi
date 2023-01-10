// Probably half of this is stolen from stack overflow. At least I understand it.
function getSourceAsDOM(url)
{
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    const parser = new DOMParser();
    return parser.parseFromString(xmlhttp.responseText,"text/html");
}
function removeElementsByClass(className, thedoc){
    const elements = thedoc.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
// Feel free to suggest other search terms
const search_terms = ["long+nose+dog", "borzoi", "long+nose+borzoi", "meme+borzoi", "didntidoitforyou+dog"];
//Initializing all of this only once at the first load to reduce load time
const searchterm = search_terms[getRandomInt(0,search_terms.length-1)];
const url = "https://fr.images.search.yahoo.com/search/images;?p="+searchterm;
const mydoc = getSourceAsDOM(url);
removeElementsByClass('process',mydoc);

function pickImage(mydoc) {
    let images = mydoc.getElementsByTagName('img');
    let theimage = images.item(getRandomInt(0,images.length));
    if(theimage.src === undefined){
        theimage = pickImage(url);
    }
    return theimage;
}

const audio = new Audio('didntidoitforyou.mp3');
audio.addEventListener('ended', function() {
    let borzois = document.getElementsByClassName('borzoi');
    for(let borzoi of borzois){
        borzoi.src=pickImage(mydoc).src;
    }
    this.currentTime = 0;
    this.play();
}, false);
audio.play();
let borzois = document.getElementsByClassName('borzoi')
for(let borzoi of borzois){
    borzoi.src=pickImage(mydoc).src;
}