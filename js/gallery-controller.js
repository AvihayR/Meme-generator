'use strict'

function renderGallery(filterBy) {
    const elGallery = document.querySelector('.gallery')
    let strHTML = ''
    getImgs(filterBy).forEach(img => strHTML += onRenderImg(img))

    elGallery.innerHTML = strHTML
}

function resetFilterBy() {
    document.querySelector('input.filter-by').value = ''
}

function onFilterGalleryByKeyword(ev) {
    ev.preventDefault()
    renderGallery(ev.target.dataset.name.toLowerCase())
}

function onFilterGallery(elSearch) {
    renderGallery(elSearch.value.toLowerCase())
}

function onSelectRandomImg() {
    const elImgs = document.querySelectorAll('[data-img-id]')
    const img = elImgs[getRandomInt(0, elImgs.length)]
    onImgSelect(img)
}

function onImgSelect(elImg) {
    setImg(elImg.dataset.imgId)
    hideGallery()
    hideSavedPage()
    showEditor()
    resetLines()
    renderMeme()
    setDefaultLine()
    document.querySelector('.line-text').focus()
}

function onRenderImg(img) {
    const { url, id } = img
    return `<img src=${url} data-img-id=${id} onclick="onImgSelect(this)">`
}

function goToGallery(ev) {
    if (ev) ev.preventDefault()
    hideEditor()
    hideSavedPage()
    resetFilterBy()
    showGallery()
    renderGallery()
}

function hideGallery() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.lower-header').classList.add('hidden')
}

function showGallery() {
    document.querySelector('.gallery').classList.remove('hidden')
    document.querySelector('.lower-header').classList.remove('hidden')
}