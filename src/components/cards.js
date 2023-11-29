import { openPopup } from "./modal.js";

import { deleteCards, addLike, removeLike } from "./api.js";

import { creatElementConfig, elements } from "./constants.js";

const popupImageviu = document.getElementById(creatElementConfig.popupImageviu);
const imageText = popupImageviu.querySelector(creatElementConfig.imageText);
const image = popupImageviu.querySelector(creatElementConfig.image);

export function addNewElement(item) {
  elements.prepend(item);
}

function openImage(item, creatElementConfig) {
  imageText.textContent = item.querySelector(
    creatElementConfig.nameSelector
  ).textContent;
  const itemImage = item.querySelector(creatElementConfig.imageSelector);
  image.alt = itemImage.alt;
  image.src = itemImage.src;
  openPopup(popupImageviu);
}

function likeImage(itemLike, creatElementConfig, item, newElementLike) {
  if (itemLike.classList.contains(creatElementConfig.likeActiveClass)) {
    removeLike(item._id)
      .then((data) => {
        itemLike.classList.remove(creatElementConfig.likeActiveClass);
        newElementLike.textContent = data.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    addLike(item._id)
      .then((data) => {
        itemLike.classList.add(creatElementConfig.likeActiveClass);
        newElementLike.textContent = data.likes.length;
      })
      .catch((err) => console.log(err));
  }
}

export function createNewElement(item, creatElementConfig, userId) {
  const templateElement = document
    .querySelector(creatElementConfig.templateElement)
    .content.querySelector(creatElementConfig.element);

  const newElement = templateElement.cloneNode(true);
  const newElementName = newElement.querySelector(
    creatElementConfig.nameSelector
  );
  newElementName.textContent = item.name;
  const newElementImage = newElement.querySelector(
    creatElementConfig.imageSelector
  );
  const newElementLike = newElement.querySelector(
    creatElementConfig.likecolSelector
  );

  newElementImage.src = item.link;
  newElementImage.alt = item.name;
  newElementLike.textContent = item.likes.length;

  const itemLike = newElement.querySelector(creatElementConfig.likeSelector);

  if (item.likes.find((userLike) => userLike._id === userId)) {
    itemLike.classList.add(creatElementConfig.likeActiveClass);
  }

  newElementImage.addEventListener("click", () =>
    openImage(newElement, creatElementConfig)
  );

  itemLike.addEventListener("click", () =>
    likeImage(itemLike, creatElementConfig, item, newElementLike, userId)
  );

  const buttonDelete = newElement.querySelector(creatElementConfig.delSelector);

  if (item.owner._id === userId) {
    console.log(item.owner._id);
    buttonDelete.addEventListener("click", () => {
      deleteCards(item._id)
        .then(() => {
          newElement.remove();
        })
        .catch((err) => console.log(err));
    });
  } else {
    buttonDelete.remove();
  }

  return newElement;
}
