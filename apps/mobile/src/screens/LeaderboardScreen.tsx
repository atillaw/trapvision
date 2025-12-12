import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { cyberBlue } from '@/theme/colors'
import { getLeaderboard } from '@/services/gamification'

export default function LeaderboardScreen() {
  const [rows, setRows] = useState<any[]>([])
  useEffect(() => { (async () => setRows(await getLeaderboard()))() }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Explorers</Text>
      {rows.map((r, i) => (
        <View key={r.userId || i} style={styles.row}><Text style={styles.text}>{i+1}. {r.displayName || r.userId} — {r.score} pts — Lv {r.level}</Text></View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cyberBlue[950], padding: 16 },
  title: { color: '#e6f2ff', fontSize: 22, marginBottom: 12 },
  row: { paddingVertical: 8, borderBottomWidth: 1, borderColor: cyberBlue[800] },
  text: { color: '#cde5ff' }
})

