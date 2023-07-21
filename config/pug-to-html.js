import { join, relative } from 'path'
const glob = require('glob')
const fs = require('fs')
const pug = require('pug')
const chalk = require('chalk')

const pugDir = '../src/html/pages/'

function getAllPugs() {
  let pugs = {}
  // 读取pugPath底下所有的.pug文件
  const pugDirPath = __dirname(__dirname, pugDir)
  glob.sync(join(__dirname, pugDir + '**/*.pug')).forEach((entry)=> {
    const relativePath = relative(entry, pugDirPath)
    console.log(relativePath)
    const key = entry
      .split('/')
      .splice(-1)[0]
      .split('.')[0]
    if(pugs.hasOwnProperty(key)) {
      pugs[key + '_'+ new Date().getTime()] = entry
    } else {
      pugs[key] = entry
    }
    
  })
  return pugs
}

function createHtml() {
  const pugs = getAllPugs()
  console.log(pugs)
  // 生成html
  if (!Object.keys(pugs).length) {
    console.log(chalk.white.bgRed.bold('Not found pug path files!'))
    return
  }
  // 将pug模板文件生成为html模板文件
  for (let property in pugs) {
    // 读取pug模板内容
    const pugStr = pug.renderFile(pugs[property], { pretty: true }) //pretty : ture 相当于beauty格式化一下输出的代码
    const publicPath = join(__dirname, '..', '/htmltest')
    const exists = fs.existsSync(publicPath)
    if (!exists) {
      fs.mkdirSync(publicPath, { recursive: true }, err => {
        if (err) {
          throw new Error('creat filedir! something wrong was happended')
        }
      })
    }
    // 把html内容写入到目标文件夹里
    fs.writeFileSync(publicPath + '/' + property + '.html', pugStr)
    console.log(
      chalk.green.bold(
        'write ' + publicPath + '/' + property + '.html success!'
      )
    )
  }
}

module.exports = createHtml