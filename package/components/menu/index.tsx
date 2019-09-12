import { createComponent, reactive, watch, computed1 } from '@/createComponent';
import { MenuProps, MenuEvent } from './type';

export const menuProps = {
  mode: { type: String, default: 'vertical' },
  theme: { type: String, default: 'light' },
  activeName: { type: [String, Number] },
  openNames: { type: Array, default: () => ([]) },
  accordion: { type: Boolean, default: false },
  width: { type: String, default: '240px' }
}

const Menu = createComponent<MenuProps, MenuEvent>({
  setup(props) {
    const prefixCls = 't-menu';

    const state = reactive({
      currentKey: props.activeName,
      openKeys: []
    })

    const classs = computed1(() => {
      // tslint:disable-next-line:prefer-const
      let { theme, mode } = props
      if (mode === 'vertical' && theme === 'primary') {
        theme = 'light'
      }

      return [
        `${prefixCls}`,
        `${prefixCls}-${theme}`,
        {
          [`${prefixCls}-${mode}`]: mode
        }
      ];
    })
    return () => (
      <ul class={classs.value} style={{ width: props.width }} >
        {this.$slots.default}
      </ul>
    )
  }
})

export default Menu
