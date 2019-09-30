import { InputEvent, InputProps } from './type';
import { createComponent, reactive, watch } from '../../packages/createComponent';

export const inputProps = {
  type: { type: String, default: 'text' },
  value: { type: [String, Number], default: '' },
  size: { type: String, default: 'default' },
  placeholder: { type: String, default: '' },
  maxlength: { type: Number },
  disabled: { type: Boolean, default: false },
  icon: String,
  autosize: { type: [Boolean, Object], default: false },
  rows: { type: Number, default: 2 },
  readonly: { type: Boolean, default: false },
  name: String,
  number: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  spellcheck: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  clearable: { type: Boolean, default: false },
  elementId: { type: String },
  wrap: { type: String, default: 'soft' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  search: { type: Boolean, default: false },
  enterButton: { type: [Boolean, String], default: false }
}

export default createComponent<InputProps, InputEvent>({
  name: 't-input',
  props: inputProps,
  setup(props) {
    const prefixCls = 't-input'
    const state = reactive({
      currentValue: props.value,
      prepend: true,
      append: true,
      slotReady: false,
      textareaStyles: {},
      showPrefix: false,
      showSuffix: false,
      isOnComposition: false
    })
    watch(() => props.value, (vl) => setCurrentVl(vl))

    const emitEvent = (name: string) => (e: any) => {
      this.$emit(name, e)
    }

    const setCurrentVl = (vl: any) => {
      // tslint:disable-next-line:no-console
      if (props.value === state.currentValue) { return }
      state.currentValue = vl
    }

    const handleInput = (e: any) => {
      if (state.isOnComposition) { return; }
      let vl = e.target.value
      if (props.number && vl !== '') {
        vl = Number.isNaN(Number(vl)) ? vl : Number(vl);
      }

      this.$emit('input', vl)
      setCurrentVl(vl)
      this.$emit('change', e)
    }

    const handleComposition = (event: any) => {
      if (event.type === 'compositionstart') {
        state.isOnComposition = true;
      }
      if (event.type === 'compositionend') {
        state.isOnComposition = false;
        handleInput(event);
      }
    }

    return () => (
      <input
        id={props.elementId}
        autocomplete={props.autocomplete}
        spellcheck={props.spellcheck}
        ref='input'
        type={props.type}
        placeholder={props.placeholder}
        maxlength={props.maxlength}
        readonly={props.readonly}
        name={props.name}
        value={props.value}
        number={props.number}
        disabled={props.disabled}
        autofocus={props.autofocus}
        onCompositionstart={handleComposition}
        onCompositionupdate={handleComposition}
        onCompositionend={handleComposition}
        onInput={handleInput}
        on-keyup-enter={emitEvent('enter')}
        on-keyup={emitEvent('keyup')}
        on-keydown={emitEvent('keydown')}
        on-keypress={emitEvent('keypress')}
        onFocus={emitEvent('focus')}
        onBlur={emitEvent('blur')}
        onChange={emitEvent('change')}
        class={[
          `${prefixCls}`,
          {
            [`${prefixCls}-${props.size}`]: !!props.size,
            [`${prefixCls}-disabled`]: props.disabled,
            [`${prefixCls}-with-prefix`]: state.showPrefix,
            [`${prefixCls}-with-suffix`]: state.showSuffix || (props.search && props.enterButton === false)
          }
        ]}
      />
    )
  }
})
