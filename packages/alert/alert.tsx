import { h, defineComponent, Transition, computed, reactive } from 'next-vue'
import { withVif, withVshow } from '../utils/directives'

const classArr: any = {
  success: 'icon-check-circle',
  error: 'icon-x-circle',
  warning: 'icon-alert-circle',
  info: 'icon-info'
}
export default defineComponent({
  name: 'VAlert',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    message: [String, Object],
    description: [String, Object],
    closable: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'info'
    },
    closeText: String
  },
  setup(props, { slots, emit }) {
    const state = reactive({ show: true })
    const prefix = 'v-alert'

    const close = () => {
      state.show = false
      emit('close')
    }

    return () => {
      const { type, closable, closeText } = props
      const description = props.description || slots.description?.()
      const message = props.message || slots.message?.()
      const closeProps = {
        onClick: close,
        class: [
          'icon',
          prefix + '__close',
          closeText ? prefix + '__close--custom' : 'icon-x'
        ]
      }

      const iconProps = {
        class: ['icon', prefix + '__icon', classArr[props.type] || props.icon]
      }

      const renderClose = withVshow(
        h('i', closeProps, closeText),
        closable || !!closeText
      )

      const renderContent = h(
        'div',
        { class: prefix + '__content' }, [
        withVif(h('p', { class: prefix + '__message' }, message), message),
        withVif(
          h('p', { class: prefix + '__description' }, description),
          description
        )
      ])

      const alertProps = {
        class: [
          prefix,
          {
            [`${prefix}--${type}`]: type,
            [`${prefix}--with-description`]: description
          }
        ]
      }

      return h(
        Transition, { name: 'fade' }, () =>
        withVshow(
          h('div', alertProps, [
            h('i', iconProps),
            renderContent,
            renderClose
          ]),
          state.show
        )
      )
    }
  }
})
