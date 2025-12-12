import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useT } from '@/i18n'
import { cyberBlue } from '@/theme/colors'

export default function ProfileScreen() {
  const t = useT()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profileTitle')}</Text>
      <Text style={styles.text}>Achievements, saved plans, social profile...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cyberBlue[950], padding: 16 },
  title: { color: '#e6f2ff', fontSize: 22, marginBottom: 12 },
  text: { color: '#cde5ff' }
})

