'use strict'

function renderSavedMemes() {
    const elSavedMemes = document.querySelector('.saved-memes')
    let strHTML = ''
    gSavedMemes.forEach(meme => { strHTML += createMemeCard(meme) })
    elSavedMemes.innerHTML = strHTML
}

function createMemeCard(meme) {
    let strHTML = ''
    strHTML += `
    <article class="card" data-meme-id=${meme.id} onclick="chooseSavedMeme(this)">
    <h3>Saved meme</h3>
    <img src="${meme.imgPreview}" alt="Saved meme preview" class="preview">
    <p>Lorem, ipsum.</p>
    </article>
    `
    return strHTML
}

function chooseSavedMeme(elArticle) {
    const memeId = elArticle.dataset.memeId
    const meme = gSavedMemes.filter(meme => meme.id === memeId)[0]
    console.log(meme)
    setMeme(meme)
    // setImg(meme.selectedImgId)
    hideGallery()
    showEditor()
    renderMeme()
}


function createImgPreview() {
    const imgUrl = gElCanvas.toDataURL('image/png')
    return imgUrl
}

function onShowSaved() {
    hideEditor()
    hideGallery()
}