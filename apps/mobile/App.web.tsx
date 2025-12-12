import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import { initI18n } from '@/i18n'
import { theme } from '@/theme'
import { AppNavigator } from '@/navigation'
import { recordInteraction } from '@/services/api'

initI18n()

export default function App() {
  return (
    <NavigationContainer
      theme={theme}
      onStateChange={() => {
        recordInteraction('navigation')
      }}
    >
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  )
}

