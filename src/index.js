
import "./styles/index.css"; // добавьте импорт главного файла стилей

const button__del__prof = document.getElementById("button__del__prof");
const button__del__image = document.getElementById("button__del__image");
const button__del__imageviu = document.getElementById("button__del__imageviu");
const button__del__avatar = document.getElementById("button__del__avatar");

const popup_proff = document.getElementById("profile");
const popup_image = document.getElementById("imagefile");
const popup_imageviu = document.getElementById("imageviu");
const popup_avatar = document.getElementById("editavatar");
const profile__edavatar = document.getElementById("avataredit");

const avatarUrl = document.getElementById("popup__info_avatarurl");

const imageavatar = document.querySelector(".profile__avatar");

const imageForm = popup_image.querySelector(".popup__info");
const imageName = document.getElementById("popup__info_imagename");
const imageURL = document.getElementById("popup__info_imageurl");
const profile__name = document.querySelector(".profile__name");
const profile__proff = document.querySelector(".profile__proff");

const avatar = document.getElementById("avatar");

const profileForm = popup_proff.querySelector(".popup__info");
const avatarForm = popup_avatar.querySelector(".popup__info");

const profileName = document.getElementById("popup__info_profilename");
const profileProff = document.getElementById("popup__info_profileprof");

const profile__editbutton = document.querySelector(".profile__editbutton");
const profile__addbutton = document.querySelector(".profile__addbutton");
const elements = document.querySelector(".elements");


import { EnableValidation, resetError } from "./components/validation.js";
import { createNewElement } from "./components/cards.js";
import { openPopup, closePopup, closeByClick } from "./components/modal.js";
import {
  getInitialCards,
  greatCards,
  getuser,
  edituser,
  editavatar,
} from "./components/api.js";

const validationconfig = {
  formselector: ".popup__info",
  buttonselector: ".popup__button",
  inputselector: ".popup__input",
  inputinvalidclass: "popup__input_invalid",
};

const creatElementconfig = {
  nameSelector: ".element__name",
  imageSelector: ".element__image",
  likecolSelector: ".element__likecol",
  likeSelector: ".element__like",
  delSelector: ".element__del",
  likeActiveClass: "element__like_active",
  shablonElement: ".element__template",
  popup_imageviu: "imageviu",
  imageText: ".popup__titleimage",
  image: ".popup__image",
  element: ".element",
  nondel: "element__del_non",
  non: ".element__del",
};

export const modalconfig = {
  formopenclass: "popup_opened",
};

EnableValidation(validationconfig);

function addNewElement(item) {
  elements.prepend(item);
}


Promise.all ([getuser(),getInitialCards()])
  .then(([data2,data1]) => {
    data1.reverse().forEach((item) => {
      const newitem = createNewElement(item, creatElementconfig, data2);
      addNewElement(newitem);
    });
    profile__name.textContent = data2.name;
    profile__proff.textContent = data2.about;
    avatar.src = data2.avatar;

  })
  .catch((err) => console.log(err));


function editprofile(popup_proff) {
  EnableValidation(validationconfig);
  profileName.value = profile__name.textContent;
  profileProff.value = profile__proff.textContent;
  resetError(profileForm, validationconfig);
  openPopup(popup_proff, modalconfig);
}

function imageSubmitForm(event) {
  event.preventDefault();
   
  const item = { name: imageName.value, link: imageURL.value };
  
  Promise.all ([getuser(), greatCards(item)])
  .then(([data2,data1]) => {
    const newItem = createNewElement(data1, creatElementconfig, data2);
    addNewElement(newItem);
    event.target.reset();
    closePopup(popup_image, modalconfig);
  })
  .catch((err) => console.log(err));
}


EnableValidation(validationconfig);

imageForm.addEventListener("submit", imageSubmitForm);

function profileSubmitForm(event) {
  event.preventDefault();
  let user = {
    name: profileName.value,
    about: profileProff.value,
  };
  edituser(user)
    .then((user) => {
      profile__name.textContent = user.name;
      profile__proff.textContent = user.about;
      closePopup(popup_proff, modalconfig);
    })
    .catch((err) => console.log(err));
}


function avatarSubmitForm(event) {
  console.log("правильно");
  console.log(avatarUrl);
  event.preventDefault();
  let avatartt= {
    avatar: avatarUrl.value,
  };
  
  editavatar(avatartt)
    .then(() => {
      getuser()
      .then((user) => {
       avatar.src = user.avatar;
      })
      closePopup(popup_avatar, modalconfig);
    })
    .catch((err) => console.log(err));

  }

const formlist = document.querySelectorAll(".popup");

formlist.forEach((form) => {
  form.addEventListener("mousedown", closeByClick);
});

const buttonlist = document.querySelectorAll(".popup__button");

buttonlist.forEach((butt) => {
 butt.addEventListener("click", ()=> butt.textContent="Сохранение...");
});


profileForm.addEventListener("submit", profileSubmitForm);

avatarForm.addEventListener("submit", avatarSubmitForm);

profile__editbutton.addEventListener("click", () => editprofile(popup_proff));

profile__addbutton.addEventListener("click", () =>
  openPopup(popup_image, modalconfig)
);

imageavatar.addEventListener("mouseover", () =>
  profile__edavatar.classList.add("profile__edavatar_active")
);
imageavatar.addEventListener("mouseout", () =>
  profile__edavatar.classList.remove("profile__edavatar_active")
);

imageavatar.addEventListener("click", () =>
  openPopup(popup_avatar, modalconfig)
);

button__del__image.addEventListener("click", () =>
  closePopup(popup_image, modalconfig)
);
button__del__prof.addEventListener("click", () =>
  closePopup(popup_proff, modalconfig)
);
button__del__imageviu.addEventListener("click", () =>
  closePopup(popup_imageviu, modalconfig)
);

button__del__avatar.addEventListener("click", () =>
  closePopup(popup_avatar, modalconfig)
);
