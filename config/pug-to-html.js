import { join, relative, dirname, resolve, basename } from 'path'
const glob = require('glob')
const fs = require('fs')
const pug = require('pug')
const chalk = require('chalk')

const pugDir = '../src/html/pages/'
const staticDir = '../src/html/common/'
function getAllPugs(path) {
  let pugs = {}
  // 读取pugPath底下所有的.pug文件
  // const pugDirPath = __dirname(__dirname, pugDir)
  glob.sync(join(__dirname, path + '**/*.pug')).forEach((entry, index)=> {
    const key = entry
      .split('/')
      .splice(-1)[0]
      .split('.')[0]
    if(pugs.hasOwnProperty(key)) {
      pugs[key + '_' + index] = entry
    } else {
      pugs[key] = entry
    }
  })
  return pugs
}

function creatPages() {
  const pugs = getAllPugs(pugDir)
  // 生成html
  if (!Object.keys(pugs).length) {
    console.log(chalk.white.bgRed.bold('Not found pug path files!'))
    return
  }
  
  // 判断生成html的目标文件夹是否存在
  const publicPath = join(__dirname, '..', '/html')
  const exists = fs.existsSync(publicPath)
  if (!exists) {
    fs.mkdirSync(publicPath, { recursive: true }, err => {
      if (err) {
        throw new Error('creat filedir! something wrong was happended')
      }
    })
  }
  // 将pug模板文件生成为html模板文件
  for (let property in pugs) {
    // 读取pug模板内容
    const pugStr = pug.renderFile(pugs[property], { pretty: true }) //pretty : ture 相当于beauty格式化一下输出的代码
    const relativePath = relative(pugDir, relative(__dirname, pugs[property]))
    const outputPath = resolve(__dirname, '../html/', dirname(relativePath))
    const fileName = basename(relativePath, '.pug')
    // 判断多级目录是否存在，不存在则创建
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true }, err => {
        if (err) {
          throw new Error('creat filedir! something wrong was happended')
        }
      })
    }
    // 把pug转成的html内容写入到目标文件
    fs.writeFileSync(outputPath + '/' + fileName + '.html', pugStr)
    console.log(
      chalk.green.bold(
        'write ' + outputPath + '/' + fileName + '.html success!'
      )
    )
  }
}

function creatStatics() {
  const pugs = getAllPugs(staticDir)
  // 生成html
  if (!Object.keys(pugs).length) {
    console.log(chalk.white.bgRed.bold('Not found pug path files!'))
    return
  }
  
  // 判断生成html的目标文件夹是否存在
  const publicPath = join(__dirname, '..', '/html')
  const exists = fs.existsSync(publicPath)
  if (!exists) {
    fs.mkdirSync(publicPath, { recursive: true }, err => {
      if (err) {
        throw new Error('creat filedir! something wrong was happended')
      }
    })
  }
  // 将pug模板文件生成为html模板文件
  for (let property in pugs) {
    // 读取pug模板内容
    const pugStr = pug.renderFile(pugs[property], { pretty: true }) //pretty : ture 相当于beauty格式化一下输出的代码
    const relativePath = relative(pugDir, relative(__dirname, pugs[property]))
    const outputPath = resolve(__dirname, '../html/')
    const fileName = basename(relativePath, '.pug')
    // 判断多级目录是否存在，不存在则创建
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true }, err => {
        if (err) {
          throw new Error('creat filedir! something wrong was happended')
        }
      })
    }
    // 把pug转成的html内容写入到目标文件
    fs.writeFileSync(outputPath + '/' + fileName + '.html', pugStr)
    console.log(
      chalk.green.bold(
        'write ' + outputPath + '/' + fileName + '.html success!'
      )
    )
  }
}

function createHtml() {
  creatPages()
  creatStatics()
}

module.exports = createHtml