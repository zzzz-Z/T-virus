import { defineComponent, computed, h, provide } from 'vue'
 

export default defineComponent({
  name: 'VRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  setup(props, { slots }) {
    provide('row', props)

    const style = computed(() => {
      const ret: any = {}
      if (props.gutter) {
        ret.marginLeft = `-${props.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret
    })

    const classs = computed(() => [
      'v-row',
      props.justify !== 'start' ? `is-justify-${props.justify}` : '',
      props.align !== 'top' ? `is-align-${props.align}` : '',
      { 'v-row--flex': props.type === 'flex' }
    ])

    return () =>
      h(
        props.tag,
        { class: classs.value, style: style.value },
        slots.default?.()
      )
  }
})
