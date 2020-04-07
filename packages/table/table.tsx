import { defineComponent, h, reactive, getCurrentInstance, ref, nextTick, watch, computed, PropType } from 'vue';
import { getStyle, isNumber } from 'packages/utils/util';
import { Columns } from './type';
const tableProps = {
  size: { type: String, default: 'normal' },
  stripe: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  data: { type: Array, default() { return [] } } as any as PropType<any[]>,
  columns: { type: Array, default() { return [] } } as any as PropType<Columns[]>,
  optional: { type: Boolean, default: false },
  pagination: { type: Boolean, default: false },
  pageSize: { type: Number, default: 10 },
  showPageTotal: { type: Boolean, default: true },
  showPageSizer: { type: Boolean, default: false },
  showPageQuickjump: { type: Boolean, default: false },
  height: { type: [Number, String] }
}
export default defineComponent({
  name: 'VTable',
  emits: [],
  props: tableProps,
  setup(props, { slots }) {
    const prefix = (cls: string = '') => 'v-table' + cls
    const instance = getCurrentInstance()!
    const state = reactive({
      bodyHeight: 0,
      tableStyles: computed(() => {
        const style: any = {}
        const height = props.height
        if (height) {
          style.height = isNumber(height) ? `${height}px` : height
        }
        return style
      }),
      bodyStyle: computed(() => {
        const style: any = {}
        if (state.bodyHeight !== 0) {
          const headerHeight = parseInt(getStyle(headerRef.value, 'height')) || 0
          style.height = `${state.bodyHeight}px`
          style.marginTop = `${headerHeight}px`
        }
        return style
      }),
      contentStyle: computed(() => {
        const style: any = {}
        if (state.bodyHeight !== 0) {
          const headerHeight = parseInt(getStyle(headerRef.value, 'height')) || 0
          style.height = `${state.bodyHeight + headerHeight}px`
        }
        return style
      })
    })
    const footerRef = ref<HTMLElement | null>(null)
    const headerRef = ref<HTMLElement | null>(null)
    const bodyRef = ref<HTMLElement | null>(null)

    watch(() => props.height, calculateBodyHeight)

    function calculateBodyHeight() {
      if (props.height) {
        nextTick(() => {
          const headerHeight = parseInt(getStyle(headerRef.value, 'height')) || 0
          const footerHeight = parseInt(getStyle(footerRef.value, 'height')) || 0
          state.bodyHeight = (props.height as number) - headerHeight - footerHeight
        })
      } else {
        state.bodyHeight = 0
      }
    }

    function renderColgroup() {
      return h('colgroup', props.columns!.map(c => h('col', {
        width: c.width,
        align: c.align
      })))
    }

    function renderThead() {
      const ths = props.columns!.map(c => {
        const attrs = c.cellProps || {}
        const cls = [prefix('__cell'), prefix('__column')]
        return h('th', { ...attrs, class: cls }, c.title)
      })

      return h('thead',
        { class: prefix('__thead'), ref: headerRef }, [
        h('tr', ths)
      ])
    }

    function renderHeader() {
      return h('table', { class: prefix('__header') }, [
        renderColgroup(),
        renderThead()
      ])
    }

    function renderTbody() {
      const trs = props.data!.map((row, index) => {
        return h('tr', props.columns!.map(c =>
          h('td', { class: prefix('__cell') },
            c.render?.({ val: row[c.key], index, row }) || row[c.key]
          ))
        )
      })

      const empty = h('tr', h('td', {
        class: [prefix('__cell'), prefix('))cell--nodata')]
      }))

      return props.data?.length
        ? h('tbody', { class: prefix('__tbody'), ref: bodyRef }, trs)
        : empty
    }

    function renderBody() {
      return h('div', { class: prefix('__body'), style: state.bodyStyle },
        h('table', [
          renderColgroup(),
          renderTbody()
        ]))
    }

    function renderContent() {
      return h('div', { class: prefix('__content'), style: state.contentStyle }, [
        renderHeader()
      ])
    }

    return () => h('div', {
      style: state.tableStyles,
      class: [
        prefix(), {
          // [prefix('--fixHeight')]: ''
        }
      ]
    }, [
      renderContent(),
      renderBody()
    ])
  }
})