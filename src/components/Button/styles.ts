import styled, { css } from 'styled-components'

type CustomButton = {
  hasIcon: boolean
}

const wrapperModifiers = {
  color: (color: string) => css`
    background-color: ${color};
  `,

  withIcon: () => css`
    display: flex;
    align-items: center;
    justify-content: center;
  `
}

export const CustomButton = styled.button<CustomButton>`
  ${({ color }) => css`
    border: 0;
    ${color && wrapperModifiers.color(color)}
  `}
`
