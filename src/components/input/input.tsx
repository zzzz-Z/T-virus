import { InputEvent, InputProps, inputProps } from './type';
import { createComponent, reactive, watch } from '@/createComponent';

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
    const classs = [
      `${prefixCls}`,
      {
        [`${prefixCls}-${props.size}`]: !!props.size,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-with-prefix`]: state.showPrefix,
        [`${prefixCls}-with-suffix`]: state.showSuffix || (props.search && props.enterButton === false)
      }
    ];

    return () => (
      <input
        id={props.elementId}
        autocomplete={props.autocomplete}
        spellcheck={props.spellcheck}
        ref='input'
        type={props.type}
        class={classs}
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
      />
    )
  }
})
