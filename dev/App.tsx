import { Button, Input } from 'magi-ui'
import { createComponent, ref, h } from 'vue3';


export default createComponent(() => {
  const loading = ref(false)
  function cl() {
    loading.value = !loading.value
  }

  return () =>
    h('div', { style: { padding: '50px' } }, [
      h(Input, {
        onInput(e) {
          console.log(e)
        }
      }),
      h(Button, { class: 'zzz', type: 'primary', icon: 'user', onClick: cl }, () => 'button'),
      h(Button, { type: 'primary', loading: loading.value }, () => 'button')
    ])
})
