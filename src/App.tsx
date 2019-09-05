import { createComponent, reactive, useDefaultProps, computed } from './createComponent';
import Button from '../package/components/button';
import Input from '../package/components/input';
import { useToggle } from './use';
import Card from '../package/components/card';
import Main from './Test.md';

interface Dprops {
  age: number
  name?: boolean
}

const ApiDeom = createComponent<Dprops>((props, vm) => {
  useDefaultProps({
    name: 'zcc',
    age: 2
  })
  const getter = computed({
    age1: () => props.age + 1
  })

  return (h) => (
    <div>
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
          icon='user'
          onClick={add}
          style='display:block;margin:10px'
          type='error'>
        </Button>
        <ApiDeom age={state.age} name={show.value} />
        <Input prefix='md-open' v-model={state.age} style='width:200px' />
      </Card>
    </div>
  )
}) as any;


