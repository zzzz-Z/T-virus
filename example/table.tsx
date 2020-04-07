import { Table } from 'packages'
import { h } from 'vue'
import { Columns } from 'packages/table/type'

const columns: Columns[] = [
  {
    title: 'zcc', key: 'z', width: 300, align: 'center',
    render: ({ val }) => h('span', val + 1111)
  },
  { title: 'sss', key: 's' },
  { title: 'ddd', key: 'd' },
]
const data = [
  { z: 1, s: 2, d: 3 },
  { z: 1, s: 2, d: 3 },
  { z: 1, s: 2, d: 3 },
]

export const tableDemo = () => {
  return h(Table, {
    columns: columns,
    data: data
  })
}