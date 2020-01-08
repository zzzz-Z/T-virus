import { provide, reactive } from 'vue'

export default function getChilds<C>(name: string, methods = {}) {
  const childs: C[] = reactive([])
  provide(name, { ...methods, childs })

  return childs
}
