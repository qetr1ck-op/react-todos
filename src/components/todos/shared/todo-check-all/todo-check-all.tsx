import React from 'react'
import { Input, Label } from './todo-check-all.elements'

interface Props {
  isAllChecked: boolean
  checkAll(): void
}

export const TodoCheckAll = ({ isAllChecked, checkAll }: Props) => (
  <>
    <Input id="check-all" type="checkbox" checked={isAllChecked} onChange={checkAll} />
    <Label htmlFor="check-all" />
  </>
)
