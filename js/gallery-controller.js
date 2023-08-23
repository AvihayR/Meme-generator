'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHTML = ''
    strHTML += onCreateImg('img/1.jpg')
    strHTML += onCreateImg('img/2.jpg')

    elGallery.innerHTML = strHTML
}

function onImgSelect(elImg) {
    setImg(elImg.dataset.imgId)
    renderMeme()
    // setImg(elImg.data['img-id'])
}

function onCreateImg(url) {
    const img = createImg(url, ['funny', 'cat'])
    return `<img src=${url} data-img-id=${img.id} onclick="onImgSelect(this)">`
}