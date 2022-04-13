let timer;
let startDate;
let button = document.querySelector("#button");
let startInstructions = document.querySelector("#start-instructions");
let timerElement = document.querySelector("#timer");
let fail = document.querySelector("#fail");
let hide = document.querySelector("#hide");
let hidep = document.querySelector("#hide p");
let bar = document.querySelector("#bar");
let firstBest = document.querySelector("#best-time");
let secondBest = document.querySelector("#second-best");
let thirdBest = document.querySelector("#third-best");
let infoQuip = document.querySelector("#info");
let id;

if(localStorage.getItem("first")){
  firstBest.innerHTML = localStorage.first;
  secondBest.innerHTML = localStorage.second;
  thirdBest.innerHTML = localStorage.third;
} else {
  firstBest.innerHTML = "none";
  secondBest.innerHTML = "";
  thirdBest.innerHTML = "";
  localStorage.first = 999;
  localStorage.second = 999;
  localStorage.third = 999;
}


function start() {
  let randTime = Math.random() * 1000 + 2000;
  timer = setTimeout(changeColor, randTime);

  button.onclick = reactionClick;
  button.classList.remove("button-red");
  button.classList.add("button-red-again");

  startInstructions.style.fontSize = "0";
  startInstructions.style.color = "rgba(0, 0, 0, 0)";

  
  hide.style.color = "rgba(0, 0, 0, 0)";
  hide.style.flex = "0";
  hidep.style.transform = "scale(0)";
  bar.style.backgroundColor = "rgba(0, 0, 0, 0)";
  bar.style.transform = "scale(0)";

  infoQuip.style.transform = "scale(0)";

  timerElement.style.fontSize = "30px";

  timerElement.innerHTML = "0.000";

  fail.style.transform = "scale(0)";
  fail.style.color = "rgba(0, 0, 0, 0)";
}

function updateTimer() {
  let elapsedTime = (new Date() - startDate) / 1000;
  timerElement.innerHTML = elapsedTime.toFixed(3);
  id = window.requestAnimationFrame(updateTimer);
}

function changeColor() {
  button.classList.remove("button-red-again");
  button.classList.add("button-green");
  startDate = new Date();
  id = window.requestAnimationFrame(updateTimer);
}

function reactionClick() {
  window.cancelAnimationFrame(id);
  button.onclick = start;
  
  if (!button.classList.contains("button-green")) {
    fail.style.transform = "scale(1)";
    fail.style.color = "black";

    clearTimeout(timer);
  } else {
    let finalTime = (new Date() - startDate) / 1000;
    timerElement.innerHTML = finalTime;

    if(finalTime < localStorage.getItem("first")){
      localStorage.second = localStorage.first;
      secondBest.innerHTML = localStorage.second;
      
      localStorage.first = finalTime;
      firstBest.innerHTML = localStorage.first;
      console.log(localStorage.getItem("first"));
    } else if(finalTime < localStorage.getItem("second")) {
      localStorage.third = localStorage.second;
      thirdBest.innerHTML = localStorage.third;
      
      localStorage.second = finalTime;
      secondBest.innerHTML = localStorage.second;
    } else if(finalTime < localStorage.getItem("third")) {
      localStorage.third = finalTime;
      thirdBest.innerHTML = localStorage.third;
    }
  }

  hide.style.color = "black";
  hidep.style.transform = "scale(1)";
  hide.style.flex = "1";
  bar.style.backgroundColor = "black";
  bar.style.transform = "scale(1)";

  button.classList.remove("button-red-again");
  button.classList.remove("button-green");
  button.classList.add("button-red");

  startInstructions.style.fontSize = "20px";
  startInstructions.style.color = "black";

  timerElement.style.fontSize = "20px";
}
