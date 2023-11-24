import { openPopup, closeByEsc } from "./modal.js";
import { modalconfig } from "../index.js";
import { gelCards, addlike, removelike } from "./api.js";

function openPopupimage(item, creatElementconfig) {
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
  openPopup(popup_imageviu, modalconfig);
  document.addEventListener("keydown", closeByEsc);
}

function likeImage(itemLike, creatElementconfig, item, newElementlike) {
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

export function createNewElement(item, creatElementconfig, user) {
  const shablonElement = document
    .querySelector(creatElementconfig.shablonElement)
    .content.querySelector(creatElementconfig.element);
  const newElement = shablonElement.cloneNode(true);
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
  
  newElementimage.src = item.link;
  newElementimage.alt = item.name;
  newElementlike.textContent = item.likes.length;

  console.log("hdgjhljhfdlghdljha;lsg.akgjl;gkz");
  console.log(item.likes);

  const itemLike = newElement.querySelector(creatElementconfig.likeSelector);
  
  if (item.likes.find(cort=> cort._id === user._id)) {
    console.log("01001010101")
    itemLike.classList.add(creatElementconfig.likeActiveClass);
  }

  newElementimage.addEventListener("click", () =>
    openPopupimage(newElement, creatElementconfig)
  );


  itemLike.addEventListener("click", () =>
    likeImage(itemLike, creatElementconfig, item, newElementlike, user)
  );

  const buttonDelete = newElement.querySelector(creatElementconfig.delSelector);

  //if (item.owner._id ==="38202379f8bf6202d851f61e"){
  if (item.owner._id === user._id) {
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
