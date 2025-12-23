const timer = document.getElementById("timer")
let elapsedTime = 0;
let startTime = 0;
let timid = null;
let isRunning = false

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timid = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function stop(){

    if(isRunning){
        elapsedTime = Date.now() - startTime;
        clearInterval(timid);
        isRunning = false;
    }
}


function reset(){
    startTime = 0;
    elapsedTime = 0;
    clearInterval(timid);
    isRunning = false;
    timer.innerText = "00 : 00 : 00 : 00";

}

function updateTime(){
    elapsedTime = Date.now() - startTime;

    let hours = Math.floor(elapsedTime/(1000*60*60));
    let minutes = Math.floor(elapsedTime/(1000*60)%60);
    let seconds = Math.floor(elapsedTime/(1000)%60);
    let milisec = Math.floor((elapsedTime%1000)/10);

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    milisec = String(milisec).padStart(2,"0");

    timer.innerText = `${hours} : ${minutes} : ${seconds} : ${milisec}`;

}