'use strict'

var rd = require('rd')
var fs = require('fs')
var path = require('path')

var copy = fs.readFileSync('bin/copy-right', 'utf8')
var baseLength = path.join(__dirname, '../modules/').length

rd.eachSync('modules', function (f, s) {
  if (s.isFile()) {
    var content = fs.readFileSync(f, 'utf8')
    fs.writeFileSync(f, content.replace(/^\/\*\*[\s\S]*?\*\/|^/, copy.replace(/\{.*\}/, f.slice(baseLength))))
  }
})