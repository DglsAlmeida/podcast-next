import { CustomButton } from './styles'

export type ButtonProps = {
  children?: React.ReactNode
  icon?: JSX.Element
  color?: string
  onClick?: () => (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({ icon, children, color, ...props }: ButtonProps) => {
  return (
    <CustomButton hasIcon={!!icon} color={color} {...props}>
      {!!icon && icon}
      {!!children && <span>{children}</span>}
    </CustomButton>
  )
}
