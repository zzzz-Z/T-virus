import 'magi-ui/index.less'
import app from './App'
import { createApp } from 'vue3'
import { Input } from 'magi-ui'

createApp()
  .use(Input as any)
  .mount(app as any, '#app')
