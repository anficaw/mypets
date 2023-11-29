
import "./styles/index.css"; // добавьте импорт главного файла стилей

const buttonDelProf = document.getElementById("button__del__prof");
const buttonDelImage = document.getElementById("button__del__image");
const buttonDelImageviu = document.getElementById("button__del__imageviu");
const buttonDelAvatar = document.getElementById("button__del__avatar");

const popupProff = document.getElementById("profile");
const popupImage = document.getElementById("imagefile");
const popupImageviu = document.getElementById("imageviu");
const popupAvatar = document.getElementById("editavatar");
const profileEdAvatar = document.getElementById("avataredit");

const avatarUrl = document.getElementById("popup__info_avatarurl");

const imageAvatar = document.querySelector(".profile__avatar");

const imageForm = popupImage.querySelector(".popup__info");
const imageName = document.getElementById("popup__info_imagename");
const imageURL = document.getElementById("popup__info_imageurl");
const profileName = document.querySelector(".profile__name");
const profileProff = document.querySelector(".profile__proff");

const avatar = document.getElementById("avatar");

const profileForm = popupProff.querySelector(".popup__info");
const avatarForm = popupAvatar.querySelector(".popup__info");

const popupProfileName = document.getElementById("popup__info_profilename");
const popupProfileProff = document.getElementById("popup__info_profileprof");

const profileEditButton = document.querySelector(".profile__editbutton");
const profileAddButton = document.querySelector(".profile__addbutton");
const elements = document.querySelector(".elements");

const creatElementConfig = {
  nameSelector: ".element__name",
  imageSelector: ".element__image",
  likecolSelector: ".element__likecol",
  likeSelector: ".element__like",
  delSelector: ".element__del",
  likeActiveClass: "element__like_active",
  templateElement: ".element__template",
  popupImageviu: "imageviu",
  imageText: ".popup__titleimage",
  image: ".popup__image",
  element: ".element",
  nondel: "element__del_non",
  non: ".element__del",
};

 export {elements, creatElementConfig};


let userId;

import { enableValidation, resetError } from "./components/validation.js";
import { createNewElement, addNewElement } from "./components/cards.js";
import { openPopup, closePopup, closeByClick } from "./components/modal.js";
import {
  getInitialCards,
  getCards,
  getUser,
  editUser,
  editAvatar,
} from "./components/api.js";

const validationConfig = {
  formSelector: ".popup__info",
  buttonSelector: ".popup__button",
  inputSelector: ".popup__input",
  inputInvalidClass: "popup__input_invalid",
};



enableValidation(validationConfig);

 
Promise.all ([getUser(),getInitialCards()])
  .then(([person,cards]) => {
    cards.reverse().forEach((item) => {
      const newItem = createNewElement(item, creatElementConfig, person._id);
      addNewElement(newItem);
    });
    profileName.textContent = person.name;
    profileProff.textContent = person.about;
    avatar.src = person.avatar;
    userId =  person._id;
   
  })
  .catch((err) => console.log(err));


export function editProfile(popupProff) {
  
  popupProfileName.value = profileName.textContent;
  popupProfileProff.value = profileProff.textContent;
  resetError(profileForm, validationConfig);
  openPopup(popupProff);
}


function handleImageSubmitForm(event) {
  event.preventDefault();
  const item = { name: imageName.value, link: imageURL.value};
  event.submitter.textContent="Сохранение...";

  getCards(item)
  .then((card) => {
    const newItem = createNewElement(card, creatElementConfig, userId);
    addNewElement(newItem);
    event.target.reset();
    event.submitter.disabled = true;
    closePopup(popupImage);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    event.submitter.textContent="Сохранить";
    
  });

  }


imageForm.addEventListener("submit", handleImageSubmitForm);

function handleProfileSubmitForm(event) {

  event.preventDefault();
  event.submitter.textContent="Сохранение...";

  const user = {
    name: popupProfileName.value,
    about: popupProfileProff.value,
  };
  editUser(user)
    .then((user) => {
      profileName.textContent = user.name;
      profileProff.textContent = user.about;
      closePopup(popupProff);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      event.submitter.textContent="Сохранить";
      
    });
}


function handleAvatarSubmitForm(event) {
 
  event.preventDefault();
  event.submitter.textContent="Сохранение...";
  const avatarNew= {
    avatar: avatarUrl.value,
  };
  
    editAvatar(avatarNew)
    .then((user) => {
      avatar.src = user.avatar;
      event.target.reset();
      event.submitter.disabled = true;
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      event.submitter.textContent="Сохранить";
      
    });

}

const formLists = document.querySelectorAll(".popup");
formLists.forEach((form) => {
  form.addEventListener("mousedown", closeByClick);
});


profileForm.addEventListener("submit", handleProfileSubmitForm);

avatarForm.addEventListener("submit", handleAvatarSubmitForm);

profileEditButton.addEventListener("click", () => editProfile(popupProff));

profileAddButton.addEventListener("click", () =>
  openPopup(popupImage)
);

imageAvatar.addEventListener("mouseover", () =>
  profileEdAvatar.classList.add("profile__edavatar_active")
);
imageAvatar.addEventListener("mouseout", () =>
  profileEdAvatar.classList.remove("profile__edavatar_active")
);

imageAvatar.addEventListener("click", () =>
  openPopup(popupAvatar)
);

buttonDelImage.addEventListener("click", () =>
  closePopup(popupImage)
);
buttonDelProf.addEventListener("click", () =>
  closePopup(popupProff)
);
buttonDelImageviu.addEventListener("click", () =>
  closePopup(popupImageviu)
);

buttonDelAvatar.addEventListener("click", () =>
  closePopup(popupAvatar)
);
