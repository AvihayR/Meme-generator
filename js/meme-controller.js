'use strict'
let gElCanvas
let gCtx
let gCurrImg
let gIndicateLine = false
let gIsOnText = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    resizeCanvas()
    updateTextInput()
    addListeners()
    hideEditor()
}

function renderMeme() {
    const meme = getMeme()
    const imgSrc = findImg(meme.selectedImgId).url
    const memeLines = meme.lines

    loadImgToCanvas(imgSrc)
    gCurrImg.onload = () => {
        let y = 0
        gElCanvas.height = (gCurrImg.naturalHeight / gCurrImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)

        memeLines.forEach(line => {
            y += 35
            drawText(line, line.pos)
        })
    }
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })


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

    checkIsOnText(pos)
    renderMeme()
    updateTextInput()
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

function checkIsOnText(pos) {
    const { x, y } = pos
    const memeLines = getMeme().lines
    for (let i = 0; i < memeLines.length; i++) {
        const line = memeLines[i]
        const linePos = line.pos
        const startX = (linePos.textWidth / 2) - (linePos.textWidth - linePos.x)
        const endX = startX + linePos.textWidth
        const startY = linePos.y - linePos.size / 2
        const endY = linePos.y + linePos.size / 2

        if (x >= startX && x <= endX && y >= startY && y <= endY) {
            gIsOnText = true
            gCurrLine = line
            return
        } else {
            resetCurrLine()
        }
    }
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    updateTextInput()
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
    const txt = getCurrLine() ? getCurrLine().txt : ''
    document.querySelector('.line-text').value = txt
}


function drawText(line, pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }) {
    const { txt = 'Insert text here', size = 20 } = line
    const { x, y } = pos

    drawTextOnCanvas(line, pos)
    const textWidth = gCtx.measureText(txt).width
    saveLinePos(line, { x, y, textWidth, size })

    if (gCurrLine === line) {
        drawBoxSelectedLine(gCurrLine)
    }
}

function drawTextOnCanvas(line, pos) {
    let { txt, size, color, font, align } = line
    const { x, y } = pos
    font = (!font) ? 'Impact' : font
    align = (!align) ? 'center' : align

    gCtx.lineWidth = 1.5
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawBoxSelectedLine(line) {
    const { x, y, textWidth, size } = line.pos
    gCtx.lineWidth = 2
    gCtx.rect((x - textWidth / 2 - 5), (y - size / 2), (textWidth + 10), size)
    gCtx.strokeStyle = '#E8E8E8'
    gCtx.stroke()
}

function loadImgToCanvas(src) {
    gCurrImg = new Image()
    gCurrImg.src = src
}

function onDownloadCanvas(elLink) {
    elLink.href = gElCanvas.toDataURL('image/jpeg')
}

function onSaveMemeToStorage(ev) {
    ev.preventDefault()
    saveMemeToStorage()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function resetCurrLine() {
    gCurrLine = null
}

function showEditor() {
    document.querySelector('main .editor').classList.remove('hidden')
}

function hideEditor() {
    document.querySelector('main .editor').classList.add('hidden')
}

function toggleMainMenu() {
    document.querySelector('.top-header nav .main-menu').classList.toggle('open')
}

function onRemoveLine() {
    gMeme.lines = gMeme.lines.filter(line => line !== gCurrLine)
    renderMeme()
}

function onAlignText(elBtn) {
    gCurrLine.align = elBtn.value
    renderMeme()
}

function onChangeFont(ev) {
    gCurrLine.font = ev.target.value
    renderMeme()
}

function onAddSticker(elBtn) {
    addLine(elBtn.textContent)
    renderMeme()
}