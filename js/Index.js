
//global vars--------------------------------------------------------------------------------------------------------
let titleArray = [" "];
const cooldown = 3
let titleArrayIndex = 0;

//starts fragment data ------------------------------------------------------------------------------------------------------------
const urlFragment = window.location.href.split("#")[1];
const result = parseUrlFragment(urlFragment);
setFragments(result);

//change title method
document.addEventListener('DOMContentLoaded', function () {
    //title changes
    document.getElementById("titles").textContent = titleArray[0];
    setInterval(changeTitle, cooldown * 1000);
});

function changeTitle () {
    document.getElementById("titles").textContent = titleArray[titleArrayIndex++ % titleArray.length];
}

//load fragment data and sets it----------------------------------------------------------------------------------------------------
function parseUrlFragment(fragment) {
    if(fragment.inc)
    fragment = fragment.startsWith('#') ? fragment.slice(1) : fragment;
    return fragment.split('&').reduce((acc, pair) => {
        let [key, value] = pair.split('=');
        if (key) {
            acc[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
        }
        return acc;
    }, {});
}

function setFragments(dictionary){
    let linkBox = document.getElementById("link-box");
    //main loop
    for (let key in dictionary) {
        if(key == "name"){
            document.getElementById("name").textContent = dictionary["name"];
            document.title = dictionary["name"];
        }
        else if(key == "titles") {
            titleArray = JSON.parse(dictionary[key]); 
        }
        else{
            //make div
            linkBox.innerHTML +=
            `<div class="links" id="${key}">
                <h3>${key}</h3>
            </div>`
            let div = document.getElementById(key);
            //second loop for individual links
            let linkDictionary = JSON.parse(dictionary[key]);     
            for (let item in linkDictionary) {
                div.innerHTML +=
                `<a class="link blink${Math.floor(Math.random() * (4 - 1 +1)) + 1}" href="${linkDictionary[item]}">${item}</a>`
            }
        }
    }
}
