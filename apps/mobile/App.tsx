import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import mobileAds from 'react-native-google-mobile-ads'
import { StatusBar } from 'expo-status-bar'

import { initAds, maybeShowInterstitialAd } from '@/services/ads'
import { recordInteraction } from '@/services/api'
import { initI18n } from '@/i18n'
import { theme } from '@/theme'
import { AppNavigator } from '@/navigation'

initI18n()

export default function App() {
  React.useEffect(() => {
    mobileAds().initialize()
    initAds()
  }, [])

  return (
    <NavigationContainer
      theme={theme}
      onStateChange={() => {
        recordInteraction('navigation')
        maybeShowInterstitialAd()
      }}
    >
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  )
}
