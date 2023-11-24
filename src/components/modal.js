

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


export function closeByEsc(evt) {
    if (evt.key ==="Escape") {

        const opendPopup = document.querySelectorAll(".popup_opened");
        opendPopup.forEach(item=> {
            item.classList.remove("popup_opened");
            });
       document.removeEventListener('keydown',closeByEsc);
    }
}


export function openPopup(popup,modalconfig) {
    document.addEventListener('keydown',closeByEsc);
      
    popup.classList.add(modalconfig.formopenclass);
}
  

export function closePopup(popup,modalconfig) {
    document.removeEventListener('keydown',closeByEsc);
     
    popup.classList.remove(modalconfig.formopenclass);
}
  
