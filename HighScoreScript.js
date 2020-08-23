var outerDiv = document.createElement("div");
outerDiv.setAttribute("class","container");

var innerDiv = document.createElement("div");
innerDiv.setAttribute("id","highScores");
innerDiv.setAttribute("class","flex-center flex-column");

var heading = document.createElement("h1");
heading.setAttribute("id","finalScore");
heading.innerHTML = "High Scores";

var unlistHS = document.createElement("ul");
unlistHS.setAttribute("id","highScoresList");

var HomeBtn = document.createElement("button");
HomeBtn.setAttribute("id","goHome");
HomeBtn.setAttribute("class","btn");
HomeBtn.setAttribute("onclick","location.href = './index.html';");
HomeBtn.innerHTML = "Go Home";

innerDiv.append(heading,unlistHS,HomeBtn);
outerDiv.appendChild(innerDiv);
document.body.append(outerDiv);

const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");