import { createComponent, reactive, useDefaultProps, computed } from './createComponent';
import Button from '../package/components/button';
import Input from '../package/components/input';
import Icon from '../package/components/icon';
import { useToggle } from './use';
import Card from '../package/components/card';
import Main from './Test.md';

interface Dprops {
  age: number
  name?: string
}

const ApiDeom = createComponent<Dprops>((props, vm) => {
  useDefaultProps({
    name: 'zcc'
  })
  const getter = computed({
    age: () => props.age + 1
  })

  return (h) => (
    <div>
      <Icon type='ios-add-circle' />
      <Main />
      <h1> defaultProps : {props.name} </h1>
      <h1> props : {props.age} </h1>
      <h1> getter : {getter.age} </h1>
    </div>
  )
})
export default createComponent((props) => {

  const state = reactive({
    age: 1,
    type: 'error'
  })

  const add = () => { state.age++ }
  const [show, toggle] = useToggle()

  return (h) => (
    <div style='padding:40px;background:#ccc;width:100vw;height:100vh' id='app'>
      <Card title={<a>111</a>} extra={<a>222</a>}  >
        <Button
          onClick={toggle}
          type='success'
          style='display:block;margin:10px' >
          toggle Loading
        </Button>
        <Button
          loading={show.value}
          onClick={add}
          style='display:block;margin:10px'
          type='error'>
        </Button>



        <ApiDeom age={1} name='name' />
        <Input prefix='md-open' v-model={state.age} style='width:200px' />
      </Card>
    </div>
  )
}) as any;


