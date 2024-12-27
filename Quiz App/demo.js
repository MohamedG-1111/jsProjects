let quizInfo = document.querySelector(".quiz-area");
let bulltes = document.querySelector(".bulltes");
let question = document.querySelector(".question");
let answers = document.querySelector(".answers");
let submitAnswer = document.querySelector("#submitAnswer");
let result = document.querySelector(".result");
let showResult = document.querySelector("#showAnswer");
let SumbitAnswer = document.querySelector("#submitAnswer");
let Cate = document.querySelector(".quiz-area select");
let Num = document.querySelector(".quiz-area input");
let startQuizButton = document.querySelector("#startQuiz");
let quizContent = document.querySelector(".quizcontent");
let buttonFinsih = document.querySelector(".quizcontent #Fin");
// console.log(result)
// golbal variable
let qcount;
let currentIndex = 0;
let correctAmswer = 0;
let theChoosenAnswers = [];
let fullAnswers = [];
let questionObj;
let selected;
let numofq = 0;
let numq=1;
let category = new Map([
  ["Sports", 21],
  ["Art", 25],
  ["Science: Computers", 9],
  ["History", 23],
  ["Animals", 27],
  ["General Knowledge", 9],
]);
Cate.addEventListener("change", function (e) {
  selected = e.target.value;
});
Num.addEventListener("change", function (e) {
  numofq = parseInt(e.target.value);
});
startQuizButton.addEventListener("click", function () {
  if (selected && numofq > 0) {
    quizInfo.style.display="none";
    quizContent.style.display = "block";
    getQuestion(selected, numofq);
  } else {
    console.log("Please select a category and enter a number of questions.");
  }
});
function getQuestion(selecte, numof) {
  console.log(selecte, numof);
  let request = new XMLHttpRequest();
  let gacode = category.get(selecte);
  request.open(
    "GET",
    `https://opentdb.com/api.php?amount=${numof}&category=${gacode}&difficulty=medium&type=multiple`
  );
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      questionObj = JSON.parse(request.responseText).results;
      questionObj.forEach((ele,index)=>{
        ele.numberq=index+1;
      });
      qcount=questionObj.length;
      console.log(questionObj)
      console.log(qcount);
      createButtles();
      addquestion(questionObj[currentIndex]);
      time();
      go();
      submitAnswer.onclick = function () {
        let select;
        if(currentIndex < qcount){
          let correctanswer = questionObj[currentIndex].correct_answer;
            select =checkAnswer(correctanswer);
        }
        if(select){
          let bullte = document.querySelectorAll(".bulltes span");
          bullte[currentIndex].classList = "on";
        }
        question.innerHTML = "";
        answers.innerHTML = "";
        if(currentIndex < qcount){
          currentIndex++;
          addquestion(questionObj[currentIndex]);
        }
      
      };
    }
  };
  request.send();
}
function quizInformation(obj) {
  obj.category = obj.category.replace(":", "");
  quizInfo.insertAdjacentHTML(
    "beforeend",
    `<div class="count">Category: <span>${obj.category}</span></div>`
  );
  quizInfo.insertAdjacentHTML(
    "beforeend",
    ` <div>Number Of Questions : <span>${qcount}</span></div>`
  );
}
function createButtles() {
  let Bulltles=document.createElement("div");
  Bulltles.className="Bll";
  for (let i = 0; i < qcount; i++) {
    let span = document.createElement("span");
    span.textContent = i + 1;
    if (i === 0) {
      span.className = "on";
    }
    Bulltles.appendChild(span);
  }
  bulltes.appendChild(Bulltles)
  let tim=document.createElement("div");
  tim.className="time";
  bulltes.appendChild(tim);
}
function addquestion(obj) {
  if (currentIndex < qcount) {
    question.insertAdjacentHTML(
      "beforeend",
      `<h2> ${obj.numberq} -  ${obj.question}</h2`
    );
    fullAnswers = [...obj.incorrect_answers, obj.correct_answer];
    let randomizedIndexes = [];
    while (randomizedIndexes.length < fullAnswers.length) {
      let randomIndex = Math.floor(Math.random() * fullAnswers.length);
      if (!randomizedIndexes.includes(randomIndex)) {
        randomizedIndexes.push(randomIndex);
      }
    }
    obj.fullAnswers=fullAnswers;
    for (let i = 0; i < fullAnswers.length; i++) {
      answers.insertAdjacentHTML(
        "beforeend",
        ` <div class="answer">
                <input type="radio" id="answer_${i}" name="question" value="${
          fullAnswers[randomizedIndexes[i]]
        }">
                <label for="answer_${i}">${
          fullAnswers[randomizedIndexes[i]]
        }</label>
            </div>`
      );
    }
    if(theChoosenAnswers[obj.numberq-1]){
      let answer = document.getElementsByName("question");
      for(let i=0;i<answer.length;i++){
        if(answer[i].value===theChoosenAnswers[obj.numberq-1])
          answer[i].checked=true;
    }
    }
  } 
  else{
    ShowTable();
  }
}
function ShowTable(){
  question.innerHTML = "";
    answers.innerHTML = "";
  showResult.style.display = "block";
    SumbitAnswer.style.display = "none";
    bulltes.style.display = "none";
    showResult.onclick = function () {
      showResult.style.display = "none";
      results(correctAmswer);
      result.insertAdjacentHTML(
        "afterbegin",
        `<table>
            <thead>
            <tr>
              <th>Number of questions</th>
              <th>Question</th>
              <th>Answers</th>
              <th>choosed Answer</th>
              <th>Correct Answer</th>
            </tr>
            </thead>
           <tbody class="body"></tbody>
            </table>`
      );
      let ele = document.querySelector("table .body");
      for (let i = 0; i < questionObj.length; i++) {
        ele.insertAdjacentHTML(
          "beforeend",
          `
                <tr>
        <td>${i + 1}</td>
        <td>${questionObj[i].question}</td>
         <td> <span style="color:#777"> All Answer { </span> ${[
           ...questionObj[i].incorrect_answers,
           questionObj[i].correct_answer,
         ].map(
           (answer) => `<div>${answer}</div>`
         )} <span style="color:#777">}</span> </td>
         <td>${theChoosenAnswers[i]}</td>
         <td>${questionObj[i].correct_answer}</td>
         </tr>  
                `
        );
      }
      buttonFinsih.style.display = "flex";
      buttonFinsih.style.justifyContent = "center";
      console.log(buttonFinsih);
    };
  }
