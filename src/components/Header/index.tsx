import { DateDescription, Description, HeaderWrapper } from './styles'
import ptBR from 'date-fns/locale/pt-BR'
import format from 'date-fns/format'

export const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })

  return (
    <HeaderWrapper>
      <img src="/img/logo.svg" alt="Podcastr" />

      <Description>O melhor para você ouvir, sempre</Description>

      <DateDescription>{currentDate}</DateDescription>
    </HeaderWrapper>
  )
}
