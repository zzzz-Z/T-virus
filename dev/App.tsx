import { Button, Input, Menu, MenuItem } from 'ui'
import { defineComponent, h, onMounted, getCurrentInstance } from 'next-vue'
export default defineComponent(() => {
  const vm = getCurrentInstance()

  onMounted(() => {
    console.log(0 ?? vm)
  })
 
  return () => {
    return h('div', { style: { padding: '50px' } }, [
      h(
        Menu,
        { mode: 'vertical', activeName: 'zcc' },
        {
          default: () => [
            h(MenuItem, { name: 'zcc' }, 'zcc'),
            h(MenuItem, { name: 'zcc1' }, 'zcc1'),
            h(MenuItem, { name: 'zcc2' }, 'zcc2'),
            h(MenuItem, { name: 'zcc3' }, 'zcc3')
          ]
        }
      )
    ])
  }
})
