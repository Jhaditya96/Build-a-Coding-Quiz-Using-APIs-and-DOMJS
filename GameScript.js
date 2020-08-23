//------------------------------------DOM SECN.------------------------------//
document.body.style = "background-color:whitesmoke;"
let mainDiv = document.createElement("div");
mainDiv.setAttribute("class","container");

let outbox = document.createElement("div");
outbox.setAttribute("id","loader");
outbox.classList.add('hidden');

let inbox = document.createElement("div");
inbox.setAttribute("id","game");
inbox.setAttribute("class","justify-center flex-column");

let hudbox = document.createElement("div");
hudbox.setAttribute("id","hud");

let huditembox = document.createElement("div");
huditembox.setAttribute("id","hud-item");

let QuestionPrefix = document.createElement("p");
QuestionPrefix.setAttribute("id","progressText");
QuestionPrefix.setAttribute("class","hud-prefix");
QuestionPrefix.innerHTML = "Question";

let progBarDiv = document.createElement("div");
progBarDiv.setAttribute("id","progressBar");

let progBarFullDiv = document.createElement("div");
progBarFullDiv.setAttribute("id","progressBarFull");

progBarDiv.appendChild(progBarFullDiv);

huditembox.appendChild(QuestionPrefix);
huditembox.appendChild(progBarDiv);


let ScoreDiv = document.createElement("div");
ScoreDiv.setAttribute("id","hud-item");

let Scoreprefix = document.createElement("p");
Scoreprefix.setAttribute("class","hud-prefix");
Scoreprefix.innerHTML = "Score";

let ScoreHeader = document.createElement("h1");
ScoreHeader.setAttribute("id","score");
ScoreHeader.setAttribute("class","hud-main-text");
ScoreHeader.innerHTML = "0";

ScoreDiv.appendChild(Scoreprefix);
ScoreDiv.appendChild(ScoreHeader);

hudbox.appendChild(huditembox);
hudbox.appendChild(ScoreDiv);

let QuestionHeader = document.createElement("h3");
QuestionHeader.setAttribute("id","question");

//Options Section
//For 'A'
let OptADiv = document.createElement("div");
OptADiv.setAttribute("class","choice-container");

let Aprefix = document.createElement("p");
Aprefix.setAttribute("class","choice-prefix");
Aprefix.innerHTML = "A";

let choice1 = document.createElement("p");
choice1.setAttribute("class","choice-text");
choice1.setAttribute("data-number","1");

OptADiv.appendChild(Aprefix);
OptADiv.appendChild(choice1);

//For 'B'
let OptBDiv = document.createElement("div");
OptBDiv.setAttribute("class","choice-container");

let Bprefix = document.createElement("p");
Bprefix.setAttribute("class","choice-prefix");
Bprefix.innerHTML = "B";

let choice2 = document.createElement("p");
choice2.setAttribute("class","choice-text");
choice2.setAttribute("data-number","2");

OptBDiv.appendChild(Bprefix);
OptBDiv.appendChild(choice2);

//For 'C'
let OptCDiv = document.createElement("div");
OptCDiv.setAttribute("class","choice-container");

let Cprefix = document.createElement("p");
Cprefix.setAttribute("class","choice-prefix");
Cprefix.innerHTML = "C";

let choice3 = document.createElement("p");
choice3.setAttribute("class","choice-text");
choice3.setAttribute("data-number","3");

OptCDiv.appendChild(Cprefix);
OptCDiv.appendChild(choice3);

//For 'D'
let OptDDiv = document.createElement("div");
OptDDiv.setAttribute("class","choice-container");

let Dprefix = document.createElement("p");
Dprefix.setAttribute("class","choice-prefix");
Dprefix.innerHTML = "D";

let choice4 = document.createElement("p");
choice4.setAttribute("class","choice-text");
choice4.setAttribute("data-number","4");

OptDDiv.append(Dprefix,choice4);
inbox.append(hudbox,QuestionHeader,OptADiv,OptBDiv,OptCDiv,OptDDiv);
mainDiv.append(outbox,inbox);
document.body.append(mainDiv);

//--------------------------LOGIC SECN. OF ASYNC AND FETCHING OF DATA FROM SERVER------------------------------//

const question = document.getElementById('question');
const options = Array.from(document.getElementsByClassName('choice-text'));
const prefixScoreNdQues = document.getElementById('progressText');
const scoreHeading = document.getElementById('score');
const progBarFull = document.getElementById('progressBarFull');
const Outbox = document.getElementById('loader');
const Inbox = document.getElementById('game');
let ongoingQuestion = {};
let receivedAnswer = false;
let score = 0;
let questionCounter = 0;
let accessedQuestion = [];
let QuestList = [];

async function fetchDataFromAPI(){
    try{
    let fetchdata = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
    let result = await fetchdata.json();

    function parseNdUpdateData(result){

        console.log("In Main function:");

        QuestList = result.results.map((currntLoadedQues) => {
            const composedQuestion = {
                question: currntLoadedQues.question,
            };

            const answerChoices = [...currntLoadedQues.incorrect_answers];
            composedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                composedQuestion.answer - 1,
                0,
                currntLoadedQues.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                composedQuestion['choice' + (index + 1)] = choice;
            });
            console.log("Formatting current question");

            return composedQuestion;
        });

        GameBegin();
    }
    console.log("Call Main funcn");
    parseNdUpdateData(result);

    }catch(error){
        console.log(error);
    }
}

fetchDataFromAPI();

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

GameBegin = () => {
    questionCounter = 0;
    score = 0;
    accessedQuestion = [...QuestList];
    NextQuestion();
    Inbox.classList.remove('hidden');
    Outbox.classList.add('hidden');
};

NextQuestion = () => {
    if (accessedQuestion.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('./end.html');
    }
    questionCounter++;
    prefixScoreNdQues.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const Ques_Index = Math.floor(Math.random() * accessedQuestion.length);
    ongoingQuestion = accessedQuestion[Ques_Index];
    question.innerHTML = ongoingQuestion.question;

    options.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = ongoingQuestion['choice' + number];
    });

    accessedQuestion.splice(Ques_Index, 1);
    receivedAnswer = true;
};

options.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!receivedAnswer) return;

        receivedAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == ongoingQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            NextQuestion();
        }, 1000);
    });
});
incrementScore = (numb) => {
    score += numb;
    scoreHeading.innerText = score;
};