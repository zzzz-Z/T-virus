import { h, defineComponent, Transition, reactive, PropType } from 'vue'
import { withVif, withVshow } from '../utils/directives'

export default defineComponent({
  name: 'VAlert',
  props: {
    type: { type: String, default: 'info' },
    message: [String, Object],
    description: [String, Object],
    closable: ({ type: Boolean, default: false } as any) as PropType<boolean>,
    showIcon: { type: Boolean, default: false },
    icon: { type: String, default: 'info' },
    closeText: String,
  },
  setup(props, { slots, emit }) {
    const prefix = 'v-alert'
    const classArr: Record<string, string> = {
      success: 'icon-check-circle',
      error: 'icon-x-circle',
      warning: 'icon-alert-circle',
      info: 'icon-info',
    }
    const state = reactive({
      show: true,
    })

    const close = () => {
      state.show = false
      emit('close')
    }

    return () => {
      const { type, closable, closeText } = props
      const desc = props.description || slots.description?.()
      const message = props.message || slots.message?.()
      const closeProps = {
        onClick: close,
        class: ['icon', prefix + '__close', closeText ? prefix + '__close--custom' : 'icon-x'],
      }

      const iconProps = {
        class: ['icon', prefix + '__icon', classArr[props.type] || props.icon],
      }

      const renderClose = withVshow(h('i', closeProps, closeText), !!closable || !!closeText)

      const renderContent = h('div', { class: prefix + '__content' }, [
        withVif(h('p', { class: prefix + '__message' }, message), message),
        withVif(h('p', { class: prefix + '__description' }, desc), desc),
      ])

      const alertProps = {
        class: [
          prefix,
          {
            [`${prefix}--${type}`]: type,
            [`${prefix}--with-description`]: desc,
          },
        ],
      }

      return h(Transition, { name: 'fade' }, () =>
        withVshow(h('div', alertProps, [h('i', iconProps), renderContent, renderClose]), state.show)
      )
    }
  },
})
