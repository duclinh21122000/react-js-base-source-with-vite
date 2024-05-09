import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import useLang from '@/utils/hooks/useLang'
import useTheme from '@/utils/hooks/useTheme'

const Header = () => {
  const { theme, handleSelectTheme } = useTheme()
  const { lang, changeLanguage } = useLang()
  const { t } = useTranslation()

  return (
    <div className='flex items-center justify-between max-w-[1200px] mx-auto'>
      <div className='flex items-center justify-center gap-6 mt-6'>
        <Link to='/' className='text-text-primary'>
          {t('app.home')}
        </Link>
        <Link to='/about'>{t('app.about')}</Link>
        <Link to='/blog'>{t('app.blog')}</Link>
        <Link to='/contact'>{t('app.contact')}</Link>
        <Link to='/ui'>{t('app.ui')}</Link>
      </div>
      <div className='flex items-center justify-center gap-8'>
        <select onChange={(e) => handleSelectTheme(e.target.value)} value={theme}>
          <option value='light'>Light</option>
          <option value='dark'>Dark</option>
          <option value='system'>System</option>
        </select>
        <select onChange={(e) => changeLanguage(e.target.value)} value={lang}>
          <option value='vi'>Viet Nam</option>
          <option value='en'>English</option>
        </select>
      </div>
    </div>
  )
}

export default Header
