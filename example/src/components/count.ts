import { defineComponent, ref, computed, watch } from 'vue'

export const Count = defineComponent({
	template: `
	<button @click="count += 1">Increment Count</button>
	<button @click="count -= 1">Decrement Count</button>
	<div>Count: {{ count }}</div>
	<div>Double Count: {{ doubleCount }}</div>
	`,
	setup() {
		const count = ref(1)
		const doubleCount = computed(() => count.value * 2)

		watch(() => console.log(count.value))

		return { count, doubleCount }
	}
})