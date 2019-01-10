import styled from '@emotion/styled'

interface Props {
  showEditingMode?: boolean
}

export const Input = styled.input<Props>(
  {
    width: '100%',
    padding: '16px 16px 16px 60px',
    fontSize: '24px',
    fontStyle: 'italic',
    border: 'none',
    background: 'rgba(0, 0, 0, 0.003)',
    boxShadow: 'inset 0 -2px 1px rgba(0, 0, 0, 0.03)',
    '&::placeholder': {
      color: 'darkgrey',
      opacity: 0.5,
      fontWeight: 100,
    },
  },
  ({ showEditingMode }) => {
    if (showEditingMode) {
      return {
        border: '1px solid #cac5c5',
        fontStyle: 'normal',
        fontWeight: 200,
      }
    }
    return {}
  },
)

