import { ButtonHTMLAttributes } from 'react'
import { CustomButton } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  icon?: JSX.Element
  color?: string
}

export const Button = ({ icon, children, color, ...props }: ButtonProps) => {
  return (
    <CustomButton hasIcon={!!icon} color={color} {...props}>
      {!!icon && icon}
      {!!children && <span>{children}</span>}
    </CustomButton>
  )
}
