const markdown = require('markdown-it')

var hljs = require('highlight.js'); // https://highlightjs.org/

module.exports = function (src) {
  var md = markdown({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      return hljs.highlightAuto(str).value
    }
  });
  const html = md.render(src)

  return (
    `<template>\n` +
    `<div class="markdown">${html}</div>\n` +
    `</template>\n`
  )
}