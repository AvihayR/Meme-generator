'use strict'
let gElCanvas
let gCtx
let gImg

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    createImg()

    gImg.onload = () => {
        gElCanvas.height = (gImg.naturalHeight / gImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText()
    }
}

function drawText(text = 'Insert text here', x = gElCanvas.width / 2, y = 35) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = '1A1A1A'
    gCtx.fillStyle = '#FFFFFF'
    gCtx.font = '50px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function createImg() {
    gImg = new Image()
    gImg.src = 'img/3.jpg'
}
