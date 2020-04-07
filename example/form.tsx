import { h, reactive } from 'vue'
import { Form, FormItem, Input, Select, Option } from 'packages'
const state = reactive({ m: 'zcc', x: '222' })

export const renderForm = () => {
  return h(Form, { inline: false, model: state }, () => [
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
      onChange: (val: any) => {
        state.x = val
      }
    }, () => [
      h(Option, { label: h('span', { class: 'xx' }, '2121'), value: '111' }),
      h(Option, { label: '222', value: '222' }),
      h(Option, { label: '333', value: '333' }),
    ]))
  ])
}