import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import { useT } from '@/i18n'
import { cyberBlue } from '@/theme/colors'

export default function FeedScreen() {
  const t = useT()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('feedTitle')}</Text>
      <Text style={styles.text}>Media upload, AI metadata, social interactions coming...</Text>
      <View style={styles.bannerWrap}>
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ADAPTIVE_BANNER} onAdLoaded={() => {}} onAdFailedToLoad={() => {}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cyberBlue[950], padding: 16 },
  title: { color: '#e6f2ff', fontSize: 22, marginBottom: 12 },
  text: { color: '#cde5ff' },
  bannerWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: cyberBlue[900] }
})
