import { Button } from 'components/Button'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { usePlayer } from 'context/PlayerContext'
import {
  ButtonsContainer,
  CurrentEpisode,
  CurrentEpisodeMembers,
  CurrentEpisodeTitle,
  EmptyDescription,
  EmptyPlayer,
  EmptySlider,
  EndTime,
  HeaderDescription,
  PlayerFooter,
  PlayerHeader,
  PlayerWrapper,
  Progress,
  SliderContainer,
  StartTime
} from './styles'
import { useEffect, useRef } from 'react'

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex]

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <PlayerWrapper>
      <PlayerHeader>
        <img src="/img/playing.svg" alt="Playing now" />
        <HeaderDescription>Tocando Agora</HeaderDescription>
      </PlayerHeader>

      {episode ? (
        <CurrentEpisode>
          <Image
            src={episode?.thumbnail}
            alt={episode?.title}
            width={592}
            height={592}
            objectFit="cover"
          />
          <CurrentEpisodeTitle>{episode?.title}</CurrentEpisodeTitle>
          <CurrentEpisodeMembers>{episode?.members}</CurrentEpisodeMembers>
        </CurrentEpisode>
      ) : (
        <EmptyPlayer>
          <EmptyDescription>Selecione um podcast para ouvir</EmptyDescription>
        </EmptyPlayer>
      )}

      <PlayerFooter className="empty">
        <Progress>
          <StartTime>00:00</StartTime>
          <SliderContainer>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <EmptySlider />
            )}
          </SliderContainer>
          <EndTime>00:00</EndTime>
        </Progress>
      </PlayerFooter>

      {episode && (
        <audio
          src={episode.url}
          ref={audioRef}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
          autoPlay
        />
      )}

      <ButtonsContainer>
        <Button
          icon={<img src="/img/shuffle.svg" alt="Embaralhar" />}
          color="transparent"
          disabled={!episode}
        ></Button>
        <Button
          icon={<img src="/img/play-previous.svg" alt="Tocar Anterior" />}
          color="transparent"
          disabled={!episode}
        ></Button>
        <Button
          icon={
            <img
              src={isPlaying ? '/img/pause.svg' : '/img/play.svg'}
              alt="Tocar"
            />
          }
          color="transparent"
          disabled={!episode}
          onClick={togglePlay}
        ></Button>
        <Button
          icon={<img src="/img/play-next.svg" alt="Tocar próxima" />}
          color="transparent"
          disabled={!episode}
        ></Button>
        <Button
          icon={<img src="/img/repeat.svg" alt="Repetir" />}
          color="transparent"
          disabled={!episode}
        ></Button>
      </ButtonsContainer>
    </PlayerWrapper>
  )
}
