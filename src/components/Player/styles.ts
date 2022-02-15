import styled, { css } from 'styled-components'

export const PlayerWrapper = styled.div`
  ${({ theme }) => css`
    padding: 3rem 4rem;
    width: 26.5rem;
    height: 100vh;

    background: ${theme.colors.purple500};
    color: ${theme.colors.white};

    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`
export const HeaderDescription = styled.strong``
export const EmptyDescription = styled.strong``

export const PlayerHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 16px;

    ${HeaderDescription}, ${EmptyDescription} {
      font-family: Lexend, sans-serif;
      font-weight: ${theme.font.bold};
    }
  `}
`

export const EmptyPlayer = styled.div`
  ${({ theme }) => css`
      margin: auto auto;
      width: 100%;
      height: 20rem;
      border: 1.5px dashed ${theme.colors.purple300};
      border-radius: 1.5rem;
      background: linear-gradient(143.8deg, rgba(145, 100, 258, 0.8) 0%, rgba(0, 0, 0, 0) 100%);

      padding: 4rem;
      text-align: center;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`

export const PlayerFooter = styled.footer`
  width: 100%;
  align-self: stretch;

  opacity: 0.5;
`
export const StartTime = styled.span``
export const EndTime = styled.span``

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  ${StartTime}, ${EndTime} {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }
`

export const Slider = styled.div`
  flex: 1;
`

export const EmptySlider = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 4px;
    background: ${theme.colors.white};
    border-radius: 2px;
  `}
`

export const ButtonsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2.5rem;
    gap: 1.5rem;

    button {
      font-size: 0;

      &:nth-child(3) {
        width: 4rem;
        height: 4rem;
        border-radius: 1rem;
        background: ${theme.colors.purple400};
      }
    }
  `}
`
