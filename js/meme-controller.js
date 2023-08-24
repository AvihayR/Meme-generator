'use strict'
let gElCanvas
let gCtx
let gCurrImg
let gIndicateLine = false
let gIsOnText = false
// let gSelectedText
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
    updateTextInput()
    addMouseListeners()
    addTouchListeners()
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
            y += 35
            drawText(line, line.pos)
        })
    }
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)

    isTextClicked(pos)
    updateTextInput()
    renderMeme()
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gIsOnText) return
    const pos = getEvPos(ev)
    drawText(gCurrLine, pos)
    renderMeme()
}

function onUp(ev) {
    gIsOnText = false
    document.body.style.cursor = 'unset'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function isTextClicked(pos) {
    const { x, y } = pos

    getMeme().lines.forEach(line => {
        const linePos = line.pos

        const startX = (linePos.textWidth / 2) - (linePos.textWidth - linePos.x)
        const endX = startX + linePos.textWidth
        const startY = linePos.y - linePos.size / 2
        const endY = linePos.y + linePos.size / 2

        if (x >= startX && x <= endX && y >= startY && y <= endY) {
            gIsOnText = true
            gCurrLine = line
        }
    })
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    updateTextInput()
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

function updateTextInput() {
    const txt = getCurrLine().txt
    document.querySelector('.line-text').value = txt
}

function drawText(line, pos) {
    const { txt = 'Insert text here', size = 20, color = '#FFFFFF' } = line
    const { y = 20, x = gElCanvas.width / 2 } = pos

    gCtx.lineWidth = 1
    gCtx.strokeStyle = '#242424'
    gCtx.fillStyle = color
    gCtx.font = `bold ${size}px Trebuchet MS`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    const textWidth = gCtx.measureText(txt).width

    saveLinePos(line, { x, y, textWidth, size })

    if (!gIndicateLine) return
    gCtx.lineWidth = 1.5
    gCtx.rect((x - textWidth / 2 - 5), (y - size / 2), (textWidth + 10), size)
    gCtx.strokeStyle = '#454545'
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