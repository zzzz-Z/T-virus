import { Table } from 'packages'
import { h, reactive } from 'vue'
import { Columns } from 'packages/table/type'

const columns: Columns[] = [
  {
    title: 'zcc', key: 'a', align: 'center', width: 300,
    render: ({ val, row }) => {
      return h('span', val)
    }
  },
  { title: 'sss', key: 'a', align: 'center', width: 200 },
  { title: 'ddd', key: 'b', align: 'center', width: 200 },
  { title: 'xxx', key: 'c', align: 'center', width: 200 },
  // { title: 'www', key: 'd', align: 'center', width: 300 },
  // { title: 'eee', key: 'e', align: 'center', width: 300 },
  // { title: 'rrr', key: 'f', align: 'center', width: 300 },
  { title: 'ttt', key: 'g', align: 'center' },
]
const data = [
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 },
]

export const tableDemo = () => {
  return h(Table, {
    height: 400,
    columns: columns,
    data: data,
    footer: () => h('div', 'zzz')
  })
}