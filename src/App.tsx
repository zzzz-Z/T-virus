import Button from './components/button';
import Input from './components/input/Input';
import { createComponent, reactive, useDefaultProps, watch, computed } from './createComponent';
import { useToggle } from './use';
interface Dprops {
  age: number
  name?: string
}

const ApiDeom = createComponent<Dprops>((props) => {
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
      <h1> defaultProps : {props.name} </h1>
      <h1> props : {props.age} </h1>
      <h1> getter : {getter.age} </h1>
   </div>
  )
})

export default createComponent((props) => {


  const state = reactive({ age: 1 })

  const add = () => { state.age++ }

  const [show, toggle] = useToggle()

  return (h) => (
    <div id='app' style='margin:40px' >
      <Button onClick={add} type='error' >add.props.age</Button>
      <ApiDeom age={state.age} />
      <Input v-model={state.age} style='width:200px' />
      <Button onClick={toggle} type='success' style='display:block' >toggle</Button>
      <h1> {show.value ? 'show' : 'hidden'} </h1>
    </div>
  )
}) as any;


