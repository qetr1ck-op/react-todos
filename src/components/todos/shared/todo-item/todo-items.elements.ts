import styled from '@emotion/styled'

export const DeleteBtn = styled.button`
  display: none;
  position: absolute;
  top: 15px;
  right: 20px;
  color: #e6a8a8;
  cursor: pointer;

  &:after {
    content: '×';
  }
`

export const ItemBox = styled.div`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  word-break: break-all;
  line-height: 1.2;
  transition: color 0.4s;

  &:hover ${DeleteBtn} {
    display: block;
  }
`
interface ItemInfo {
  done: boolean
}
export const ItemInfoBox = styled.div<ItemInfo>`
  padding: 15px 15px 15px 60px;
  text-decoration: ${({ done }: ItemInfo) => (done ? 'line-through' : 'none')};
  opacity: ${({ done }: ItemInfo) => (done ? '.4' : '1')};
`

export const Checkbox = styled.input`
  position: absolute;
  display: none;

  & + label {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iLTEwIC0xOCAxMDAgMTM1Ij48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWRlZGVkIiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }

  &:checked + label {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iLTEwIC0xOCAxMDAgMTM1Ij48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYmRkYWQ1IiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBmaWxsPSIjNWRjMmFmIiBkPSJNNzIgMjVMNDIgNzEgMjcgNTZsLTQgNCAyMCAyMCAzNC01MnoiLz48L3N2Zz4=);
  }
`
