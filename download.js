const imageDownloader = require('image-downloader')
const fs = require('fs')




var notDownloadImages = []

function downloadFunc(url, name, index) {

    const options = {
        url: url,
        dest: `/download/${name}.jpg`                // will be saved to /path/to/dest/image.jpg
    }

    imageDownloader.image(options)
        .then(({ filename }) => {
            console.log('Saved to', filename);
            runCode(index + 1)
        })
        .catch((err) => console.error(err))

}







var page = 1
var data = require(`./JsonData/pornstars/page1.json`)

function runCode(index) {



    if (index < data.length) {

        downloadFunc(data[index].thumbnail, data[index].Name.replace(/ /g, "+").toLowerCase(), index)
    }
    else {
        if (page <= 24) {
            page = page + 1
            data = require(`./JsonData/pornstars/page${page}.json`)
            runCode(0)
        }
    }

}

runCode(0)











