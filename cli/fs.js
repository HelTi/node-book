var fs = require('fs')

console.log(fs.readdirSync('./'))
console.log(__dirname)
console.log(fs.readdirSync(__dirname))