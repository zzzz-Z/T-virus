import { provide, reactive } from 'next-vue'

export default function getChilds<C>(name: string, methods = {}) {
  const childs: C[] = reactive([])
  provide(name, { ...methods, childs })

  return childs
}
