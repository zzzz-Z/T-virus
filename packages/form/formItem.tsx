import {
  defineComponent,
  reactive,
  watch,
  inject,
  ComponentInternalInstance,
  computed,
  onMounted,
  getCurrentInstance,
  onUnmounted,
  h,
  Transition,
  provide,
} from 'vue'
import { FormInstance, FormProps, formInjectKey } from './form'
import AsyncValidator from 'async-validator'
import { getPropByPath, noop } from 'packages/utils/util'
import { Data } from 'packages/interface'

export interface FormItemInstance extends ComponentInternalInstance {
  validate(field: string, cb?: (errors: Data) => void): void
  resetField(): void
  clearValidate(): void
  onFieldChange(): void
  onFieldBlur(): void
}
export const formItemInjectKey = Symbol('FormItem')

export default defineComponent({
  name: 'VFormItem',
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: { type: Boolean, default: undefined },
    rules: [Object, Array],
    error: String,
    validateState: String,
    for: String,
    inlineMessage: { type: [String, Boolean], default: '' },
    showMessage: { type: Boolean, default: true },
    size: String,
  },
  setup(props, { slots }) {
    const prefix = (str = '') => 'v-form-item' + str
    const formInstance = inject<FormInstance>(formInjectKey)
    const formProps = (formInstance?.propsProxy as any) as FormProps
    const instance = getCurrentInstance() as FormItemInstance
    instance.validate = validate
    instance.resetField = resetField
    instance.onFieldBlur = onFieldBlur
    instance.onFieldChange = onFieldChange
    provide(formItemInjectKey, instance)
    let initialValue: string | any[] = ''
    const state = reactive({
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false,
      computedLabelWidth: '',
      labelFor: computed(() => props.for || props.prop),
      size: computed(() => formProps.size || props.size),
      labelStyles: computed(() => {
        const style: Record<string, any> = {}
        const labelWidth = props.labelWidth || formProps.labelWidth
        if (labelWidth) {
          style.width = `${labelWidth}px`
        }
        return style
      }),
      contentStyles: computed(() => {
        const style: Record<string, any> = {}
        const { label } = props
        const { labelPosition, inline } = formProps
        if (labelPosition === 'top' || inline) return style
        if (!label && !props.labelWidth && state.isNested) return style
        const labelWidth = props.labelWidth || formProps.labelWidth
        if (labelWidth === 'auto') {
          if (props.labelWidth === 'auto') {
            style.marginLeft = state.computedLabelWidth
          } else if (formProps.labelWidth === 'auto') {
            // style.marginLeft = formProps.autoLabelWidth;
          }
        } else {
          style.marginLeft = labelWidth
        }
        return style
      }),
      fieldValue: computed(() => {
        const model = formProps.model
        if (!model || !props.prop) {
          return
        }

        let path = props.prop
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.')
        }

        return getPropByPath(model, path, true).v
      }),
      isRequired: computed(() => {
        let rules = getRules()
        let isRequired = false

        if (rules && rules.length) {
          rules.every((rule) => {
            if (rule.required) {
              isRequired = true
              return false
            }
            return true
          })
        }
        return isRequired
      }),
    })

    onMounted(() => {
      formInstance?.formItems.push(instance)
      initialValue = state.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = ([] as any[]).concat(initialValue)
      }
    })
    onUnmounted(() => {
      const index = formInstance?.formItems.findIndex((v) => v == instance)!
      formInstance?.formItems.splice(index, 1)
    })

    watch(
      () => props.error,
      (val) => {
        state.validateMessage = val!
        state.validateState = val ? 'error' : ''
      },
      { immediate: true }
    )
    watch(
      () => props.validateState,
      (val) => {
        state.validateState = val!
      }
    )

    function getRules(): any[] {
      let formRules = formProps.rules
      const { rules, required, prop } = props
      const requiredRule: any = required !== undefined ? { required: !!required } : []
      const _prop = getPropByPath(formRules!, props.prop || '')
      formRules = formRules ? _prop.o[prop || ''] || _prop.v : []

      return [].concat(rules || formRules || []).concat(requiredRule)
    }

    function getFilteredRule(trigger: string) {
      const rules = getRules()

      return rules.filter((rule) => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      })
    }

    function validate(trigger: string, callback = noop) {
      state.validateDisabled = false
      const rules = getFilteredRule(trigger)

      if (!rules || (rules.length === 0 && props.required === undefined)) {
        callback()
        return true
      }
      state.validateState = 'validating'

      const descriptor: Data = {}
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          delete rule.trigger
        })
      }
      descriptor[props.prop!] = rules

      const validator = new AsyncValidator(descriptor)
      const model: Data = {}

      model[props.prop!] = state.fieldValue

      validator.validate(model, { firstFields: true }, (errors) => {
        state.validateState = errors ? 'error' : 'success'
        state.validateMessage = errors ? errors[0].message : ''
        callback(state.validateMessage)
        formInstance?.emit?.('validate', props.prop, !errors, state.validateMessage || null)
      })
    }
    // function clearValidate() {
    //   state.validateState = '';
    //   state.validateMessage = '';
    //   state.validateDisabled = false;
    // }
    function resetField() {
      state.validateState = ''
      state.validateMessage = ''

      const model = formProps.model
      const value = state.fieldValue
      let path = props.prop
      if (path) {
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.')
        }
        const prop = getPropByPath(model, path, true)
        state.validateDisabled = true

        if (Array.isArray(value)) {
          prop.o[prop.k] = ([] as any[]).concat(initialValue)
        } else {
          prop.o[prop.k] = initialValue
        }
      }
    }

    function onFieldBlur() {
      validate('blur')
    }

    function onFieldChange() {
      if (state.validateDisabled) {
        state.validateDisabled = false
        return
      }
      validate('change')
    }

    // function updateComputedLabelWidth(width: string | number) {
    //   state.computedLabelWidth = width ? `${width}px` : '';
    // }

    return () => {
      const { isRequired, validateMessage, validateState, labelStyles, contentStyles } = state
      const labelAttrs = {
        for: state.labelFor,
        class: prefix('__label'),
        style: labelStyles,
      }
      const label =
        props.label || slots.label ? h('label', labelAttrs, props.label || slots.label?.()) : null
      const contentAttrs = { class: prefix('__content'), style: contentStyles }
      const showErrorTip = validateState === 'error' && props.showMessage && formProps.showMessage
      const error =
        showErrorTip &&
        h(
          'div',
          {
            class: [
              prefix('__error'),
              {
                [prefix('__error--inline')]:
                  typeof props.inlineMessage === 'boolean'
                    ? props.inlineMessage
                    : formProps.inlineMessage,
              },
            ],
          },
          validateMessage
        )

      const content = h('div', contentAttrs, [
        slots.default?.(),
        h(Transition, { name: 'fade' }, () => error),
      ])

      const classs = [
        prefix(),
        {
          'v-form-item--feedback': formProps?.statusIcon,
          'is-error': validateState === 'error',
          'is-validating': validateState === 'validating',
          'is-success': validateState === 'success',
          'is-required': isRequired || props.required,
          'is-no-asterisk': formProps?.hideRequiredAsterisk,
        },
      ]
      return h('div', { class: classs }, [label, content])
    }
  },
})
