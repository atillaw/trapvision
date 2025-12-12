import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { cyberBlue } from '@/theme'
import { getDestination } from '@/services/destinations'

export default function DestinationScreen({ route }: any) {
  const { name } = route.params || { name: 'Istanbul' }
  const [d, setD] = useState<any>(null)
  useEffect(() => { (async () => setD(await getDestination(name)))() }, [name])
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>{name}</Text>
      {d && (
        <View style={styles.card}>
          <Text style={styles.text}>{d?.info?.tr}</Text>
          <Text style={styles.text}>{d?.info?.en}</Text>
          <Text style={styles.text}>{d?.pricing?.en}</Text>
          {Array.isArray(d?.hotels) && d.hotels.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.text}>Hotels</Text>
              {d.hotels.map((h: any, i: number) => (
                <Text key={i} style={styles.text}>{h?.tr || h?.en}</Text>
              ))}
            </View>
          )}
          {Array.isArray(d?.activities) && d.activities.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.text}>Activities</Text>
              {d.activities.map((a: any, i: number) => (
                <Text key={i} style={styles.text}>{a?.tr || a?.en}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cyberBlue[950] },
  title: { color: '#e6f2ff', fontSize: 22, marginBottom: 12 },
  card: { backgroundColor: cyberBlue[900], marginTop: 16, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: cyberBlue[800] },
  text: { color: '#e6f2ff', marginBottom: 6 }
})
