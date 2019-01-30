const colors = require('colors')
const download = require('../utils/download')
const { exec } = require('child_process');
const stdin = process.stdin,
  stdout = process.stdout;

download('https://m.ztbest.com')

download('https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/original_bc965271a94a427e92b7aff78c67f82c.jpg', {
  filename: 'a'
})

const argvs = process.argv.slice(2)
console.log('argvs', argvs)

function readInput() {
  console.log('请输入下载地址'.red)
  stdin.resume()
  stdin.setEncoding('utf8')
  stdin.on('data', readInputCb)
}

function readInputCb(data) {
  let url = data
  if (!url) {
    stdout.write('请输入下载地址'.red)
  }
  gitClone(url, function (err) {
    if (err) {
      console.log(err)
      stdin.pause()
    } else {
      stdin.pause()
    }
  })
}


function gitClone(url, cb) {
  console.log('开始克隆仓库')
  exec(`git clone ${url}`, (err, stdout, stderr) => {
    if (err) {
      console.log('克隆仓库出错')
      cb(err)
    } else {
      console.log('克隆git仓库文件完毕')
      cb()
    }
  });
}

readInput()
//gitClone('https://github.com/HelTi/flex.git')

