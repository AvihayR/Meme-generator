'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHTML = ''
    getImgs().forEach(img => strHTML += onRenderImg(img))

    elGallery.innerHTML = strHTML
}

function onImgSelect(elImg) {
    setImg(elImg.dataset.imgId)
    hideGallery()
    renderMeme()
    showEditor()
}

function onRenderImg(img) {
    const { url, id } = img
    return `<img src=${url} data-img-id=${id} onclick="onImgSelect(this)">`
}

function hideGallery() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.lower-header').classList.add('hidden')
}

function showGallery() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.lower-header').classList.add('hidden')
}