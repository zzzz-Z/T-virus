import './index.less'
import Type from './type.md';
import Api from './api.md';
import { useToggle } from '@/use';
import { Button, createComponent } from '@/ui';

export const ButtonDemo = createComponent((props, vm) => {
  const [loading, toggle] = useToggle()

  return (h) => (
    <div id='button'>
      <code-box title='按钮类型' >
        <div slot='top'>
          <Button type='dashed'>dashed</Button>
          <Button type='success'>success</Button>
          <Button type='default'>default</Button>
          <Button type='error'>error</Button>
          <Button type='info'>info</Button>
          <Button type='primary'>primary</Button>
          <Button type='text'>text</Button>
          <Button type='warning'>warning</Button>
          <Button disabled={true} >disabled</Button>
          <Button type='success' on={{ click: toggle }} >toggle</Button>
          <transition name='transition-drop'>
            {loading.value && <Button shape='circle' type='success' icon='user' />}
          </transition>
          <Button type='success' loading={loading.value} >
            loading
          </Button>
          <Button shape='circle' type='success' icon='user' />
        </div>
        <div slot='mid'>按钮有多种种类型</div>
        <div slot='bottom'>
          <Type />
        </div>
      </code-box>
      <Api />
    </div>
  )
})

