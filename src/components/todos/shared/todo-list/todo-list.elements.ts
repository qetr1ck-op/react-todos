/*
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  opacity: 0.6;
}

.footer:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  z-index: -1;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
*/

import styled from '@emotion/styled'

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  opacity: 0.6;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    z-index: -1;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
`
