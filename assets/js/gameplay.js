const table = document.querySelector('[data-game="table"]');
const tds = table.querySelectorAll('[data-game="table"] td');
const rows = table.querySelectorAll("tbody > tr");
const player = document.querySelector('[data-js="current-player"]');

const createCircle = (item) => {
  let span = document.createElement("span");

  if (item.children.length == 0) {

    span.classList.add("circulo2");
    item.appendChild(span);
  } else {
    
    alert("Já jogaram aqui");
  }
};
const createDiamond = (item) => {
  let span = document.createElement("span");
  if (item.children.length == 0) {
    span.classList.add("diamante");
    item.appendChild(span);
 
  } else {
   alert("Já jogaram aqui");
  }
};

const ChangePlayer = (item) => {
  let moves = parseInt(player.getAttribute("data-js-move"));

  if (moves == 0 || player.className == "circulo2") {
    createCircle(item);
    player.setAttribute("data-js-move", moves + 1);
    player.className ="diamante"
  }else if(player.className == "diamante"){
    createDiamond(item);
    player.setAttribute("data-js-move", moves + 1);
    player.className ="circulo2"
  }

 
};
document.querySelectorAll('[data-game="table"] td').forEach((item) => {
  item.addEventListener("click", function () {
    let line = this.parentNode.rowIndex;
    let cell = this.cellIndex;

    let target = item.target;
    
    ChangePlayer(this);
    checkPrimaryDiagonal(line, cell);
    checkSecondaryDiagonal(line, cell);
    checkHorizontal(line, cell);
    checkVertical(line, cell);

   
  });
});

function checkSecondaryDiagonal(line, cell) {
  var linha = line - 1;
  var coluna = cell - 1;
  var secondaryArray = [];
  var sum = linha + coluna;
  // obtenho a linha secundária iteira relativa ao eemento clicado

  for (i = 0; i <= sum; i++) {
    if (i < 6 && rows[i].querySelectorAll("td")[sum - i] !== undefined) {
      let element = rows[i].querySelectorAll("td")[sum - i];

      secondaryArray.push(element);
    }
  }
  matchesMapping(secondaryArray);
}

function checkPrimaryDiagonal(line, cell) {
  var linha = line - 1;
  var coluna = cell - 1;
  var primaryArray = [];
  var sum = linha < coluna ? (sum = 0) : linha - coluna;

  for (i = 0; i <= 6; i++) {
    if (
      linha < coluna &&
      i <= 4 &&
      rows[sum + i].querySelectorAll("td")[coluna - linha + i] !== undefined
    ) {
      let element = rows[sum + i].querySelectorAll("td")[coluna - linha + i];
      primaryArray.push(element);
    } else if (coluna <= linha && i <= 5 - sum) {
      let element = rows[sum + i].querySelectorAll("td")[i];
      primaryArray.push(element);
    }
  }
  matchesMapping(primaryArray);
}

function checkHorizontal(line, cell) {
  var linha = line - 1;
  var coluna = cell - 1;
  var horizontalArray = [];
  for (i = 0; i < 6; i++) {
    let element = rows[linha].querySelectorAll("td")[i];

    horizontalArray.push(element);
  }
  matchesMapping(horizontalArray);
}

function checkVertical(line, cell) {
  var linha = line - 1;
  var coluna = cell - 1;
  var verticalArray = [];
  for (i = 0; i < 6; i++) {
    let element = rows[i].querySelectorAll("td")[coluna];

    verticalArray.push(element);
  }
  matchesMapping(verticalArray);
}
function matchesMapping(arrayElements) {
  let analiseArray = arrayElements;
  let matches = 0;

  for (i = 0; i <= analiseArray.length - 1; i++) {
  let proximo =  analiseArray[i+1];
  let atual = analiseArray[i].querySelector('span')
 

  if(atual != null){
    
   if(proximo != undefined && proximo.children[0]){
    
    if(atual.className === proximo.children[0].className){
      matches++
    }

   }
  }
      

 }
if(matches == 3){
  console.log(player.className+" venceu")
}else{
  matches = 0;
}

}
