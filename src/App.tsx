import Button from './components/button';
import Input from './components/input/Input';
import { createComponent, reactive, useDefaultProps } from './createComponent';
import { useToggle } from './use';



export default createComponent((props) => {
  useDefaultProps({
    name: 1
  })

  const state = reactive({ age: 1 })

  const log = () => { state.age++ }

  const [v1, toggle] = useToggle()

  return (h) => (
    <div id='app' style='margin:40px' >
      <Button onClick={toggle} type='error' >success</Button>
      <Input v-model={state.age} />
      {v1.value ? 111 : 2222}
    </div>
  )
}) as any;


