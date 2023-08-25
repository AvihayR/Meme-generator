'use strict'
let gImgs = [{ id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] }]

let gMeme = {
    selectedImgId: 16,
    lines: [
        {
            txt: 'Enter text...',
            size: 35,
            color: 'white'
        }
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gLineIdx = 0
let gCurrLine = gMeme.lines[gLineIdx]
createImgs()


function getMeme() {
    return gMeme
}

function getCurrLine() {
    return gCurrLine
}

function saveLinePos(line, pos) {
    line.pos = pos
}

function switchLine() {
    gLineIdx++
    if (gLineIdx >= gMeme.lines.length) gLineIdx = 0
    gCurrLine = gMeme.lines[gLineIdx]
}

function addLine(txt = 'Add text here..', size = 25, color = 'white') {
    const newLine = { txt, size, color }
    gMeme.lines.push(newLine)
}

function changeTxtSize(size) {
    const wantedSize = gCurrLine.size + size
    if (wantedSize <= 10 || wantedSize >= 50) return

    gCurrLine.size += size
}

function setTxtColor(color) {
    gCurrLine.color = color
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function findImg(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function getImgs() {
    return gImgs
}

function createImgs() {
    for (let i = 1; i < 18; i++) {
        createImg(`img/${i}.jpg`)
    }
}

function createImg(url, keywords = ['funny']) {
    const img = { id: makeId(), url, keywords }
    gImgs.push(img)
}

function setLineTxt(txt) {
    gCurrLine.txt = txt
}