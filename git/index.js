const download = require('../utils/download')

download('https://m.ztbest.com')

download('https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/original_bc965271a94a427e92b7aff78c67f82c.jpg', {
  filename: 'a'
})

const argvs = process.argv.slice(2)
console.log('argvs', argvs)



