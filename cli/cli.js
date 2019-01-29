const fs = require('fs'),
  stdin = process.stdin,
  stdout = process.stdout;
const path = require('path')
const colors = require('colors')

console.log('hello'.green);
console.log(process.cwd())
/**
 * 读取文件夹
 */
fs.readdir(__dirname, (err, files) => {
  console.log(' ')
  var stats = []

  if (!files.length) {
    return console.log('没有文件'.red)
  }
  console.log('    选择文件或者文件夹 ')
  file(0)

  function file(i) {
    var filename = files[i]
    fs.stat(__dirname + '/' + filename, function (err, stat) {
      stats[i] = stat
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
    stdin.on('data', option)
  }

  function option(data) {
    let filename = files[Number(data)]
    if (!filename) {
      stdout.write('输入你的选择：'.red)
    } else {
      stdin.pause()
      // 如果是文件夹
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(path.join(__dirname, filename), function (err, files) {
          console.log('')
          console.log(`--${files.length} files`)
          files.forEach(file => {
            console.log(`-  ${file}`.green)
          })
          console.log('')
        })
      } else {
        fs.readFile(path.join(__dirname, filename), 'utf8', function (err, data) {
          console.log('读取文件内容：'.red + '\n')
          console.log(data)
        })
      }

    }
  }

})

