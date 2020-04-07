import 'packages/styles/index.scss'
import './docs.scss'
import packages from 'packages'
import { createApp } from 'vue'
import demo from './container/demo'
import app from './App'

createApp(app)
  .component('demo', demo as any)
  .use(packages)
  .mount('#app')
