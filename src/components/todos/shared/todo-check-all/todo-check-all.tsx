import React from 'react'
import { Checkbox, Label } from './todo-check-all.elements'

interface Props {
  isAllChecked: boolean
  checkAll(): void
}

export const TodoCheckAll = ({ isAllChecked, checkAll }: Props) => (
  <>
    <Checkbox id="check-all" type="checkbox" checked={isAllChecked} onChange={checkAll} />
    <Label htmlFor="check-all" />
  </>
)
