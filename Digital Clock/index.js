const timer = document.getElementById("timer")

function updateTimer(){
    let date = new Date();
    const hours = date.getHours().toString().padStart(2,0);
    const minutes = date.getMinutes().toString().padStart(2,0);
    const seconds = date.getSeconds().toString().padStart(2,0);

    timer.innerText = `${hours} : ${minutes} : ${seconds}`
}
updateTimer();
setInterval(updateTimer, 1000)