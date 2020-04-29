import { h } from 'vue'
import { Menu, MenuItem } from 'packages'
import { SubMenu } from 'packages/menu'

export const menuDeom = () => {
  return h(
    Menu,
    {
      onVnodeMounted: (el) => {
        console.log(el)
      },
      inlineCollapsed: true,
      onSelect: (val) => {},
    },
    () => [
      h(SubMenu, { title: '1' }, () => [
        h(MenuItem, { name: '2' }, () => 2),
        h(MenuItem, { name: '3' }, () => 3),
      ]),
      h(SubMenu, { title: '4' }, () => [
        h(MenuItem, { name: '5' }, () => 5),
        h(MenuItem, { name: '6' }, () => 6),
      ]),
      h(MenuItem, { name: '7' }, () => 7),
      h(MenuItem, { name: '8' }, () => 8),
    ]
  )
}
