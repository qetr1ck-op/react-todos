import React from 'react'

interface Props {
  isAllChecked: boolean
  checkAll(): void
}

export const TodoCheckAll = ({ isAllChecked, checkAll }: Props) => (
  <input type="checkbox" checked={isAllChecked} onChange={checkAll} />
)
