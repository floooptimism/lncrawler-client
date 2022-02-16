const {Dexie} = require('dexie')

let dexie = new Dexie('db');
dexie.version(1).stores({
    novels: "&url, title,author,source",
    chaptermetas: "&novel_url",
    chapterchunks: "&id, chaptermetaref"
})

module.exports = dexie;