import { DefaultTheme } from '@react-navigation/native'
import { cyberBlue } from './colors'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: cyberBlue[500],
    background: cyberBlue[950],
    card: cyberBlue[900],
    text: '#e6f2ff',
    border: cyberBlue[800],
    notification: cyberBlue[400],
  },
}
