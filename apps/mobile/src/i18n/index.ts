import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import * as Localization from 'expo-localization'

const resources = {
  en: {
    translation: {
      appName: 'TRIPVERSE',
      plannerTitle: 'AI Trip Planner',
      feedTitle: 'Travel Social Feed',
      premiumTitle: 'Premium',
      settingsTitle: 'Settings',
      profileTitle: 'Profile',
      loginTitle: 'Login',
      uploadTitle: 'Upload Photo',
      leaderboardTitle: 'Leaderboard',
      destinationTitle: 'Destination',
      budget: 'Budget',
      dates: 'Dates',
      destination: 'Destination',
      interests: 'Interests',
      planTrip: 'Plan Trip'
    }
  },
  tr: {
    translation: {
      appName: 'TRIPVERSE',
      plannerTitle: 'Yapay Zeka Gezi Planlayıcı',
      feedTitle: 'Seyahat Sosyal Akışı',
      premiumTitle: 'Premium',
      settingsTitle: 'Ayarlar',
      profileTitle: 'Profil',
      loginTitle: 'Giriş',
      uploadTitle: 'Fotoğraf Yükle',
      leaderboardTitle: 'Liderlik Tablosu',
      destinationTitle: 'Hedef',
      budget: 'Bütçe',
      dates: 'Tarihler',
      destination: 'Hedef',
      interests: 'İlgi Alanları',
      planTrip: 'Geziyi Planla'
    }
  }
}

export function initI18n() {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng: (Localization.getLocales?.()[0]?.languageCode || 'en') === 'tr' ? 'tr' : 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false }
    })
  }
}

export function useT() {
  const { t } = useTranslation()
  return t
}
