import 'packages/theme/index.scss'
import './docs.scss'
import packages from 'packages'
import { createApp } from 'vue'
import demo from './container/demo'
import app from './App'

createApp()
  .component('demo', demo as any)
  .use(packages)
  .mount(app as any, '#app')
