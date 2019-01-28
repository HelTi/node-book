const fs = require('fs'),
  stdin = process.stdin,
  stdout = process.stdout;
const colors = require('colors')
/**
 * 
 */

console.log('hello'.green);
console.log(process.cwd())
fs.readdir(__dirname, (err, files) => {
  console.log(' ')
  if (!files.length) {
    return console.log('没有文件'.red)
  }
  console.log('    选择文件或者文件夹 ')
  file(0)

  function file(i) {
    var filename = files[i]
    fs.stat(__dirname + '/' + filename, function (err, stat) {
      if (stat.isDirectory()) {
        console.log((i + filename).green)
      } else {
        console.log((i + filename).red)
      }
      i++
      if (i == files.length) {
        read()
      } else {
        file(i)
      }
    })
  }

  function read() {
    console.log(' ')
    stdout.write('请输入选择：'.gray)
    stdin.resume()
    stdin.setEncoding('utf8')
    stdin.on('data',option)
  }

  function option(data) {
    if (!files[Number(data)]) {
      stdout.write('输入你的选择：'.red)
    } else {
      stdin.pause()
    }
  }

})

