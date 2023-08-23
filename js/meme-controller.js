'use strict'
let gElCanvas
let gCtx
let gCurrImg
let gIndicateLine = false

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
        let y = 0
        gElCanvas.height = (gCurrImg.naturalHeight / gCurrImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)
        memeLines.forEach(line => {
            if (line === getCurrLine()) toggleIndicateLine()
            drawText(line, y += 20)
        })
    }
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    showTextInput()
}

function toggleIndicateLine() {
    gIndicateLine = !gIndicateLine
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
    gCtx.strokeStyle = '4D4D4D'
    gCtx.fillStyle = color
    gCtx.font = `bold ${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    if (!gIndicateLine) return
    const measText = gCtx.measureText(txt)
    gCtx.lineWidth = 1.5
    gCtx.rect((x - measText.width / 2) - 5, y - size / 2, measText.width + 10, size)
    gCtx.stroke()
    toggleIndicateLine()
}

function loadImg(src) {
    gCurrImg = new Image()
    gCurrImg.src = src
}

function onDownloadCanvas(elLink) {
    elLink.href = gElCanvas.toDataURL('image/jpeg')
}