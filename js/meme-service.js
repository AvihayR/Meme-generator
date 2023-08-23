'use strict'

var gImgs = [{ id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] }]

var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'How i sleep when there\'s a sprint ahead',
            size: 20,
            color: 'blue'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function findImg(imgId) {
    return gImgs.find(img => img.id === imgId)
}