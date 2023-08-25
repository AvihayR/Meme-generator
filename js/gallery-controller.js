'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHTML = ''
    getImgs().forEach(img => strHTML += onRenderImg(img))

    elGallery.innerHTML = strHTML
}

function onSelectRandomImg() {
    const elImgs = document.querySelectorAll('[data-img-id]')
    const img = elImgs[getRandomInt(0, elImgs.length)]
    onImgSelect(img)
}

function onImgSelect(elImg) {
    setImg(elImg.dataset.imgId)
    hideGallery()
    showEditor()
    renderMeme()
}

function onRenderImg(img) {
    const { url, id } = img
    return `<img src=${url} data-img-id=${id} onclick="onImgSelect(this)">`
}

function goToGallery(ev) {
    if (ev) ev.preventDefault()
    hideEditor()
    showGallery()
}

function hideGallery() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.lower-header').classList.add('hidden')
}

function showGallery() {
    document.querySelector('.gallery').classList.remove('hidden')
    document.querySelector('.lower-header').classList.remove('hidden')
}