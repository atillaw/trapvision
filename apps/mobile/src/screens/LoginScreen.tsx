import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { cyberBlue } from '@/theme/colors'
import { useT } from '@/i18n'
import { register, login } from '@/services/auth'

export default function LoginScreen() {
  const t = useT()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const onRegister = async () => {
    const res = await register({ email, password })
    setMessage(res?.user?.email ? 'Registered' : 'Failed')
  }
  const onLogin = async () => {
    const res = await login({ email, password })
    setMessage(res?.user?.email ? 'Logged in' : 'Failed')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('loginTitle')}</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={'#9ecbff'} value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor={'#9ecbff'} value={password} onChangeText={setPassword} secureTextEntry />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity style={styles.button} onPress={onRegister}><Text style={styles.buttonText}>Register</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onLogin}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
      </View>
      {!!message && <Text style={styles.text}>{message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cyberBlue[950], padding: 16 },
  title: { color: '#e6f2ff', fontSize: 22, marginBottom: 12 },
  input: { backgroundColor: cyberBlue[900], color: '#e6f2ff', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: cyberBlue[800] },
  button: { backgroundColor: cyberBlue[500], padding: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#e6f2ff', fontWeight: '600' },
  text: { color: '#cde5ff', marginTop: 10 }
})

