import '../packages/styles/index.less'
import Vue from './vue'
import app from './App'

const APP = Vue.createApp()

APP.mount(app as any, '#app')
