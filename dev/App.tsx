import { Button, Input } from "ui";
import { createComponent, ref, h, getCurrentInstance, watch } from "vue3";

export default createComponent(() => {
  const count = ref(1);
  watch(
    () => count.value,
    val => {
      console.log(val);
    }
  );
  return () => h(Test, { onClick: () => count.value++ });
});

const div = ref(null);
const Test = {
  props: {},
  setup() {
    return () =>
      h("div", [h("div", { ref: div }, "div1"), h("div", "div2"), h(Input)]);
  }
};
