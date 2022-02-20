import { EpisodeData } from 'pages'
import { createContext, useContext, useState } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: string
  url: string
}

type PlayerContextData = {
  episodeList: Episode[]
  currentEpisodeIndex: number
  play: (episode: Episode) => void
  isPlaying: boolean
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
  playList: (list: EpisodeData[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
  isLooping: boolean
  toogleLoop: () => void
  isShuffing: boolean
  toogleShuffle: () => void
  clearPlayerState: () => void
}

type PlayerProviderProps = {
  children: React.ReactNode
}

const PlayerContext = createContext({} as PlayerContextData)

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [episodeList, setEpisodeList] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffing, setIsShuffing] = useState(false)

  const play = (episode: Episode) => {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const playList = (list: EpisodeData[], index: number) => {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toogleLoop = () => {
    setIsLooping(!isLooping)
  }

  const toogleShuffle = () => {
    setIsShuffing(!isShuffing)
  }

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffing || currentEpisodeIndex + 1 < episodeList.length

  const playNext = () => {
    if (isShuffing) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      )
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  const playPrevious = () => {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  const clearPlayerState = () => {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        playNext,
        hasPrevious,
        hasNext,
        isLooping,
        clearPlayerState,
        toogleLoop,
        isShuffing,
        toogleShuffle,
        playPrevious,
        isPlaying,
        togglePlay,
        setPlayingState
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = (): PlayerContextData => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
