import { defineComponent, computed, inject, h } from 'next-vue'

export default defineComponent({
  name: 'VCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  setup(props, { slots }) {
    const parent = inject<Record<string,any>>('row')

    return () => {
      let classList:string[] = []
      let style: Record<string,any> = {}
      const gutter = parent?.gutter || 0

      if (gutter) {
        style.paddingLeft = gutter / 2 + 'px'
        style.paddingRight = style.paddingLeft
      }

      ;['span', 'offset', 'pull', 'push'].forEach((prop) => {
        const n = (props as any)[prop]
        if (n || n === 0) {
          classList.push(
            prop !== 'span' ? `v-col-${prop}-${n}` : `v-col-${n}`
          )
        }
      })
      ;['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        const n = (props as any)[size]
        if (typeof n === 'number') {
          classList.push(`v-col-${size}-${n}`)
        } else if (typeof n === 'object') {
          Object.keys(n).forEach(prop => {
            classList.push(
              prop !== 'span'
                ? `v-col-${size}-${prop}-${n}`
                : `v-col-${size}-${n}`
            )
          })
        }
      })

      return h(
        props.tag,
        { class: ['v-col', classList], style },
        slots.default?.()
      )
    }
  }
})
