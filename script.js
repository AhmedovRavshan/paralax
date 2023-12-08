class Parallax {
  constructor(obj) {
    this.clouds = document.querySelectorAll(obj.clouds);
    this.extraEl = document.querySelector(obj.extraEl);
    this.background = document.querySelector(obj.background);

    window.addEventListener("scroll", () => this.moveElements());
  }
  moveElements() {
    this.clouds.forEach((clouds) => {
      let speed = clouds.getAttribute("data-speed");
      clouds.style.transform = `translateX(${scrollY * speed}px)`;
    });
    this.extraEl.style.transform = `translateX(${scrollY * 0.9}px) translateY(${
      scrollY * 0.2
    }px)`;
    this.background.style.objectPosition = `0 ${scrollY / 10}%`;
  }
}

const parallax = new Parallax({
  clouds: ".header__cloud",
  extraEl: ".header__boat",
  background: ".header__fatasy",
});

class Text {
  constructor(text) {
    this.text = document.querySelector(text);
    this.fullText = this.text.textContent;
    this.text.textContent = "";
    this.str();
  }
  str(x = 0) {
    this.text.textContent += this.fullText[x];
    x++;
    if (x < this.fullText.length) {
      setTimeout(() => {
        this.str(x);
      }, 200);
    }
  }
}
const text = new Text(".header__title");

class Scroll {
  constructor(el) {
    this.section = document.querySelector(el);
    window.addEventListener("scroll", () => this.fade(this.section));
  }
  fade(section) {
    const fadeRigth = section.querySelectorAll(".fade");
    fadeRigth.forEach((item) => {
      const speed = item.getAttribute("data-speed");
      item.style.transition = speed + "ms";
      if (scrollY >= section.offsetTop - section.offsetHeight * 2) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}

const scroll = new Scroll(".about");
const scroll2 = new Scroll(".about2");

class Ball {
  constructor(el) {
    this.ballEl = document.querySelectorAll(el);

    window.addEventListener("mousemove", (e) => this.moveItem(e));
  }
  moveItem(e) {
    this.ballEl.forEach((item) => {
      const speed = item.getAttribute("data-speed");
      const x = (innerWidth - e.pageX * speed) / 50;
      const y = (innerWidth - e.pageY * speed) / 100;
      item.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

const ballMove = new Ball(".parallax__ball");

class Timer {
  constructor(obj) {
    this.timerNums = document.querySelectorAll(obj.timerNums);
    this.timerSection = document.querySelector(obj.timerSec);
    this.state = true;

    window.addEventListener("scroll", () => this.scrollTimer());
  }
  scrollTimer() {
    if (this.state) {
      if (scrollY >= 1400) {
        this.timerSet()
        this.state = false;
      }
    }
  }
  timerSet(){
    this.timerNums.forEach(nums => {
      const count = +nums.getAttribute('data-num')
      nums.textContent = 0
      function timer(k = 0) {
        nums.textContent = k
        k++
        if (k <= count) {
          setTimeout(() => {
            timer(k)
          }, 5);
        }
      }
      timer()
    })
  }
}

const timer = new Timer({
  timerNums: ".timer__num",
  timerSec: ".timer",
});



class Bubble{
  constructor(el){
    this.bubble = document.querySelectorAll(el)
    
    this.bubble.forEach(btn => {
      btn.addEventListener('mousemove', (e) => this.bubbleShow(e, btn))
    })
  }
  bubbleShow(e,btn) {
    const x = e.pageX - btn.offsetLeft
    const y = e.pageY - btn.offsetTop
    let span = btn.querySelector('span')
    span.style.left = `${x}px`
    span.style.top = `${y}px`
    
  }
}
const bubble = new Bubble('.timer__btn')



class Perspectiv3D{
  constructor(el){
    this.card = document.querySelectorAll(el)
    this.card.forEach(cards => {
      cards.addEventListener('mousemove', (e) => this.rotate(e, cards))
      cards.addEventListener('mouseout', () => this.rotateNone(cards))
    })
  }
  rotate(e, item){
    const cardItem = item.querySelector('.card__item')
    const halfHeight = cardItem.offsetHeight / 2
    cardItem.style.transform = `rotateX(${(halfHeight - e.offsetY) / 8}deg) rotateY(${-(halfHeight - e.offsetX) / 8}deg)`
  }
  rotateNone(item){
    const cardItem = item.querySelector('.card__item')
    cardItem.style.transform = 'rotate(0)'
  }
}

const perspective = new Perspectiv3D('.card')