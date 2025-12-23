const counter = document.getElementById("cntr");

document.getElementById('reset-btn').onclick = function(){
    counter.innerText = 0;
    console.log(counter);

    counter.classList.remove("reset-animate"); // reset if it's already applied
    void counter.offsetWidth; // 🔄 force reflow to restart animation
    counter.classList.add("reset-animate");
    counter.addEventListener("animationend", () => counter.classList.remove("reset-animate"), { once: true });
}


document.getElementById('increment-btn').onclick = function(){
    counter.innerText++;
    console.log(counter);

    counter.classList.remove("inc-animate"); // reset if it's already applied
    void counter.offsetWidth; // 🔄 force reflow to restart animation
    counter.classList.add("inc-animate");
    counter.addEventListener("animationend", () => counter.classList.remove("inc-animate"), { once: true });
}


document.getElementById('decrement-btn').onclick = function(){
    counter.innerText--;
    console.log(counter);

    counter.classList.remove("dec-animate"); // reset if it's already applied
    void counter.offsetWidth; // 🔄 force reflow to restart animation
    counter.classList.add("dec-animate");
    counter.addEventListener("animationend", () => counter.classList.remove("dec-animate"), { once: true });
}

const date  = new Date(1700000055000);
console.log(date)