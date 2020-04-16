import { defineComponent, h, reactive, watch, getCurrentInstance, provide, ComponentInternalInstance } from 'vue';
import { FormItemInstance } from './formItem';

export interface FormProps {
  model: Record<string, any>
  rules?: Record<any, any>
  inline?: boolean
  disabled?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string
  labelSuffix?: string
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  size?: 'large' | 'medium' | 'small' | 'mini'
}

export interface FormInstance extends ComponentInternalInstance {
  formItems: FormItemInstance[]
  resetFields(): void
  validate(cb?: (isValid: boolean, invalidFields: object) => void): void
  validateField(prop: string, callback: () => void): void
}

export const formInjectKey = Symbol('Form')

export default defineComponent({
  name: 'VForm',
  props: {
    model: { type: Object, required: true },
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: { type: String, default: '' },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: { type: Boolean, default: true },
    size: String,
    disabled: Boolean,
    validateOnRuleChange: { type: Boolean, default: true },
    hideRequiredAsterisk: { type: Boolean, default: false }
  } as any,
  setup(props: FormProps, { slots }) {
    const formItems = reactive<FormItemInstance[]>([])
    const instance = getCurrentInstance() as FormInstance
    instance.formItems = formItems
    instance.validate = validate
    instance.validateField = validateField
    instance.resetFields = resetFields
    instance.sink = {
      formItems,
      validate,
      validateField,
      resetFields
    }
    provide(formInjectKey, instance)

    watch(() => props.rules as any, validate)

    function resetFields() {
      formItems.forEach(menuIem => menuIem.resetField())
    }

    function clearValidate(props: any[] | string = []) {
      const items = props.length
        ? (typeof props === 'string'
          ? formItems.filter(v => props === v.propsProxy?.prop)
          : formItems.filter(v => props.indexOf(v.propsProxy?.prop) > -1)
        ) : formItems;
      items.forEach(v => v.clearValidate())
    }

    function validate(callback: any) {
      let valid = true
      let count = 0
      if (formItems.length === 0 && callback) {
        callback(true);
      }
      formItems.forEach(field => {
        field.validate('', errors => {
          if (errors) {
            valid = false
          }
          if (typeof callback === 'function' && (++count) === formItems.length) {
            callback(valid)
          }
        })
      })
    }

    function validateField(prop: string, callback: () => void) {
      const field = formItems.filter(formItem => formItem.propsProxy?.prop === prop)[0]

      if (!field) {
        throw new Error('Must call validateField with valid prop string!')
      }

      field.validate('', callback)
    }

    return () => h('form', {
      class: ['v-form', {
        ['v-form--label-' + props.labelPosition]: props.labelPosition,
        'v-form--inline': props.inline
      }]
    }, slots.default?.()
    )
  }
})