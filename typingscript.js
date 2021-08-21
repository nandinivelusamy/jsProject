const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

testArea.addEventListener("keypress", start, false);
resetButton.addEventListener("click", reset, false);
var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var wpm = 0;
var error = 0;
//match the sample text and user input
testArea.addEventListener('keyup', wordAccuracy);

function wordAccuracy() {
    let textEntered = testArea.value.split(" ");
    if (timer[0] > 1) {
        wpm = Math.round(textEntered.length / timer[0]);
    } else {
        wpm = Math.round(textEntered.length);
    }
    document.getElementById("wpm").innerHTML = wpm;
    
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        let error = 0;
        let textEntered = testArea.value.split(" ");
        let orginArry=originText.split(" ");
        console.log("herere"+orginArry+"sdfs"+textEntered);
        
        for(let i=0;i<textEntered.length-1;i++){

            if(textEntered[i] != orginArry[i]){
            if (textEntered[i] != orginArry[i]) {
                console.log(textEntered[i]+"g"+orginArry[i])
                error=error+1;
                console.log(error);
            }  
            document.getElementById('error').innerHTML = error;
        }
        }
    }
}

//creating an array of sample texts

var typingSamples = [
    'the text to test',
    'have a great day',
    'Believe in yourself',
    'Dont stop until you are proud',
    'you are doing great.'
];
var position = 0;
function chooseText() {
    error = 0;
    if (position >= typingSamples.length) {
        position = 0;
    } else {
        position++;
    }
    if (position == typingSamples.length) {
        position = 0;

    }
    document.querySelector("#origin-text p").innerHTML = typingSamples[position];
    originText = typingSamples[position];
    testArea.value = "";
    document.getElementById('error').innerHTML = "";
    document.getElementById('wpm').innerHTML = "";

}

function backText() {
    error=0;
    wpm=0;
    document.getElementById('error').innerHTML = "";
    document.getElementById('wpm').innerHTML = "";
    if (position >= typingSamples.length-1) {
        position = 0;
    } else if(position>0){
        position--;
    }
        
    
    if (position == typingSamples.length) {
        position = 0;
    }
    document.querySelector("#origin-text p").innerHTML = typingSamples[position];
    originText = typingSamples[position];
    testArea.value = "";


}

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}
// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    wpm = 0;
    document.getElementById('error').innerHTML = "";
    document.getElementById('wpm').innerHTML = "";
}
// counting words per minute
var arr = theTimer.innerHTML.split(':');
totalSeconds = (Number(arr[2])) + (Number(arr[1]))*60;