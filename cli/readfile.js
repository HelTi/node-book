const fs = require('fs'),
  stdin = process.stdin,
  stdout = process.stdout;

const path = require('path')
const colors = require('colors')
//启动函数
async function run() {
  let files = await readFileList()
  let stats = []
  if (!files.length) {
    return console.log('此目录下没有文件'.red)
  }
  stats = await checkFileStat(files)

  readInput(files, stats)
}

//读取目录文件
async function readFileList() {
  let fileList = await fs.readdirSync(__dirname)
  return fileList
}

//读取文件状态
function checkFileStat(files) {
  //储存stats
  return new Promise((resolve, reject) => {
    let stats = []
    files.forEach((file, index) => {
      fs.stat(path.join(__dirname, file), (err, stat) => {
        stats[index] = stat
        if (stat.isDirectory()) {
          console.log(`${index}  ${file}`.green)
        } else {
          console.log(`${index}  ${file}`.red)
        }
      })
    })
    resolve(stats)
  })

}

//读取用户输入
function readInput(files, stats) {
  console.log(' ')
  stdout.write('请输入选择：'.gray)
  stdin.resume()
  stdin.setEncoding('utf8')
  //监听输入数据
  stdin.on('data', readInputCb(files, stats))
}

function readInputCb(files, stats) {
  return function (data) {
    let selectIndex = Number(data)
    let filename = files[selectIndex]
    if (!filename) {
      stdout.write('请输入你的选择'.red)
    } else {
      stdin.pause()
      if (stats[selectIndex].isDirectory()) {
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
}

run()