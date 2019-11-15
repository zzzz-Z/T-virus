import app from './App'
import { createApp } from 'vue3'
import UI from 'ui'

createApp()
  .use(UI)
  .mount(app as any, '#app')
