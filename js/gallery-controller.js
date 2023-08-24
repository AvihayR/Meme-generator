'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHTML = ''
    getImgs().forEach(img => strHTML += onRenderImg(img))

    elGallery.innerHTML = strHTML
}

function onImgSelect(elImg) {
    setImg(elImg.dataset.imgId)
    renderMeme()
}

function onRenderImg(img) {
    const { url, id } = img
    return `<img src=${url} data-img-id=${id} onclick="onImgSelect(this)">`
}