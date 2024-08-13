import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import type { schema } from '@sunlight/db'
import DataTableColumnHeader from '@/components/datatable/ColumnHeader.vue'
import DataTableRowActions from '@/components/datatable/RowActions.vue'
import { Checkbox } from '@/components/uia/checkbox'

export const searchable = 'ssid'

export const columns: ColumnDef<schema.Network>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'ID' }),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('id')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ssid',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'SSID' }),

    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('ssid')),
      ])
    },
  },
  {
    accessorKey: 'password',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Password' }),

    cell: ({ row }) => {
      const pass = row.getValue('password')

      return h('div', { class: 'flex w-[100px] items-center' }, [
        pass ? h('span', pass) : h('span', { class: 'text-muted-foreground' }, 'Unsecured')
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]