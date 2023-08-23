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
    const meme = getMeme()
    const imgSrc = findImg(meme.selectedImgId).url
    const firstLine = meme.lines[0]

    loadImg(imgSrc)
    gImg.onload = () => {
        gElCanvas.height = (gImg.naturalHeight / gImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(firstLine.txt, firstLine.size, firstLine.color)
    }
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
    gImg = new Image()
    gImg.src = src
}
