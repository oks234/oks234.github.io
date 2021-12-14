const images = [
  'luke-chesser-50-unsplash.jpg',
  'susanne-feldt-SIoHky3TPeo-unsplash.jpg',
  'olivier-miche-iIg4F2IWbTM-unsplash.jpg',
  'brandon-day-oCJuJQqvCzc-unsplash.jpg',
  'louis-pellissier-wJ2SaSiL5FA-unsplash.jpg',
  'david-marcu-114194-unsplash.jpg',
  'tord-sollie-R61vEUMzkug-unsplash.jpg',
  'alexandre-chambon-eLMJ2x7s9ak-unsplash.jpg',
  'anna-goncharova-u6RgER9VCsk-unsplash.jpg',
  'rob-bye-30850-unsplash.jpg',
  'neil-thomas-12rzbJhQ89E-unsplash.jpg',
  'adam-willoughby-knox-_snqARKTgoc-unsplash.jpg',
  'sergee-bee-bIQiMWxX_WU-unsplash.jpg',
  'will-van-wingerden-cZVthlrnlnQ-unsplash.jpg',
  'mike-benna-WHHY-iBp3aI-unsplash.jpg',
  'andrew-ridley-54228-unsplash.jpg',
  'jackson-hendry-izZv1nWkXfc-unsplash.jpg',
  'rachel-davis-tn2rBnvIl9I-unsplash.jpg',
  'clem-onojeghuo-5QAeUF6Pduc-unsplash.jpg',
  'pawel-czerwinski-1082320-unsplash.jpg',
  'michael-durana-sYegwYtIqJg-unsplash.jpg',
  'freddie-marriage-utwYoEu9SU8-unsplash.jpg',
  'tim-marshall-yEOCA6oiVqg-unsplash.jpg',
  'myles-tan-RFgO9B_OR4g-unsplash.jpg',
  'ashim-d-silva-sKn-Yy4BRtY-unsplash.jpg',
  'eduard-militaru-VXiLCpne3cI-unsplash.jpg',
  'wesley-tingey-176386-unsplash.jpg',
  'stefan-kunze-_SmZSuZwkHg-unsplash.jpg',
  'tony-webster-97532-unsplash.jpg',
  'kelly-sikkema-qbuVnisKJOQ-unsplash.jpg',
  'rosan-harmens-TLJImI78VRg-unsplash.jpg',
  'kalen-emsley-Bkci_8qcdvQ-unsplash.jpg',
  'ken-cheung-1GGo0ldZfo4-unsplash.jpg',
  'alisa-anton-393305-unsplash.jpg',
  'joseph-barrientos-xcC5ozHk_N8-unsplash.jpg',
  'john-westrock-hQNY2WP-qY4-unsplash.jpg',
  'lodewijk-hertog-7j4i2p-lVMc-unsplash.jpg',
  'pierre-chatel-innocenti-W5INoOK-5eI-unsplash.jpg',
  'nick-karvounis-II9ptuYl2QQ-unsplash.jpg',
  'matteo-catanese-PI8Hk-3ZcCU-unsplash.jpg',
  'john-towner-JgOeRuGD_Y4-unsplash.jpg',
  'andy-kerr-Xy2GcIfewf0-unsplash.jpg',
  'eberhard-grossgasteiger-412131-unsplash.jpg',
  'jonatan-pie-367745-unsplash.jpg',
  'christopher-harris-bJqeJxeyiJE-unsplash.jpg',
  'jonatan-pie-353201-unsplash.jpg',
];

const chosenImage = `img/${images[Math.floor(Math.random() * images.length)]}`;
const bgImg = document.querySelector('#bg-img');

// const bgImage = document.createElement('img');
// bgImage.src = chosenImage;

// document.body.prepend(bgImage);

bgImg.style.backgroundImage = `url(${chosenImage})`;
