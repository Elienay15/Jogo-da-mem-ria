let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 6;

function setup() {
  createCanvas(400, 400);
  let values = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Cria o array de cartas
  for (let i = 0; i < totalPairs; i++) {
    cards.push({ value: values[i], id: i, flipped: false });
    cards.push({ value: values[i], id: i, flipped: false });
  }
  
  // Embaralha as cartas
  cards = shuffle(cards);
}

function draw() {
  background(255);

  // Desenha as cartas
  for (let i = 0; i < cards.length; i++) {
    let x = (i % 4) * 100 + 50;
    let y = floor(i / 4) * 100 + 50;

    if (cards[i].flipped || flippedCards.includes(i)) {
      fill(200);
      rect(x, y, 80, 80);
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(cards[i].value, x + 40, y + 40);
    } else {
      fill(150);
      rect(x, y, 80, 80);
    }
  }
  
  // Verifica se o jogador fez todas as combinações
  if (matchedPairs === totalPairs) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text('Você ganhou!', width / 2, height / 2);
  }
}

function mousePressed() {
  // Verifica qual carta foi clicada
  for (let i = 0; i < cards.length; i++) {
    let x = (i % 4) * 100 + 50;
    let y = floor(i / 4) * 100 + 50;

    if (mouseX > x && mouseX < x + 80 && mouseY > y && mouseY < y + 80) {
      if (!cards[i].flipped && flippedCards.length < 2) {
        cards[i].flipped = true;
        flippedCards.push(i);
      }
    }
  }

  // Verifica se o jogador acertou um par
  if (flippedCards.length === 2) {
    let [first, second] = flippedCards;
    if (cards[first].value === cards[second].value) {
      matchedPairs++;
    } else {
      setTimeout(() => {
        cards[first].flipped = false;
        cards[second].flipped = false;
      }, 1000);
    }
    flippedCards = [];
  }
}


