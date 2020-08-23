document.body.style = 'background-color:seashell;';
var outerDiv = document.createElement("div");
outerDiv.setAttribute("class","container");

var innerDiv = document.createElement("div");
innerDiv.setAttribute("id","end");
innerDiv.setAttribute("class","flex-center flex-column");

var heading = document.createElement("h1");
heading.setAttribute("id","finalScore");

var form_input = document.createElement("form");

var userName = document.createElement("input");
userName.setAttribute("type","text");
userName.setAttribute("id","username");
userName.setAttribute("name","username");
userName.style = 'text-align:center;'
userName.setAttribute("placeholder","username");

var submit_button = document.createElement("button");
submit_button.setAttribute("id","saveScoreBtn");
submit_button.setAttribute("class","btn");
submit_button.setAttribute("type","submit");
submit_button.setAttribute("onclick","saveHighScore(event)");

submit_button.disabled = true;
submit_button.innerHTML = "Save Your Score";

form_input.appendChild(userName);
form_input.appendChild(submit_button);

var playagainbtn = document.createElement("button");
playagainbtn.setAttribute("id","playAgain");
playagainbtn.setAttribute("class","btn");
playagainbtn.setAttribute("onclick","location.href = './game.html';");
playagainbtn.innerHTML = "Play Again";

var homebtn = document.createElement("button");
homebtn.setAttribute("id","goHome");
homebtn.setAttribute("class","btn");
homebtn.setAttribute("onclick","location.href = './index.html';");
homebtn.innerHTML = "Go Home";

innerDiv.appendChild(heading);
innerDiv.appendChild(form_input);
innerDiv.appendChild(playagainbtn);
innerDiv.appendChild(homebtn);

outerDiv.appendChild(innerDiv);

document.body.append(outerDiv);


const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};