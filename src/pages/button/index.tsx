import { createComponent } from '@/createComponent';
import Type from './type.md';
import './index.less'
export const ButtonDemo = createComponent((props) => {
  const Button = window.T.Button

  return (h) => (
    <div style='padding:40px;width:100vw;height:100vh' id='app'>
      <code-box title='按钮类型' >
        <div slot='top'>
          <Button type='success'> success  </Button>
          <Button type='dashed'> success  </Button>
          <Button type='default'> success  </Button>
          <Button type='error'> success  </Button>
          <Button type='info'> success  </Button>
          <Button type='primary'> success  </Button>
          <Button type='text'> success  </Button>
          <Button type='warning'> success  </Button>
        </div>
        <div slot='mid'>
          按钮有多种种类型：
        </div>
        <div slot='bottom'>
          <Type />
        </div>
      </code-box>
    </div>
  )
})

