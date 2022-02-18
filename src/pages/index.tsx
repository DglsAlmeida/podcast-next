import { Button } from 'components/Button'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import api from 'services/api'
import { EpisodeResponse } from 'types/episode'
import { convertDurationToTimeString } from 'utils/convertDurationToTimeString'
import {
  AllEpisodes,
  AllEpisodesItems,
  AllEpisodesList,
  EpisodeDetails,
  HomeWrapper,
  LatestEpisodes,
  Title
} from 'styles/home-styles'
import { usePlayer } from 'context/PlayerContext'
import { useCallback } from 'react'

export type EpisodeData = {
  id: string
  title: string
  thumbnail: string
  description?: string
  members: string
  duration: string
  durationAsString: string
  url: string
  publishedAt: string
}

type HomeProps = {
  allEpisodes: EpisodeData[]
  latestEpisodes: EpisodeData[]
}

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
  const { play } = usePlayer()

  const handlePlay = useCallback(
    (episode: EpisodeData) => {
      play(episode)
    },
    [play]
  )

  return (
    <HomeWrapper>
      <LatestEpisodes>
        <Title>Últimos lançamentos</Title>

        <AllEpisodesList>
          {latestEpisodes.map((episode) => (
            <AllEpisodesItems key={episode.id}>
              <Image
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />

              <EpisodeDetails>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </EpisodeDetails>

              <Button onClick={() => handlePlay(episode)}>
                <img src="/img/play-green.svg" alt="Tocar episódio" />
              </Button>
            </AllEpisodesItems>
          ))}
        </AllEpisodesList>
      </LatestEpisodes>

      <AllEpisodes>
        <Title>Todos os episódios</Title>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => (
              <tr key={episode.id}>
                <td>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <Button onClick={() => handlePlay(episode)}>
                    <img src="/img/play-green.svg" alt="Tocar episódio" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AllEpisodes>
    </HomeWrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode: EpisodeResponse) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      allEpisodes,
      latestEpisodes
    }
  }
}
