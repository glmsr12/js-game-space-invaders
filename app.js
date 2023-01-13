const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.results');

let currenShooterIndex = 202; // starting position of the shooter
let width = 15; //shooters' moving index
let direction = 1;
let invadersId;
let goingRight = true;

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

//Creating alienInvaders
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.add('invader');
  }
}

draw();
function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader');
  }
}
//shooter
squares[currenShooterIndex].classList.add('shooter');

//shooter's position and moves
function moveShooter(e) {
  squares[currenShooterIndex].classList.remove('shooter');
  switch (e.key) {
    case 'ArrowLeft':
      if (currenShooterIndex % width !== 0) currenShooterIndex -= 1;
      break;
    case 'ArrowRight':
      if (currenShooterIndex % width < width - 1) currenShooterIndex += 1;
      break;
  }
  squares[currenShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

//invaders' positions and moves
function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }
  draw();

  //when invaders hit the shooter game is over!
  if (squares[currenShooterIndex].classList.contains('invader', 'shooter')) {
    resultDisplay.innerHTML = 'GAME OVER!';
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length + width) {
      resultDisplay.innerHTML = 'GAME OVER!';
      clearInterval(invadersId);
    }
  }
}
invadersId = setInterval(moveInvaders, 100);

//shooting function

function shoot(e) {
  let laserId;
  let currenShooterIndex = currenShooterIndex;
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add('laser');

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser');
      squares[currentLaserIndex].classList.remove('invader');
      squares[currentLaserIndex].classList.add('boom');
      //remove message 'boom' after 3s
      setTimeout(
        () => squares[currentLaserIndex].classList.remove('boom'),
        300
      );
      clearInterval(laserId);
    }
  }
  switch (e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener('keydown', shoot);
