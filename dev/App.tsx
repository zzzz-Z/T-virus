import { Button, Input } from 'magi-ui'
import { createComponent, ref, h } from 'vue3'

export default createComponent(() => {
  const loading = ref(false)
  const value = ref(1)
  function cl() {
    loading.value = !loading.value
    console.log(value)
    // value.value += 1
  }
  return () =>
    h('div', { style: { padding: '50px' } }, [
      h(Input, {
        value: value.value,
        onChange: e => {
          ''
        }
      }),
      h(
        Button,
        { class: 'zzz', type: 'primary', icon: 'user', onClick: cl },
        () => 'button'
      ),
      h(Button, { type: 'primary', loading: loading.value }, () => 'button')
    ])
})
