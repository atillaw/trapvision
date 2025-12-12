import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useT } from '@/i18n'
import { cyberBlue } from '@/theme/colors'
import { maybeShowRewardedAd } from '@/services/ads'

export default function PremiumScreen() {
  const t = useT()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('premiumTitle')}</Text>
      <Text style={styles.text}>Offline AI Guide, Concierge, Secret routes...</Text>
      <TouchableOpacity style={styles.button} onPress={() => maybeShowRewardedAd(() => {})}>
        <Text style={styles.buttonText}>Watch ad to unlock bonus</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cyberBlue[950], padding: 16 },
  title: { color: '#e6f2ff', fontSize: 22, marginBottom: 12 },
  text: { color: '#cde5ff' },
  button: { marginTop: 16, padding: 12, backgroundColor: cyberBlue[700], borderRadius: 8 },
  buttonText: { color: '#e6f2ff', textAlign: 'center' }
})
