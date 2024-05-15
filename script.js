const cardsEle = document.querySelector(".cards");

const cards = [];
const images = [
  "archer",
  "barbarian",
  "builder",
  "giant",
  "goblin",
  "hog",
  "warden",
  "wizard",
];

function shuffle(images) {  
  images.sort(() =>Math.random() - 0.5);  
  // console.log(images)
  return images;  
  }  
  shuffle(images)

for (let i = 0; i < 8; i++) {
  let ele = document.createElement("div");
  ele.classList.add("card");
  ele.innerHTML = `<img class="hide" src="./images/${images[i%4]}.png" alt=${
    images[i % 4]
  }/>`;
  console.log(ele.lastChild)
  cards.push(ele);
}

cards.sort(() => {
  return Math.random() - 0.5;
});

for (let c of cards) {
  cardsEle.append(c);
  // console.log(cardsEle)
}

let isFirstFlipped = null;
let isSecondFlipped = null;

for (let c of cards) {
  c.addEventListener("click", async () => {
    if (isFirstFlipped == null && isSecondFlipped == null) {
      c.children[0].classList.remove("hide");
      isFirstFlipped = c;
    } else if (isFirstFlipped && isSecondFlipped == null) {
      c.children[0].classList.remove("hide");
      isSecondFlipped = c;
      if (isFirstFlipped.children[0].src !== isSecondFlipped.children[0].src) {
        await new Promise((e) => setTimeout(e, 1000));
        isFirstFlipped.children[0].classList.add("hide");
        isSecondFlipped.children[0].classList.add("hide");
      } else {
        let isWin = checkWin();
        if (isWin) {
          setTimeout(() => {
            document.body.innerHTML = `<div class="final">
            <h1 class="winner">You Won</h1>
        <button class="restart-btn" onclick="window.location.href='index.html'">Restart</button>
        </div>`;
          }, 500);
        }
      }
      isFirstFlipped = null;
      isSecondFlipped = null;
    }
  });
}



const checkWin = () => {
  for (let c of cards) {
    if (c.children[0].classList.contains("hide")) {
      return false;
    }
  }
  return true;
};