function checkAnswer(rAnswer) {
  let answer = document.getElementsByName("question");
  let theChoosenAnswer = "Not Choosed";
  let selected = false;
  for (let i = 0; i < answer.length; i++) {
    if (answer[i].checked) {
      theChoosenAnswer = answer[i].value;
      selected = true;
      break;
    }
  }
  if (rAnswer === theChoosenAnswer) {
    correctAmswer++;
  }
  if (!selected) {
    theChoosenAnswers[currentIndex]=theChoosenAnswer;
  } else {
    theChoosenAnswers[currentIndex]=theChoosenAnswer;
    return true;
  }
}

function results(correct) {
  console.log(theChoosenAnswers)
  let ele = document.createElement("div");
  // console.log(sp)
  if (correct > qcount / 2 && correct < qcount) {
    ele.innerHTML = `<span>Good</span> You answered ${correctAmswer} out of ${qcount} !`;
    ele.querySelector("span").classList.add("good");
  } else if (correct === qcount) {
    ele.innerHTML = `<span>perfect</span> You answered ${correctAmswer} out of ${qcount} !`;
    ele.querySelector("span").classList.add("perfect");
  } else {
    ele.innerHTML = `<span>bad</span> You answered ${correctAmswer} out of ${qcount} !`;
    ele.querySelector("span").classList.add("bad");
  }
  result.insertAdjacentElement("afterbegin", ele);
}
buttonFinsih.onclick = function () {
  window.location.reload();
};
  function go() {
    let bullte = document.querySelectorAll(".bulltes span");
    bullte.forEach((span, index) => {
        span.onclick=function(){
  answers.innerHTML='';
  question.innerHTML='';
currentIndex=span.textContent-1;
  addquestion(questionObj[currentIndex]);
  let savedAnswer=theChoosenAnswers[currentIndex];
  let answer = document.getElementsByName("question");
  for(let i=0;i<answer.length;i++){
    if(answer[i].value===savedAnswer)
      answer[i].checked=true;
}
        }
    });
  }
function time() {
  console.log(theChoosenAnswers)
  let duration = 15 * qcount;
  let timer = setInterval(function() {
    let minutes = Math.trunc(duration / 60);
    let seconds = duration % 60;
    let ele = document.querySelector(".time");
    // let buttonDisplay = window.getComputedStyle(SumbitAnswer).display;
    if ((minutes === 0 && seconds === 0) || currentIndex ===qcount ) {
      clearInterval(timer); 
        ShowTable(); 

    }
     else {
      if (minutes < 10) minutes = `0${minutes}`;
      if (seconds < 10) seconds = `0${seconds}`;
      ele.innerHTML = `Total time: ${minutes}:${seconds}`;
      --duration;
    }
  }, 1000);
}

