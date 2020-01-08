import 'packages/theme/index.scss'
import { createApp } from 'vue'
import app from './App'
import demo from './demo.md'
console.log(demo)
createApp().mount(app as any, '#app')
