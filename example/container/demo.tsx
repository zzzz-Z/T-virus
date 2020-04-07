import { reactive, computed, defineComponent } from 'vue'
// import './style.scss'

export default defineComponent({
  props: ['code'],
  template: `
   <div class="code-box">
    <div class="code-box-demo">
      <slot name='demo' />
    </div>
    <transition name='fade'>
    <div class="code-box-code" v-show="isShow">
      <slot name='code' />
    </div>
    </transition>
    <a class="code-box-toggle" @click="isShow = !isShow">{{ isShow ? '隐藏代码' : '显示代码' }}</a>
  </div>`,
  setup(props, { slots, attrs }) {
    const state = reactive({
      isShow: false,
      lange: computed(() => 'zh')
    })

    return { ...state }
  }
})
