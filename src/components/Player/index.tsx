import { Button } from 'components/Button'
import {
  ButtonsContainer,
  EmptyDescription,
  EmptyPlayer,
  EmptySlider,
  EndTime,
  HeaderDescription,
  PlayerFooter,
  PlayerHeader,
  PlayerWrapper,
  Progress,
  Slider,
  StartTime
} from './styles'

export const Player = () => {
  return (
    <PlayerWrapper>
      <PlayerHeader>
        <img src="/img/playing.svg" alt="Playing now" />
        <HeaderDescription>Tocando Agora</HeaderDescription>
      </PlayerHeader>

      <EmptyPlayer>
        <EmptyDescription>Selecione um podcast para ouvir</EmptyDescription>
      </EmptyPlayer>

      <PlayerFooter className="empty">
        <Progress>
          <StartTime>00:00</StartTime>
          <Slider>
            <EmptySlider />
          </Slider>
          <EndTime>00:00</EndTime>
        </Progress>
      </PlayerFooter>

      <ButtonsContainer>
        <Button
          icon={<img src="/img/shuffle.svg" alt="Embaralhar" />}
          color="transparent"
        ></Button>
        <Button
          icon={<img src="/img/play-previous.svg" alt="Tocar Anterior" />}
          color="transparent"
        ></Button>
        <Button
          icon={<img src="/img/play.svg" alt="Tocar" />}
          color="transparent"
        ></Button>
        <Button
          icon={<img src="/img/play-next.svg" alt="Tocar próxima" />}
          color="transparent"
        ></Button>
        <Button
          icon={<img src="/img/repeat.svg" alt="Repetir" />}
          color="transparent"
        ></Button>
      </ButtonsContainer>
    </PlayerWrapper>
  )
}
