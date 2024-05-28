const guerreiro = document.querySelector('.guerreiro');
const clouds = document.querySelector('.clouds');
const body = document.querySelector('.body');
const reset = document.querySelector('.reset');
const ground = document.querySelector('.game-board');


let score = 0;
let isGameOver = false;
let loop;
let espinhoSpeed = 9; // Velocidade dos espinhos
let speedIncreaseInterval = 3000; // Intervalo de aumento de velocidade (em milissegundos)
let speedIncreaseAmount = 3; // Quantidade de aumento de velocidade a cada intervalo

setInterval(() => {
  criarNovoEspinho();

}, 2000); // Novo espinho a cada 1,5 segundos

setInterval(() => {
  espinhoSpeed += speedIncreaseAmount;
}, speedIncreaseInterval);

function criarNovoEspinho() {
  const novoEspinho = document.createElement('img');
  novoEspinho.src = 'images/espinho.png';
  novoEspinho.classList.add('espinho');
  document.querySelector('.game-board').appendChild(novoEspinho);

  novoEspinho.style.left = '100%'; 
  novoEspinho.style.bottom = '0px'; 
}

const jump = () => {
  if (!isGameOver) {
    guerreiro.classList.add('jump');
    setTimeout(() => {
      guerreiro.classList.remove('jump');
    }, 500);
  }
}

setInterval(() => {
  if (!isGameOver) {
    incrementScore();
  }
  
}, 10); // Aumentar o score a cada 100 milissegundos

const incrementScore = () => {
  if (!isGameOver) {
    score += 1; // Incrementar o score em 1 a cada vez
    document.querySelector('.score').innerText = `Score: ${score}`;
    
  }
 
  if (score == 1000) {
    body.style.backgroundImage = "url('images/cidade.png')";
  }
  if (score == 2000) {
    body.style.backgroundImage = "url('images/inferno.jpeg')";
  }
 
}

const collisionCheckInterval = setInterval(() => {
  if (!isGameOver) {
    const guerreiroRect = guerreiro.getBoundingClientRect();
    const espinhos = document.querySelectorAll('.espinho');

    espinhos.forEach((espinho) => {
      const espinhoRect = espinho.getBoundingClientRect();

      if (
        guerreiroRect.left < espinhoRect.right &&
        guerreiroRect.right > espinhoRect.left &&
        guerreiroRect.top < espinhoRect.bottom &&
        guerreiroRect.bottom > espinhoRect.top
      ) {
        clearInterval(collisionCheckInterval);
        clearInterval(loop);
        isGameOver = true;
        guerreiro.src = 'images/cav.png';
        guerreiro.style.width = '75px';
        guerreiro.style.marginLeft = '50px';
        reset.style.opacity = '100%';
        clouds.style.animationPlayState = 'paused';
        body.style.animationPlayState = 'paused';
        ground.style.animationPlayState = 'paused';
        espinho.style.animationPlayState = 'paused';
      }
    });
  }
 
}, 10); //verificação colisão

loop = setInterval(() => {
  if (!isGameOver) {
    const espinhos = document.querySelectorAll('.espinho');

    espinhos.forEach((espinho) => {
      const espinhoPosition = espinho.offsetLeft;
      espinho.style.left = `${espinhoPosition - espinhoSpeed}px`;

      // Verificação colisão após o movimento do espinho
      const guerreiroRect = guerreiro.getBoundingClientRect();
      const espinhoRect = espinho.getBoundingClientRect();

      if (
        guerreiroRect.left < espinhoRect.right &&
        guerreiroRect.right > espinhoRect.left &&
        guerreiroRect.top < espinhoRect.bottom &&
        guerreiroRect.bottom > espinhoRect.top
      ) {
        clearInterval(collisionCheckInterval);
        clearInterval(loop);
        isGameOver = true;
        guerreiro.src = 'images/cav.png';
        guerreiro.style.width = '75px';
        guerreiro.style.marginLeft = '50px';
        reset.style.opacity = '100%';
        clouds.style.animationPlayState = 'paused';
        body.style.animationPlayState = 'paused';
        ground.style.animationPlayState = 'paused'; 
        espinho.style.animationPlayState = 'paused';
      }

      if (espinhoPosition < -100) {
        espinho.remove();
      }
    });
  }

}, 10);

function resetG() {
  window.location.reload();
}

document.addEventListener('keydown', jump);
