const markdown = require('markdown-it')

var hljs = require('highlight.js'); // https://highlightjs.org/

module.exports = function (src) {
  var md = markdown({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code class="${lang}" >` +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });
  const html = md.render(src)

  return (
    `<template>\n` +
    `<div class="markdown">${html}</div>\n` +
    `</template>\n`
  )
}