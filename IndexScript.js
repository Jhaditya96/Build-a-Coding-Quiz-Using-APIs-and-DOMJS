document.body.style = 'background-color:whitesmoke;';
let outer = document.createElement("div");
outer.setAttribute("class","container");

let innerdiv = document.createElement("div");
innerdiv.setAttribute("class","center column");
innerdiv.setAttribute("style","margin-top:150px;");

let header = document.createElement("h1");
header.setAttribute('class','heading');
header.innerText = "Quick Quiz";
innerdiv.appendChild(header);

let playbutton = document.createElement("button");
playbutton.setAttribute("id","game");
playbutton.innerText = "Play";
playbutton.setAttribute("onclick","location.href = './game.html' ");
playbutton.setAttribute("class","btn");
innerdiv.appendChild(playbutton);

let highbutton = document.createElement("button");
highbutton.setAttribute("id","highScore");
highbutton.setAttribute("class","btn");
highbutton.setAttribute("onclick","location.href = './highscores.html' ");
highbutton.innerText = "High Scores";

innerdiv.appendChild(highbutton);
outer.appendChild(innerdiv);
document.body.appendChild(outer);
