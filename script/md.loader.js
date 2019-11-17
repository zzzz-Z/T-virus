const markdown = require('markdown-it')
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const container = require('markdown-it-container')
const hljs = require('highlight.js')
const toc = require('markdown-it-table-of-contents')
const md = markdown({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (__) { }
    }

    return '<pre v-pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})
  .use(emoji)
  .use(containers)
  .use(toc, { includeLevel: [2, 3] })

// 使用 anchor 插件为标题元素添加锚点
// .use(anchor, {
//   permalink: true,
//   permalinkBefore: true,
//   permalinkSymbol: '#'
// })


module.exports = function (src) {
  const template = md.render(src)
  
  return `export default ${JSON.stringify({ template })}  `;
}


function containers(md) {
  md
    .use(...createContainer('tip', 'TIP'))
    .use(...createContainer('warning', 'WARNING'))
    .use(...createContainer('danger', 'WARNING'))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? `<div v-pre>\n`
        : `</div>\n`
    })
}

function createContainer(klass, defaultTitle) {
  return [container, klass, {
    render(tokens, idx) {
      const token = tokens[idx]
      const info = token.info.trim().slice(klass.length).trim()
      if (token.nesting === 1) {
        return `<div class="${klass} custom-block"><p class="custom-block-title">${info || defaultTitle}</p>\n`
      } else {
        return `</div>\n`
      }
    }
  }]
}