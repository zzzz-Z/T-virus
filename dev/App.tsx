import { Button, Input, Menu, MenuItem } from 'ui'
import { createComponent, h, onMounted, getCurrentInstance } from 'vue3'

export default createComponent(() => {
  onMounted(() => {
    console.log(getCurrentInstance())
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
