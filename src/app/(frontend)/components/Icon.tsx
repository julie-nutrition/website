import { Loader, type LucideProps } from 'lucide-react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

type IconProps = {
  iconName: IconName
} & LucideProps

export const Icon = ({ iconName, ...props }: IconProps) => {
  const isDevMode = process.env.NODE_ENV === 'development'

  return isDevMode ? <Loader {...props} /> : <DynamicIcon {...props} name={iconName} />
}
