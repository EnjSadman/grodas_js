'use strict';

const BASE_URL = './__in/data.json';

const fetcher = async (specify) => {
  const response = await fetch(BASE_URL);
  try {
    const data = await response.json();
    if (specify === 'best') {
      return data.sort((a,b) => b.rating - a.rating).slice(0,5);
    }
    if (specify === 'age') {
      return data.sort((a,b) => a.age - b.age).slice(0,2);
    }
  } catch (err) {
    console.log(err);
  }
}

const mapper = async () => {
  const featured = document.getElementById('featured');
  const carousel = document.getElementById('carousel');
  const recent = document.getElementById('recent');
  const arrayOfBest = await fetcher('best');
  const arrayOfAged = await fetcher('age')

  arrayOfBest.forEach(element => {
    const item = document.createElement('div');
    const tags = element.tags.map(singleTag => '#' + singleTag);
    item.className = 'shadowCard'
    item.style = `background-image : url(./__in/${element.image})`;
    item.innerHTML = (
      ` 
      <div class="shadowCard__info">
        <p class="shadowCard__title">${element.title}</p>
        <p class="shadowCard__tags">${tags.join(' ')}</p>
      </div>
      `
      );

    featured.append(item);
  });

  arrayOfBest.forEach(element => {
    const item = document.createElement('div');
    const tags = element.tags.map(singleTag => '#' + singleTag);
    item.className = 'shadowCard'
    item.style = `background-image : url(./__in/${element.image})`;
    item.innerHTML = (
      ` 
      <input id=${element.id + tags[0] + "best"} type="checkbox" class="check__box">
      <label class="star__label" for=${element.id + tags[0] + "best"}></label>
      <div class="shadowCard__info">
        <p class="shadowCard__title">${element.title}</p>
        <p class="shadowCard__tags">${tags.join(' ')}</p>
      </div>
      `
      );

    carousel.append(item);
  });

  arrayOfAged.forEach((element, index)=> {
    const item = document.createElement('div');
    const tags = element.tags.map(singleTag => '#' + singleTag);
    item.className = 'card';
    item.style = `order : ${index}` 
    item.innerHTML = (
      `
        <input id=${element.id + tags[0] + "aged"} type="checkbox" class="check__box">
        <label class="star__label star__label--aged" for=${element.id + tags[0] + "aged"}></label>
        <img class="card__image" src="./__in/${element.image}">
        <p class="card__title">${element.title}</p>
        <p class="card__tags">${tags.join(' ')}</p>
      `
      );

    recent.append(item);
  });
}

mapper();

const domInformation = () => {
  const numOfDomElements = document.getElementsByTagName('*').length;
  const arrayOfTags = document.getElementsByTagName('*');

  const resultByName = [];
  const resultByTagLength = [];
  for (let i = 0; i < arrayOfTags.length; i += 1) {
    resultByName.push(document.getElementsByTagName(arrayOfTags[i].tagName));
    if (resultByTagLength[arrayOfTags[i].tagName.length] === undefined) {
      resultByTagLength[arrayOfTags[i].tagName.length] = [];
    }
    resultByTagLength[arrayOfTags[i].tagName.length].push(arrayOfTags[i].tagName);
  }

  console.log(resultByName, resultByTagLength)
};

domInformation();