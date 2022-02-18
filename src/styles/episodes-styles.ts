import styled, { css } from 'styled-components'

export const EpisodeWrapper = styled.div`
  max-width: 45rem;
  padding: 3rem 2rem;
  margin: 0 auto;
`
export const ThumbnailContainer = styled.div`
  ${({ theme }) => css`
    position: relative;

    img {
      border-radius: 1rem;
    }

    button {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      border: 0;
      position: absolute;
      z-index: 5;
      font-size: 0;

      transition: filter 0.2s;

      &:first-child {
        left: 0;
        top: 50%;
        background: ${theme.colors.purple500};
        transform: translate(-50%, -50%);
      }

      &:last-child {
        right: 0;
        top: 50%;
        background: ${theme.colors.green500};
        transform: translate(50%, -50%);
      }

      &:hover {
        filter: brightness(0.9);
      }
    }
  `}
`

export const HeaderContainer = styled.div`
  ${({ theme }) => css`
    padding: 1rem 0;
    border-bottom: 1px solid ${theme.colors.gray100};
  `}
`
export const TitleEpisode = styled.h1`
  margin-top: 2rem;
  margin-bottom: 2rem;

  span {
    display: inline-block;
    font-size: 0.875rem;

    & + span {
      margin-left: 1rem;
      padding-left: 1rem;
      position: relative;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background: #ddd;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`
export const EpisodeMember = styled.span``
export const EpisodePublishedAt = styled.span``
export const EpisodeDuration = styled.span``

export const DescriptionContainer = styled.div`
  ${({ theme }) => css`
    margin-top: 2rem;
    line-height: 1.675rem;
    color: ${theme.colors.gray800};

    p {
      margin: 1.5rem 0;
    }
  `}
`
