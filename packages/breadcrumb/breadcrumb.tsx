import { h, defineComponent, provide, reactive } from 'next-vue';

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    separator: { type: [String, Object], default: '/' }
  },
  setup(props, { slots }) {
    provide(
      'breadcrumb',
      reactive({
        separator: slots.separator || (() => props.separator)
      })
    )
    return () => h(
      'div',
      { class: 'v-breadcrumb' },
      slots.default?.()
    )
  }
})