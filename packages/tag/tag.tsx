import { h, defineComponent, Transition, computed, reactive } from 'vue'
import { withVif } from '../utils/directives'
 

const colorArr = ['default', 'primary', 'success', 'error', 'warning', 'info']

export default defineComponent({
  name: 'VTag',
  props: {
    name: [String, Number],
    color: { type: String, default: 'default' },
    closable: { type: Boolean, default: false }
  },
  setup(props, { slots, emit }) {
    const state = reactive({ show: true })

    const colorCls = computed(() => {
      return colorArr.indexOf(props.color) > -1 ? `v-tag--${props.color}` : ''
    })

    const colorStyle = computed(() => {
      if (colorArr.indexOf(props.color) > -1) return ''
      return {
        borderColor: props.color,
        backgroundColor: props.color
      }
    })
    const close = () => {
      state.show = false
      emit('close', props.name)
    }

    const render = () =>
      h(Transition, { name: 'fade' }, () =>
        h(
          'span',
          { style: colorStyle.value, class: ['v-tag', colorCls.value] },
          [
            h('span', { class: 'v-tag__text' },  slots.default?.()),
            withVif(
              h('i', { onClick: close, class: 'icon icon-x v-tag__close' }),
              props.closable
            )
          ]
        )
      )

    return () => withVif(render(), state.show)
  }
})
