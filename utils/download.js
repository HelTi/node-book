const request = require('request')
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const mime = require('mime-types')

/**
 * url: http地址
 * dirPath： 默认下载文件夹
 * filename: 文件名
 */
function download(url, { dirPath = 'download', filename = 'file_name' } = {}) {

  return new Promise((resolve, reject) => {
    const cwd = process.cwd()
    const DOWNLOAD_PATH = path.join(cwd, dirPath)
    if (fs.existsSync(DOWNLOAD_PATH)) {
      console.log('已存在download文件夹'.green)
    } else {
      fs.mkdirSync(DOWNLOAD_PATH)
    }
    console.log('下载目录'.green, DOWNLOAD_PATH)

    //请求下载
    request
      .get(url)
      .on('response', (response) => {
        let { headers, statusCode } = response
        let contentType = response.headers['content-type'],
          extension_name = '.' + mime.extension(contentType);
        filename = filename + extension_name
        let wr = fs.createWriteStream(path.join(DOWNLOAD_PATH, filename))
        wr.on('finish', function () {
          resolve(true)
        })
        wr.on('error', function () {
          reject(false)
        })
        request.get(url).pipe(wr)
      })
  })

}

module.exports = download