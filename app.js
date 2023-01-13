const grid = document.querySelector('.grid');
let currenShooterIndex = 134;
let width = 10; //shooters' moving index

for (let i = 0; i < 210; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.add('invader');
  }
}

draw();
squares[currenShooterIndex].classList.add('shooter');

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
