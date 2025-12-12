import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { cyberBlue } from '@/theme/colors'
import * as ImagePicker from 'expo-image-picker'
import { analyzePhoto } from '@/services/media'

export default function UploadScreen() {
  const [image, setImage] = useState<string | null>(null)
  const [meta, setMeta] = useState<any>(null)

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.7 })
    if (!res.canceled && res.assets?.[0]?.base64) {
      const b64 = res.assets[0].base64
      setImage(`data:image/jpeg;base64,${b64}`)
      const m = await analyzePhoto({ imageBase64: b64 })
      setMeta(m)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}><Text style={styles.buttonText}>Choose Photo</Text></TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200, marginTop: 12, borderRadius: 12 }} />}
      {meta && (
        <View style={styles.card}>
          <Text style={styles.text}>{meta?.story?.tr}</Text>
          <Text style={styles.text}>{meta?.story?.en}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cyberBlue[950], padding: 16 },
  button: { backgroundColor: cyberBlue[500], padding: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#e6f2ff', fontWeight: '600' },
  card: { backgroundColor: cyberBlue[900], marginTop: 16, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: cyberBlue[800] },
  text: { color: '#e6f2ff', marginBottom: 6 }
})

