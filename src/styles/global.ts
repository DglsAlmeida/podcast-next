import { createGlobalStyle, css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ${({ theme }) => css`
    body {
      color: ${theme.colors.gray500};
    }

    body,
    input,
    textarea,
    button {
      font: ${theme.font.medium} 1rem ${theme.font.family};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: ${theme.font.bold};
      font-family: Lexend, sans-serif;
      color: ${theme.colors.gray800};
    }

    h1 {
      font-size: ${theme.font.sizes.xlarge};
    }

    h2 {
      font-size: 1.5rem;
    }

    button {
      cursor: pointer;
    }

    a {
      text-decoration: none;
    }
  `}
`

export default GlobalStyle
