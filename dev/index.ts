import app from './App'
import { createApp } from 'next-vue'
import UI from 'ui'

createApp()
  .use(UI)
  .mount(app as any, '#app')
