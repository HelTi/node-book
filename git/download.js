const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const colors = require('colors')

const cwd = process.cwd()
//https://github.com/nuxt-community/analytics-module.git
https.get('https://fscdn.zto.com/GetPublicFile/ztPK4Y-WGgWKiRNfkygd3oYQ/original_bc965271a94a427e92b7aff78c67f82c.jpg', (res) => {
  //console.log(res)
  let { statusCode, headers } = res
  console.log('statusCode', statusCode)
  console.log('headers', headers)
  const DOWNLOAD_PATH = path.join(cwd, 'download')
  console.log('DOWNLOAD_PATH', DOWNLOAD_PATH)
  if (fs.existsSync(DOWNLOAD_PATH)) {
    console.log('已存在download文件夹'.green)
  } else {
    fs.mkdirSync(DOWNLOAD_PATH)
  }
  let filename = 'index'

  const wt = fs.createWriteStream(path.join(DOWNLOAD_PATH, filename))

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
    wt.write(chunk, 'utf8', function () {

    })
  });
  res.on('end', () => {
    try {

    } catch (e) {
      console.error(e.message);
    }
  });
})