import i18n from '../configs/i18n'

const useLang = () => {
  const lang = localStorage.getItem('i18nextLng') || 'vi'

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang, () => {
      window.location.reload()
    })
  }

  return { lang, changeLanguage }
}

export default useLang
