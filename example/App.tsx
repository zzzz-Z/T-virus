//@ts-ignore
import { h, ref, reactive, getCurrentInstance, watch, onMounted, defineComponent } from 'vue'
import { Menu, MenuItem, Form, FormItem, Input, Button, Select, Option } from 'packages'
import SubMenu from 'packages/menu/submenu'
import { FormInstance } from 'packages/form/form'

const state = reactive({ m: 'zcc', x: '222' })
export default defineComponent({
  setup() {
    const form = ref<FormInstance | null>(null)
    const input = ref<FormInstance | null>(null)
    const renderForm = () => {
      return h(Form, { ref: form, inline: false, model: state }, () => [
        h(FormItem, {
          prop: 'm', label: 'zcc', rules: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['change'] }
          ]
        }, () => h(Input, { value: state.m, onChange: val => state.m = val })),
        h(FormItem, {
          prop: 'x', label: 'sele', rules: [
            { type: 'email', message: '请输入正确的xxxx', trigger: ['change'] }
          ]
        }, () => h(Select, {
          value: state.x,
          // multiple: true,
          filterable: true,
          onChange: val => {
            state.x = val
          }
        }, () => [
            h(Option, { label: h('span', {class:'xx'},'2121') , value: '111' }),
          h(Option, { label: '222', value: '222' }),
          h(Option, { label: '333', value: '333' }),
        ]))
      ])
    }
    onMounted(() => {
      const v = getCurrentInstance()
      console.log(v);

    })
    return () => {
      return h('div', { class: ' v-container' }, [
        h(Menu, {
          inlineCollapsed: true,
          onSelect: (val) => { }
        }, () => [
          h(SubMenu, { title: '1' }, () => [
            h(MenuItem, { name: '2' }, () => 2),
            h(MenuItem, { name: '3' }, () => 3)
          ]),
          h(SubMenu, { title: '4' }, () => [
            h(MenuItem, { name: '5' }, () => 5),
            h(MenuItem, { name: '6' }, () => 6)
          ]),
          h(MenuItem, { name: '7' }, () => 7),
          h(MenuItem, { name: '8' }, () => 8),
        ]),
        renderForm(),
        h(Button, {
          ref: input,
          onClick: () => {
            form.value?.resetFields()
            form.value?.validate()
          }
        }, () => 'submit')
      ])
    }
  }
})