import { createComponent, computed1, reactive, watch, onMounted } from '@/createComponent'
import { DropDownProps } from './type'
import { findComponentUpward } from '@/use'

const dropDownProps = {
  trigger: { type: String, default: 'hover' },
  placement: { type: String, default: 'bottom' },
  visible: { type: Boolean, default: false },
  transfer: { type: Boolean, default: false },
  transferClassName: { type: String },
  stopPropagation: { type: Boolean, default: false },
}
const DropDown = createComponent<DropDownProps>({
  name: 't-dropDown',
  props: dropDownProps,
  setup(props) {

    const prefixCls = 't-dropDown'
    const state = reactive({
      currentVisible: props.visible,
      timeout: 0
    })
    onMounted(() => {
      this.$on('click', (key: any) => {
        if (props.stopPropagation) { return }
        const $parent = hasParent()
        if ($parent) { $parent.$emit('click', key) }
      })

      this.$on('hover-click', () => {
        const $parent = hasParent()
        if ($parent) {
          this.$nextTick(() => {
            if (props.trigger === 'custom') { return false }
            state.currentVisible = false
          })
          $parent.$emit('hover-click')
        } else {
          this.$nextTick(() => {
            if (props.trigger === 'custom') { return false }
            state.currentVisible = false
          })
        }
      })

      this.$on('on-haschild-click', () => {
        this.$nextTick(() => {
          if (props.trigger === 'custom') { return false }
          state.currentVisible = true
        })
        const $parent = hasParent()
        if ($parent) { $parent.$emit('on-haschild-click') }
      })
    })

    watch(() => props.visible, (val) => { state.currentVisible = val })
    watch(() => state.currentVisible, (val) => {
      // val
      //   ? (this.$refs.drop as any).update()
      //   : (this.$refs.drop as any).destroy()
      // this.$emit('visible-change', val)
    })

    const transition = computed1(() => {
      return ['bottom-start', 'bottom', 'bottom-end'].indexOf(props.placement!) > -1
        ? 'slide-up'
        : 'fade'
    })

    const dropdownCls = computed1(() => ({
      [prefixCls + '-transfer']: props.transfer,
      [props.transferClassName!]: props.transferClassName
    }))

    const relClasses = computed1(() => ([`${prefixCls}-rel`, {
      [`${prefixCls}-rel-user-select-none`]: props.trigger === 'contextMenu'
    }]))

    const handleClick = () => {
      if (props.trigger === 'custom') { return false }
      if (props.trigger !== 'click') {
        return false
      }
      state.currentVisible = !state.currentVisible
    }
    const handleRightClick = (e: Event) => {
      e.preventDefault()
      if (props.trigger === 'custom') { return false }
      if (props.trigger !== 'contextMenu') {
        return false
      }
      state.currentVisible = !state.currentVisible
    }
    const handleMouseenter = () => {
      if (props.trigger === 'custom') { return false }
      if (props.trigger !== 'hover') {
        return false
      }
      console.log('handleMouseenter');
      if (state.timeout) { clearTimeout(state.timeout) }
      state.timeout = setTimeout(() => {
        state.currentVisible = true
      }, 250)
    }
    const handleMouseleave = () => {
      if (props.trigger === 'custom') { return false }
      if (props.trigger !== 'hover') {
        return false
      }
      if (state.timeout) {
        clearTimeout(state.timeout)
        state.timeout = setTimeout(() => {
          state.currentVisible = false
        }, 150)
      }
    }
    const onClickoutside = (e: any) => {
      handleClose()
      handleRightClose()
      if (state.currentVisible) { this.$emit('clickoutside', e) }
    }
    const handleClose = () => {
      if (props.trigger === 'custom') { return false }
      if (props.trigger !== 'click') {
        return false
      }
      state.currentVisible = false
    }
    const handleRightClose = () => {
      if (props.trigger === 'custom') { return false }
      if (props.trigger !== 'contextMenu') {
        return false
      }
      state.currentVisible = false
    }
    const hasParent = () => {
      const $parent = findComponentUpward(this, 'Dropdown')
      if ($parent) {
        return $parent
      } else {
        return false
      }
    }

    return () => (
      <div
        class={[prefixCls]}
        onMouseenter={handleMouseenter}
        onmouseleave={handleMouseleave}>
        <div
          ref='reference'
          class={relClasses.value}
          on-click={handleClick}
          on-contextmenu={handleRightClick}>
          {this.$slots.default}
        </div>
        {/* <transition name='transition-drop'> */}
          <div v-show={state.currentVisible}>
            {this.$slots.overlay}
          </div>
        {/* </transition> */}
      </div>
    )
  }
})

export default DropDown
