

export function closeByClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
        closePopup(evt.target);
    }
}


export function closeByEsc(evt) {
    
    if (evt.key ==="Escape") {
        const opendPopups = document.querySelectorAll(".popup_opened");
        opendPopups.forEach(closePopup);           
    }
}


export function openPopup(popup) {
    document.addEventListener('keydown',closeByEsc);
    popup.classList.add("popup_opened");
}
  

export function closePopup(popup) {
    document.removeEventListener('keydown',closeByEsc);
    popup.classList.remove("popup_opened");
      
}
  
