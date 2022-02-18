import styled, { css } from 'styled-components'

export const HomeWrapper = styled.div`
  padding: 0 4rem;
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;
`
export const LatestEpisodes = styled.section`
  padding-bottom: 2rem;
`

export const Title = styled.h2`
  margin-top: 3rem;
  margin-bottom: 1.5rem;
`

export const AllEpisodesList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`
export const AllEpisodesItems = styled.li`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray100};
    padding: 1.25rem;
    border-radius: 1.5rem;
    position: relative;

    display: flex;
    align-items: center;

    img {
      width: 6rem;
      height: 6rem;
      border-radius: 1rem;
    }

    button {
      position: absolute;
      right: 2rem;
      bottom: 2rem;

      width: 2.5rem;
      height: 2.5rem;
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.gray100};
      border-radius: 0.657rem;
      font-size: 0;
      transition: filter 2s;

      img {
        width: 1.5rem;
        height: 1.5rem;
      }

      &:hover {
        filter: brightness(0.9);
      }
    }
  `}
`
export const EpisodeDetails = styled.div`
  ${({ theme }) => css`
    flex: 1;
    margin-left: 1rem;

    a,
    p,
    span {
      color: ${theme.colors.gray800};
    }

    a {
      display: block;
      font-family: lexend, sans-serif;
      font-weight: ${theme.font.bold};
      text-decoration: none;
      line-height: 1.4rem;

      &:hover {
        text-decoration: underline;
      }
    }

    p {
      font-size: 0.875rem;
      margin-top: 0.5rem;
      max-width: 78rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span {
      display: inline-block;
      margin-top: 0.5rem;
      font-size: 0.875rem;

      &:last-child {
        margin-left: 0.5rem;
        padding-left: 0.5rem;
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
  `}
`

export const AllEpisodes = styled.section`
  ${({ theme }) => css`
    padding-bottom: 2rem;

    h2 {
      margin-top: 1.2rem;
    }

    table {
      width: 100%;

      th,
      td {
        padding: 0.75rem;
        border-bottom: 1px solid ${theme.colors.gray100};
      }

      th {
        color: ${theme.colors.gray100};
        text-transform: uppercase;
        font: 500 0.75rem Lexend, sans-serif;
        text-align: left;
      }

      td {
        font-size: 0.875rem;

        &:nth-of-type(1),
        &:nth-of-type(4) {
          width: 100px;
        }

        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
        }

        a {
          color: ${theme.colors.gray800};
          font-family: Lexend, sans-serif;
          font-weight: ${theme.font.bold};
          text-decoration: none;
          line-height: 1.4rem;
          font-size: 1rem;

          &:hover {
            text-decoration: underline;
          }
        }

        button {
          width: 2rem;
          height: 2rem;
          background: ${theme.colors.white};
          border: 1px solid ${theme.colors.gray100};
          border-radius: 0.5rem;
          font-size: 0;
          transition: filter 2s;

          img {
            width: 1.25rem;
            height: 1.25rem;
          }

          &:hover {
            filter: brightness(0.9);
          }
        }
      }
    }
  `}
`
