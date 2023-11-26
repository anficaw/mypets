
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

let userid;

import { enableValidation, resetError } from "./components/validation.js";
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
  templateElement: ".element__template",
  popup_imageviu: "imageviu",
  imageText: ".popup__titleimage",
  image: ".popup__image",
  element: ".element",
  nondel: "element__del_non",
  non: ".element__del",
};



enableValidation(validationconfig);

function addNewElement(item) {
  elements.prepend(item);
}


Promise.all ([getuser(),getInitialCards()])
  .then(([user,card]) => {
    card.reverse().forEach((item) => {
      const newitem = createNewElement(item, creatElementconfig, user._id);
      addNewElement(newitem);
    });
    profile__name.textContent = user.name;
    profile__proff.textContent = user.about;
    avatar.src = user.avatar;
    userid =  user._id;
   
  })
  .catch((err) => console.log(err));


function editprofile(popup_proff) {
  
  profileName.value = profile__name.textContent;
  profileProff.value = profile__proff.textContent;
  resetError(profileForm, validationconfig);
  openPopup(popup_proff);
}


function handleimageSubmitForm(event) {
  event.preventDefault();
  const item = { name: imageName.value, link: imageURL.value};
  event.submitter.textContent="Сохранение...";

  greatCards(item)
  .then((data1) => {
   
    const newItem = createNewElement(data1, creatElementconfig, userid);
    addNewElement(newItem);
    event.target.reset();
    closePopup(popup_image);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    event.submitter.textContent="Сохранить";
    event.submitter.disabled = true;
  });
}


imageForm.addEventListener("submit", handleimageSubmitForm);

function handleprofileSubmitForm(event) {

  event.preventDefault();
  event.submitter.textContent="Сохранение...";

  const user = {
    name: profileName.value,
    about: profileProff.value,
  };
  edituser(user)
    .then((user) => {
      profile__name.textContent = user.name;
      profile__proff.textContent = user.about;
      closePopup(popup_proff);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      event.submitter.textContent="Сохранить";
      event.submitter.disabled = true;
    });
}


function handleavatarSubmitForm(event) {
  console.log("правильно");
  console.log(avatarUrl);
  event.preventDefault();
  event.submitter.textContent="Сохранение...";
  let avatartt= {
    avatar: avatarUrl.value,
  };
  
    editavatar(avatartt)
    .then(() => {
      getuser()
      .then((user) => {
       avatar.src = user.avatar;
      })
      closePopup(popup_avatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      event.submitter.textContent="Сохранить";
      event.submitter.disabled = true;
    });

}

const popuplist = document.querySelectorAll(".popup");
popuplist.forEach((form) => {
  form.addEventListener("mousedown", closeByClick);
});


profileForm.addEventListener("submit", handleprofileSubmitForm);

avatarForm.addEventListener("submit", handleavatarSubmitForm);

profile__editbutton.addEventListener("click", () => editprofile(popup_proff));

profile__addbutton.addEventListener("click", () =>
  openPopup(popup_image)
);

imageavatar.addEventListener("mouseover", () =>
  profile__edavatar.classList.add("profile__edavatar_active")
);
imageavatar.addEventListener("mouseout", () =>
  profile__edavatar.classList.remove("profile__edavatar_active")
);

imageavatar.addEventListener("click", () =>
  openPopup(popup_avatar)
);

button__del__image.addEventListener("click", () =>
  closePopup(popup_image)
);
button__del__prof.addEventListener("click", () =>
  closePopup(popup_proff)
);
button__del__imageviu.addEventListener("click", () =>
  closePopup(popup_imageviu)
);

button__del__avatar.addEventListener("click", () =>
  closePopup(popup_avatar)
);
