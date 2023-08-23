'use strict'
let gElCanvas
let gCtx
let gCurrImg

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
    showTextInput()
}

function renderMeme() {
    const meme = getMeme()
    const imgSrc = findImg(meme.selectedImgId).url
    const firstLine = meme.lines[0]

    loadImg(imgSrc)
    gCurrImg.onload = () => {
        gElCanvas.height = (gCurrImg.naturalHeight / gCurrImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(firstLine.txt, firstLine.size, firstLine.color)
    }
}

function onSetLineTxt(elInput) {
    setLineTxt(elInput.value)
    renderMeme()
}

function showTextInput() {
    const txt = getMeme().lines[0].txt
    document.querySelector('.line-text').value = txt
}

function drawText(text = 'Insert text here', size = 20, color = '#FFFFFF', x = gElCanvas.width / 2, y = 35) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = '1A1A1A'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function loadImg(src) {
    gCurrImg = new Image()
    gCurrImg.src = src
}

function onDownloadCanvas(elLink) {
    elLink.href = gElCanvas.toDataURL('image/jpeg')
}