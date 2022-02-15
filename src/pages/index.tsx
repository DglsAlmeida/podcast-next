import { Button } from 'components/Button'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticProps } from 'next'
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
} from './home-styles'

type Episode = {
  id: string
  title: string
  thumbnail: string
  description: string
  members: string
  duration: number
  durationAsString: string
  url: string
  publishedAt: string
}

type HomeProps = {
  allEpisodes: Episode[]
  latestEpisodes: Episode[]
}

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
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
                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </EpisodeDetails>

              <Button>
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
                  <a href="">{episode.title}</a>
                </td>
                <td>{episode.members}</td>
                <td>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <Button>
                    <img src="/img/play.svg" alt="Tocar episódio" />
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
    },
    revalidate: 60 * 60 * 8
  }
}
