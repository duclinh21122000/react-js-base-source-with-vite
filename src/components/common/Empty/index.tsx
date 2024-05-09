import { useTranslation } from 'react-i18next'

import IconEmpty from '@/utils/icons/IconEmpty'

export interface EmptyProps {
  description?: string
  src?: React.ReactNode
  height?: number
}

export const Empty = (props: EmptyProps) => {
  const { description = '', src, height } = props
  const { t } = useTranslation()
  return (
    <div
      style={{ height }}
      className='ui-flex ui-h-full ui-w-full ui-flex-col ui-items-center ui-justify-center ui-truncate ui-bg-bg-secondary ui-p-3 ui-text-sm'
    >
      {src || <IconEmpty />}
      <p className='ui-mt-4 ui-w-full ui-truncate ui-text-center ui-font-medium ui-text-text-primary'>
        {description || t('app.noData')}
      </p>
    </div>
  )
}
