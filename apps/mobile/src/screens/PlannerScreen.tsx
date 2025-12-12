import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useT } from '@/i18n'
import { cyberBlue } from '@/theme/colors'
import { planTrip } from '@/services/api'

export default function PlannerScreen() {
  const t = useT()
  const [budgetRange, setBudgetRange] = useState('$$')
  const [destination, setDestination] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [interests, setInterests] = useState('food, museums')
  const [result, setResult] = useState<any>(null)

  const generate = async () => {
    const r = await planTrip({
      budgetRange,
      dates: { start, end },
      destination,
      interests: interests.split(',').map((s: string) => s.trim())
    })
    setResult(r)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('plannerTitle')}</Text>
      <TextInput style={styles.input} placeholder={t('budget')} placeholderTextColor={'#9ecbff'} value={budgetRange} onChangeText={setBudgetRange} />
      <TextInput style={styles.input} placeholder={t('destination')} placeholderTextColor={'#9ecbff'} value={destination} onChangeText={setDestination} />
      <TextInput style={styles.input} placeholder={t('dates')+ ' start'} placeholderTextColor={'#9ecbff'} value={start} onChangeText={setStart} />
      <TextInput style={styles.input} placeholder={t('dates')+ ' end'} placeholderTextColor={'#9ecbff'} value={end} onChangeText={setEnd} />
      <TextInput style={styles.input} placeholder={t('interests')} placeholderTextColor={'#9ecbff'} value={interests} onChangeText={setInterests} />
      <TouchableOpacity style={styles.button} onPress={generate}>
        <Text style={styles.buttonText}>{t('planTrip')}</Text>
      </TouchableOpacity>
      {result && (
        <View style={styles.card}>
          <Text style={styles.section}>Plan</Text>
          <Text style={styles.text}>{result.plan?.tr}</Text>
          <Text style={styles.text}>{result.plan?.en}</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cyberBlue[950] },
  content: { padding: 16 },
  title: { color: '#e6f2ff', fontSize: 22, marginBottom: 12 },
  input: { backgroundColor: cyberBlue[900], color: '#e6f2ff', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: cyberBlue[800] },
  button: { backgroundColor: cyberBlue[500], padding: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#e6f2ff', fontWeight: '600' },
  card: { backgroundColor: cyberBlue[900], marginTop: 16, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: cyberBlue[800] },
  section: { color: '#cde5ff', marginBottom: 6 },
  text: { color: '#e6f2ff', marginBottom: 6 }
})
