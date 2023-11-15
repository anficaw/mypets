
 
import {disableButton,resetError} from "./validation.js";


/*function closeByEsc(evt) {
    if (evt.key === "Escape”) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    }
}*/

export function closeByClick(evt) {
    if (evt.target.classList.contains("popup")) {
        const opendPopup = document.querySelector(".popup_opened");
        opendPopup.classList.remove("popup_opened");
    }
    if (evt.target.classList.contains("popupimage")) {
        const opendPopup = document.querySelector(".popupimage_opened");
        opendPopup.classList.remove("popupimage_opened");
    }
}


function closeByEsc(evt) {
    if (evt.key ==="Escape") {
        const opendPopup = document.querySelector(".popup_opened");
        opendPopup.classList.remove("popup_opened");
        document.removeEventListener('keydown',closeByEsc);
    }
}


export function openPopup(popup,modalconfig,validationconfig) {
    document.addEventListener('keydown',closeByEsc);
    const popupform = popup.querySelector(modalconfig.formselector);
    disableButton(popupform);
    resetError(popupform,validationconfig);
    popup.classList.add(modalconfig.formopenclass);
}
  

export function closePopup(popup,modalconfig) {
    document.removeEventListener('keydown',closeByEsc);
    const popupform = popup.querySelector(modalconfig.formselector);
    popupform.reset();
    popup.classList.remove(modalconfig.formopenclass);
}
  
