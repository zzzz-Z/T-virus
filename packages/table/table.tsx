import {
  defineComponent,
  h,
  reactive,
  ref,
  nextTick,
  watch,
  computed,
  PropType,
  onMounted,
  VNode
} from 'vue';
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
  height: { type: [Number, String] },
  footer: Function
}
export default defineComponent({
  name: 'VTable',
  emits: [],
  props: tableProps,
  setup(props, { slots }) {
    const prefix = (cls: string = '') => 'v-table' + cls
    /**===================state====================**/
    const state = reactive({
      columns: props.columns,
      bodyHeight: 0,
      bodyWidth: 0,
      scrollX: false,
      tableStyles: computed(() => {
        const style: any = {}
        const height = props.height
        if (height) {
          style.height = isNumber(height) ? `${height}px` : height
        }
        return style
      })
    })
    /**===================state====================**/


    /**===================refs===================**/
    const footerRef = ref<HTMLElement | null>(null)
    const headerRef = ref<HTMLElement | null>(null)
    const tableRef = ref<HTMLElement | null>(null)
    const bodyRef = ref<HTMLElement | null>(null)
    let headerThs: VNode[] = []
    /**===================refs====================**/

    watch(() => props.height, calculateBodyHeight, { immediate: true })

    onMounted(() => {
      setWidth()
      window.addEventListener('resize', setWidth)
    })

    function setWidth() {
      nextTick(() => {
        let bodyWidth = 0
        const table = tableRef.value!
        const widths = headerThs.map(node => parseInt(getStyle(node.el, 'width')))
        state.columns!.forEach((r, n) => {
          r.width = r.width || widths[n]
          bodyWidth += r.width
        })
        state.bodyWidth = bodyWidth
        state.scrollX = bodyWidth - parseInt(getStyle(table, 'width')) >= 0
        table.style.overflow = state.scrollX ? 'auto' : 'hidden'
      })
    }

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
      return h('colgroup', state.columns!.map(c => h('col', { width: c.width })))
    }

    function renderThead() {
      headerThs = state.columns!.map(column => {
        const attrs = {
          align: column['align'],
          colspan: 1,
          rowspan: 1,
          class: ['is-leaf']
        }
        return h('th', attrs, h('div', { class: 'cell' }, column.title))
      })

      return h('thead',
        { class: prefix('__thead'), ref: headerRef }, [
        h('tr', headerThs)
      ])
    }

    function renderHeader() {
      return h('div', {
        style: { width: state.bodyWidth + 'px' },
        class: prefix('__header-wrapper')
      },
        h('table', {
          border: "0",
          cellspacing: "0",
          cellpadding: "0",
          class: prefix('__header')
        }, [
          renderColgroup(),
          renderThead()
        ]))

    }

    function renderTbody() {
      const trs = props.data!.map((row, index) => {
        return h('tr', state.columns!.map(column => {
          const { key, render } = column
          const params = { val: row[key], index, row }
          const attrs = {
            colspan: 1,
            rowspan: 1,
            class: 'cell',
            align: column['align'],
          }
          return h('td', attrs, render?.(params) || slots[key]?.(params) || row[key])
        })
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
      return h('div', {
        class: prefix('__body-wrapper'),
        style: {
          width: state.bodyWidth + 'px',
          height: state.bodyHeight + 'px'
        }
      },
        h('table', {
          border: "0",
          cellspacing: "0",
          cellpadding: "0",
          class: prefix('__body')
        }, [
          renderColgroup(),
          renderTbody()
        ]))
    }

    function renderFooter() {
      const footer = props.footer || slots.footer
      return footer && h('div', { ref: footerRef, class: prefix('__footer') }, footer())
    }
    return () => h('div', {
      style: state.tableStyles,
      class: [
        prefix()
      ],
      ref: tableRef
    }, [
      renderHeader(),
      renderBody(),
      renderFooter()
    ])
  }
})