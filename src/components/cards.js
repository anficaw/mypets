 


function closeByEsc(evt) {
  if (evt.key ==="Escape") {
      const opendPopup = document.querySelector(".popupimage_opened");
      console.log(document);
      console.log(opendPopup);
      /*opendPopup.reset();*/
      opendPopup.classList.remove("popupimage_opened");
      document.removeEventListener('keydown',closeByEsc);
  }
}


function openPopupimage(item, creatElementconfig) {
    const popup_imageviu = document.getElementById(creatElementconfig.popup_imageviu);
    const imageText = popup_imageviu.querySelector(creatElementconfig.imageText);
    const image = popup_imageviu.querySelector(creatElementconfig.image);
    imageText.textContent = item.querySelector(creatElementconfig.nameSelector).textContent;
    const itemImage = item.querySelector(creatElementconfig.imageSelector)
    image.alt = itemImage.alt;
    image.src = itemImage.src;
    popup_imageviu.classList.add("popupimage_opened");
    document.addEventListener('keydown',closeByEsc);
  }
  
  function likeImage(itemLike,creatElementconfig) {
   
    if (itemLike.classList.contains(creatElementconfig.likeActiveClass)) {
       
      itemLike.classList.remove(creatElementconfig.likeActiveClass);
    } else {
      itemLike.classList.add(creatElementconfig.likeActiveClass);
    }
  }

export function createNewElement(item,creatElementconfig) {

    const shablonElement = document.querySelector(creatElementconfig.shablonElement).content.querySelector(creatElementconfig.element);
    const newElement = shablonElement.cloneNode(true);
    const newElementName = newElement.querySelector(creatElementconfig.nameSelector);
    newElementName.textContent = item.name;
    const newElementimage = newElement.querySelector(creatElementconfig.imageSelector);
    newElementimage.src = item.link;
    newElementimage.alt = item.name;
    newElementimage.addEventListener("click", () => openPopupimage(newElement,creatElementconfig));
    
    const itemLike = newElement.querySelector(creatElementconfig.likeSelector);
    itemLike.addEventListener("click", () => likeImage(itemLike,creatElementconfig));
  
    const buttonDelete = newElement.querySelector(creatElementconfig.delSelector);

    buttonDelete.addEventListener("click", () => {
      newElement.remove();
    });
  
    return newElement;
  }
  
  
  