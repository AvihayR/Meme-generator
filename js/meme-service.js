'use strict'
let gImgs = [{ id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] }]

let gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Now i can sleep better :)',
            size: 30,
            color: 'blue',
            pos: { x: 200, y: 15 }
        },
        {
            txt: 'Awesome!',
            size: 35,
            color: 'white',
            pos: { x: 200, y: 35 }
        }
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gLineIdx = 0
let gCurrLine = gMeme.lines[gLineIdx]


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

function createImg(url, keywords = ['funny', 'cat']) {
    const img = { id: makeId(), url, keywords }
    gImgs.push(img)

    return img
}

function setLineTxt(txt) {
    gCurrLine.txt = txt
}