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
import { useEffect, useRef, useState } from 'react'
import { convertDurationToTimeString } from 'utils/convertDurationToTimeString'

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    isLooping,
    toogleLoop,
    isShuffing,
    toogleShuffle,
    playPrevious,
    hasNext,
    clearPlayerState,
    hasPrevious
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

  const setupProgressListener = () => {
    audioRef.current!.currentTime = 0

    audioRef.current?.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current!.currentTime))
    })
  }

  const handleSeek = (amount: number) => {
    audioRef.current!.currentTime = amount
    setProgress(amount)
  }

  const handleEpisodeEnded = () => {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

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
          <StartTime>{convertDurationToTimeString(progress)}</StartTime>
          <SliderContainer>
            {episode ? (
              <Slider
                max={Number(episode.duration)}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <EmptySlider />
            )}
          </SliderContainer>
          <EndTime>
            {convertDurationToTimeString(Number(episode?.duration) || 0)}
          </EndTime>
        </Progress>
      </PlayerFooter>

      {episode && (
        <audio
          src={episode.url}
          ref={audioRef}
          loop={isLooping}
          onEnded={handleEpisodeEnded}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
          autoPlay
          onLoadedMetadata={setupProgressListener}
        />
      )}

      <ButtonsContainer>
        <Button
          icon={<img src="/img/shuffle.svg" alt="Embaralhar" />}
          color="transparent"
          disabled={!episode || episodeList.length === 1}
          onClick={toogleShuffle}
          className={isShuffing ? 'isActive' : ''}
        ></Button>
        <Button
          onClick={playPrevious}
          icon={<img src="/img/play-previous.svg" alt="Tocar Anterior" />}
          color="transparent"
          disabled={!episode || !hasPrevious}
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
          onClick={playNext}
          icon={<img src="/img/play-next.svg" alt="Tocar pr??xima" />}
          color="transparent"
          disabled={!episode || !hasNext}
        ></Button>
        <Button
          icon={<img src="/img/repeat.svg" alt="Repetir" />}
          color="transparent"
          disabled={!episode}
          onClick={toogleLoop}
          className={isLooping ? 'isActive' : ''}
        ></Button>
      </ButtonsContainer>
    </PlayerWrapper>
  )
}
