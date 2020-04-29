import { inject, getCurrentInstance } from 'vue'
import { formItemInjectKey, FormItemInstance } from 'packages/form/formItem'
import { formInjectKey, FormInstance } from 'packages/form/form'
/**
 *
 */
export default function useForm() {
  const formItem = inject<FormItemInstance>(formItemInjectKey)
  const form = inject<FormInstance>(formInjectKey)
  const emit = getCurrentInstance()?.emit
  /**
   * 同时触发组件emit 与formitem
   * @param event
   * @param arg
   */
  const _emit = (event: string, ...arg: any[]) => {
    emit?.(event, arg)
    switch (event) {
      case 'change':
        formItem?.onFieldChange()
        break

      case 'blur':
        formItem?.onFieldBlur()
        break
      default:
        break
    }
  }
  return { formItem, form, _emit }
}
