const url = 'https://api.quotable.io/random';

const quote = document.querySelector('#quote');
const content = quote.querySelector('.quote__content');
const author = quote.querySelector('.quote__author > div');

fetch(url).then(response => response.json()).then(data => {
  console.log('fetched quote', data);
  content.innerText = data.content;
  author.innerText = data.author;
  quote.classList.remove('hidden');
});
