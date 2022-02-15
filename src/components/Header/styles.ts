import styled, { css } from 'styled-components'

export const HeaderWrapper = styled.header`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    height: 6.5rem;
    display: flex;
    align-items: center;

    padding: 2rem 4rem;
    border-bottom: 1px solid ${theme.colors.gray100};

    ${Description} {
      margin-left: 2rem;
      padding: 0.25rem 0 0.25rem 2rem;
      border-left: 1px solid ${theme.colors.gray100};
      color: ${theme.colors.gray800};
    }

    ${DateDescription} {
      margin-left: auto;
      text-transform: capitalize;
      color: ${theme.colors.gray800};
    }
  `}
`

export const Description = styled.p``
export const DateDescription = styled.span``
