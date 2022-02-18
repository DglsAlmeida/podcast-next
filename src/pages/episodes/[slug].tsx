import { Button } from 'components/Button'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticPaths, GetStaticProps } from 'next'
import { EpisodeData } from 'pages'
import Image from 'next/image'
import Link from 'next/link'
import api from 'services/api'
import { convertDurationToTimeString } from 'utils/convertDurationToTimeString'
import {
  DescriptionContainer,
  EpisodeDuration,
  EpisodeMember,
  EpisodePublishedAt,
  EpisodeWrapper,
  HeaderContainer,
  ThumbnailContainer,
  TitleEpisode
} from 'styles/episodes-styles'

type EpisodeProps = {
  episode: EpisodeData
}

export default function Episode({ episode }: EpisodeProps) {
  return (
    <EpisodeWrapper>
      <ThumbnailContainer>
        <Link href="/">
          <Button>
            <img src="/img/arrow-left.svg" alt="Voltar" />
          </Button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode?.thumbnail}
          objectFit="cover"
        />

        <Button>
          <img src="/img/play.svg" alt="Tocar episódio" />
        </Button>
      </ThumbnailContainer>

      <HeaderContainer>
        <TitleEpisode>{episode.title}</TitleEpisode>
        <EpisodeMember>{episode.members}</EpisodeMember>
        <EpisodePublishedAt>{episode.publishedAt}</EpisodePublishedAt>
        <EpisodeDuration>{episode.durationAsString}</EpisodeDuration>
      </HeaderContainer>

      <DescriptionContainer
        dangerouslySetInnerHTML={{ __html: episode.description! }}
      />
    </EpisodeWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes')

  // Get the paths we want to pre-render based on posts
  const paths = data.map((episode: EpisodeData) => ({
    params: { slug: episode.id }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {
  const { slug } = ctx.params

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24
  }
}
