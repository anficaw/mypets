import { openPopup, closeByEsc } from "./modal.js";

import { gelCards, addlike, removelike } from "./api.js";

function openimage(item, creatElementconfig) {
  const popup_imageviu = document.getElementById(
    creatElementconfig.popup_imageviu
  );
  const imageText = popup_imageviu.querySelector(creatElementconfig.imageText);
  const image = popup_imageviu.querySelector(creatElementconfig.image);
  imageText.textContent = item.querySelector(
    creatElementconfig.nameSelector
  ).textContent;
  const itemImage = item.querySelector(creatElementconfig.imageSelector);
  image.alt = itemImage.alt;
  image.src = itemImage.src;
  openPopup(popup_imageviu);
  
}

function likeImage(itemLike, creatElementconfig, item, newElementlike,userid) {
  if (itemLike.classList.contains(creatElementconfig.likeActiveClass)) {
    removelike(item._id)
      .then((data) => {
        itemLike.classList.remove(creatElementconfig.likeActiveClass);
        newElementlike.textContent = data.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    addlike(item._id)
      .then((data) => {
        itemLike.classList.add(creatElementconfig.likeActiveClass);
        newElementlike.textContent = data.likes.length;
      })
      .catch((err) => console.log(err));
  }
}

export function createNewElement(item, creatElementconfig, userid) {
  
  const templateElement = document
    .querySelector(creatElementconfig.templateElement)
    .content.querySelector(creatElementconfig.element);

  const newElement = templateElement.cloneNode(true);
  const newElementName = newElement.querySelector(
    creatElementconfig.nameSelector
  );
  newElementName.textContent = item.name;
  const newElementimage = newElement.querySelector(
    creatElementconfig.imageSelector
  );
  const newElementlike = newElement.querySelector(
    creatElementconfig.likecolSelector
  );
 console.log(userid);

  newElementimage.src = item.link;
  newElementimage.alt = item.name;
  newElementlike.textContent = item.likes.length;

  const itemLike = newElement.querySelector(creatElementconfig.likeSelector);

  if (item.likes.find((userlike) => userlike._id === userid)) {
    itemLike.classList.add(creatElementconfig.likeActiveClass);
  }

  newElementimage.addEventListener("click", () =>
    openimage(newElement, creatElementconfig)
  );
 
  itemLike.addEventListener("click", () =>
    likeImage(itemLike, creatElementconfig, item, newElementlike, userid)
  );

  const buttonDelete = newElement.querySelector(creatElementconfig.delSelector);

  if (item.owner._id === userid) {
    console.log(item.owner._id);
    buttonDelete.addEventListener("click", () => {
      gelCards(item._id)
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
