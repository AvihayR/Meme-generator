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
    const memeLines = meme.lines

    loadImg(imgSrc)
    gCurrImg.onload = () => {
        gElCanvas.height = (gCurrImg.naturalHeight / gCurrImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)

        let y = 0
        memeLines.forEach(line => drawText(line, y += 20))
    }
}

function onSwitchLine() {
    switchLine()
    showTextInput()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onChangeTxtSize(size) {
    changeTxtSize(size)
    renderMeme()
}

function onSetTxtColor(elColor) {
    setTxtColor(elColor.value)
    renderMeme()
}

function onSetLineTxt(elInput) {
    setLineTxt(elInput.value)
    renderMeme()
}

function showTextInput() {
    const txt = getCurrLine().txt
    document.querySelector('.line-text').value = txt
}

function drawText(line, y = 20, x = gElCanvas.width / 2) {
    const { txt = 'Insert text here', size = 20, color = '#FFFFFF' } = line
    gCtx.lineWidth = 1
    gCtx.strokeStyle = '1A1A1A'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function loadImg(src) {
    gCurrImg = new Image()
    gCurrImg.src = src
}

function onDownloadCanvas(elLink) {
    elLink.href = gElCanvas.toDataURL('image/jpeg')
}