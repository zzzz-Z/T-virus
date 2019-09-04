const markdown = require('markdown-it')
module.exports = function(src) {
  const md = markdown({
    html: true,
    typographer: true,
  })
  const html = md.render(src)

  return (
    `<template>\n` +
    `<div class="markdown">${html}</div>\n` +
    `</template>\n`
  )
}
