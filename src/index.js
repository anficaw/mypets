const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
import './styles/index.css'; // добавьте импорт главного файла стилей 
const button__del__prof = document.getElementById("button__del__prof");
const button__del__image = document.getElementById("button__del__image");
const button__del__imageviu = document.getElementById("button__del__imageviu");

const popup_proff = document.getElementById("profile");
const popup_image = document.getElementById("imagefile");
const popup_imageviu = document.getElementById("imageviu");
 
const imageForm = popup_image.querySelector(".popup__info");
const imageName = document.getElementById("popup__info_imagename");
const imageURL = document.getElementById("popup__info_imageurl");
const profile__name = document.querySelector(".profile__name");
const profile__proff = document.querySelector(".profile__proff");

const profileForm = popup_proff.querySelector(".popup__info");
const profileName = document.getElementById("popup__info_profilename");
const profileProff = document.getElementById("popup__info_profileprof");

const popupimage = document.getElementById("imageviu");

const profile__editbutton = document.querySelector(".profile__editbutton");
const profile__addbutton = document.querySelector(".profile__addbutton");
const elements = document.querySelector(".elements");

/*const imageText = popup_imageviu.querySelector(".popupimage__title");*/

/*const shablonElement = document.querySelector(".element__template").content.querySelector(".element");*/


import {EnableValidation,resetError} from "./components/validation.js";
import {createNewElement} from "./components/cards.js";
import {openPopup, closePopup,closeByClick} from "./components/modal.js";

const validationconfig = {
  formselector: ".popup__info",
  buttonselector: ".popup__button",
  inputselector: ".popup__input",
  inputinvalidclass:"popup__input_invalid"
}

const creatElementconfig = {
  nameSelector: ".element__name",
  imageSelector: ".element__image",
  likeSelector: ".element__like",
  delSelector:".element__del",
  likeActiveClass:"element__like_active",
  shablonElement:".element__template",
  popup_imageviu: "imageviu",
  imageText:".popupimage__title",
  image:".popupimage__image",
  element:".element"
}

const modalconfig = {
  formselector:".popup__info",
  formopenclass:"popup_opened"
  
}

/*function likeImage(itemLike) {
  console.log(itemLike.classList);
  if (itemLike.classList.contains("element__like_active")) {
    console.log("444444");
    itemLike.classList.remove("element__like_active");
  } else {
    itemLike.classList.add("element__like_active");
  }
}*/

/*function createNewElement(item) {
  const newElement = shablonElement.cloneNode(true);
  const newElementName = newElement.querySelector(".element__name");
  newElementName.textContent = item.name;
  const newElementimage = newElement.querySelector(".element__image");
  newElementimage.src = item.link;
  newElementimage.alt = item.name;
  newElement.querySelector(".element__image").addEventListener("click", () => openPopupimage(newElement));
  
  const itemLike = newElement.querySelector(".element__like");
  itemLike.addEventListener("click", () => likeImage(itemLike));

  const buttonDelete = newElement.querySelector(".element__del");
  buttonDelete.addEventListener("click", () => {
    newElement.remove();
  });

  return newElement;
}*/

function addNewElement(item) {
  elements.prepend(item);
}

initialCards.forEach((item) => {
  const newitem = createNewElement(item,creatElementconfig);
  addNewElement(newitem);
});

/*function openPopup(popup) {
  console.log(popup);
  const popupform = popup.querySelector(".popup__info");
  console.log(popupform);
  disableButton(popupform);
  resetError(popupform,validationconfig);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  const popupform = popup.querySelector(".popup__info");
  popupform.reset();
}*/


/*function openPopupimage(item) {
   
  imageText.textContent = item.querySelector(".element__name").textContent;
  const image = popup_imageviu.querySelector(".popupimage__image");
  image.alt = item.querySelector(".element__image").alt;
  image.src = item.querySelector(".element__image").src;
  popup_imageviu.classList.add("popupimage_opened");
}*/

function closePopupimage(popup) {
  popup.classList.remove("popupimage_opened");
}

function editprofile(popup_proff) {
  EnableValidation(validationconfig)
  profileName.value =
  profile__name.textContent;
  profileProff.value =
  profile__proff.textContent;
  resetError(profileForm,validationconfig);
  openPopup(popup_proff,modalconfig,validationconfig);
}

function imageSubmitForm(event) {
  EnableValidation(validationconfig)
  event.preventDefault();
  const item = { name: imageName.value, link: imageURL.value };
  const newItem = createNewElement(item,creatElementconfig);

  addNewElement(newItem);
  closePopup(popup_image,modalconfig);
}

imageForm.addEventListener("submit", imageSubmitForm);

function profileSubmitForm(event) {
  event.preventDefault();
  EnableValidation(validationconfig)
  profile__name.textContent = profileName.value;
  profile__proff.textContent = profileProff.value;
  closePopup(popup_proff,modalconfig);
}

/*function closeByClick(evt) {
  if (evt.target.classList.contains("popup")) {
      const opendPopup = document.querySelector(".popup_opened");
      opendPopup.classList.remove("popup_opened");
  }
}*/


const formlist=document.querySelectorAll(".popup");
console.log(formlist);
formlist.forEach(form=> {
  form.addEventListener("mousedown", closeByClick);
  console.log(form);
  console.log("5555555");
});

popupimage.addEventListener("mousedown", closeByClick);

profileForm.addEventListener("submit", profileSubmitForm);

profile__editbutton.addEventListener("click", () => editprofile(popup_proff));

button__del__prof.addEventListener("click", () => closePopup(popup_proff,modalconfig));

profile__addbutton.addEventListener("click", () => openPopup(popup_image,modalconfig,validationconfig));

button__del__image.addEventListener("click", () => closePopup(popup_image,modalconfig));

button__del__imageviu.addEventListener("click", () =>
  closePopupimage(popup_imageviu));
