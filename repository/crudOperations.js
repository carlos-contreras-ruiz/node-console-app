const fs = require('fs')

const archivo = './database'
const filename = '/data.json'
const fullpath = archivo + filename

const saveTarea = (data) => {
    if (!fs.existsSync(archivo)) {
        fs.mkdirSync(archivo)
    }

    fs.writeFileSync(archivo + filename, data)
}

const loadDB = () => {
    if (!fs.existsSync(fullpath)) {
        return {}
    }

    const data = fs.readFileSync(fullpath, { encoding: 'utf-8' })
    return JSON.parse(data)
}

module.exports = {
    saveTarea,
    loadDB,
}
