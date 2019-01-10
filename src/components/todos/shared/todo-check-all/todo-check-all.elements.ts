import styled from '@emotion/styled'

export const Checkbox = styled.input({
  position: 'absolute',
  visibility: 'hidden',
  '& + label': {
    position: 'absolute',
    top: '20px',
  },
  '& + label:before': {
    content: '"❯"',
    fontSize: '22px',
    color: '#e6e6e6',
    padding: '10px 27px 10px 27px',
  },
  '&:checked + label:before': {
    color: '#808080',
  },
})

export const Label = styled.label({})