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

const button__del__prof = document.getElementById("button__del__prof");
const button__del__image = document.getElementById("button__del__image");
const button__del__imageviu = document.getElementById("button__del__imageviu");

const popup_proff = document.getElementById("profile");
const popup_image = document.getElementById("imagefile");
const popup_imageviu = document.getElementById("imageviu");
console.log(popup_imageviu);

const imageForm = popup_image.querySelector(".popup__info");
const imageName = document.getElementById("popup__info_imagename");
const imageURL = document.getElementById("popup__info_imageurl");

const profileForm = popup_proff.querySelector(".popup__info");
const profileName = document.getElementById("popup__info_profilename");
const profileProff = document.getElementById("popup__info_profileprof");

const profile__editbutton = document.querySelector(".profile__editbutton");
const profile__addbutton = document.querySelector(".profile__addbutton");
const elements = document.querySelector(".elements");

const shablonElement = document
  .querySelector(".element__template")
  .content.querySelector(".element");

function likeImage(itemLike) {
  console.log(itemLike.classList);

  if (itemLike.classList.contains("element__like_active")) {
    console.log("444444");
    itemLike.classList.remove("element__like_active");
  } else {
    itemLike.classList.add("element__like_active");
  }
}

function createNewElement(item) {
  const newElement = shablonElement.cloneNode(true);
  const newElementName = newElement.querySelector(".element__name");
  newElementName.textContent = item.name;
  const newElementimage = newElement.querySelector(".element__image");
  newElementimage.src = item.link;
  newElementimage.alt = item.name;
  newElement
    .querySelector(".element__image")
    .addEventListener("click", () => openPopupimage(newElement));

  const itemLike = newElement.querySelector(".element__like");
  itemLike.addEventListener("click", () => likeImage(itemLike));

  const buttonDelete = newElement.querySelector(".element__del");
  buttonDelete.addEventListener("click", () => {
    newElement.remove();
  });

  return newElement;
}

function addNewElement(item) {
  elements.prepend(item);
}

initialCards.forEach((item) => {
  const newitem = createNewElement(item);
  addNewElement(newitem);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopupimage(item) {
  const imageText = popup_imageviu.querySelector(".popupimage__title");
  console.log(imageText);
  imageText.textContent = item.querySelector(".element__name").textContent;
  const image = popup_imageviu.querySelector(".popupimage__image");
  image.alt = item.querySelector(".element__image").alt;
  image.src = item.querySelector(".element__image").src;
  popup_imageviu.classList.add("popupimage_opened");
}

function closePopupimage(popup) {
  popup.classList.remove("popupimage_opened");
}

function editprofile(popup_proff) {
  let prof = document.getElementById("popup__info_profileprof");
  document.getElementById("popup__info_profilename").value =
    document.querySelector(".profile__name").textContent;
  document.getElementById("popup__info_profileprof").value =
    document.querySelector(".profile__proff").textContent;
  openPopup(popup_proff);
}

function imageSubmitForm(event) {
  event.preventDefault();
  const item = { name: imageName.value, link: imageURL.value };
  const newItem = createNewElement(item);
  addNewElement(newItem);
  closePopup(popup_image);
}

imageForm.addEventListener("submit", imageSubmitForm);

function profileSubmitForm(event) {
  event.preventDefault();
  console.log("666666");
  console.log(profileName.value);

  document.querySelector(".profile__name").textContent = profileName.value;
  document.querySelector(".profile__proff").textContent = profileProff.value;

  closePopup(popup_proff);
}

profileForm.addEventListener("submit", profileSubmitForm);

profile__editbutton.addEventListener("click", () => editprofile(popup_proff));

button__del__prof.addEventListener("click", () => closePopup(popup_proff));

profile__addbutton.addEventListener("click", () => openPopup(popup_image));

button__del__image.addEventListener("click", () => closePopup(popup_image));

button__del__imageviu.addEventListener("click", () =>
  closePopupimage(popup_imageviu)
);
