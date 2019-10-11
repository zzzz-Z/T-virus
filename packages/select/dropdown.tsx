import { createComponent, reactive } from '../createComponent'

const dropProps = {
  placement: { type: String, default: 'bottom-start' },
  className: { type: String },
  transfer: { type: Boolean }
}
const Drop = createComponent({
  name: 'Drop',
  props: dropProps,
  setup(props, vm) {
    const state = reactive({
      popper: null,
      width: '',
      popperStatus: false,
      // tIndex: this.handleGetIndex()
    })
    return () => (
      <div class='ivu-select-dropdown' style='style'  >
        {this.$slots.default}
      </div>
    )
  }
})
