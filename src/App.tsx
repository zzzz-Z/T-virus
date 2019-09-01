import { createComponent, reactive, useDefaultProps, watch, computed, onCreated } from './createComponent';
import Button from './components/button';
import Input from './components/input';
import Icon from './components/icon';
import { useToggle } from './use';
import Card from './components/card';
interface Dprops {
  age: number
  name?: string
}


const ApiDeom = createComponent<Dprops>((props, vm) => {
  useDefaultProps({
    name: 'zcc'
  })
  watch(() => props.age, (vl) => {
    // tslint:disable-next-line:no-console
    console.log(`props.age is (${vl})  and getter.age is (${getter.age})`);
  })
  const getter = computed({
    age: () => props.age + 1
  })

  return (h) => (
    <div>
      <Icon type='ios-add-circle' />
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
  const changeType = () => state.type = ''
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
          // icon='folder-add'
          style='display:block;margin:10px'
          type='error' />
        <ApiDeom age={state.age} />
        <Input prefix='md-open' v-model={state.age} style='width:200px' />
      </Card>
    </div>
  )
}) as any;


