import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useT } from '@/i18n'
import { cyberBlue } from '@/theme/colors'
import PlannerScreen from '@/screens/PlannerScreen'
import FeedScreen from '@/screens/FeedScreen'
import PremiumScreen from '@/screens/PremiumScreen'
import SettingsScreen from '@/screens/SettingsScreen'
import ProfileScreen from '@/screens/ProfileScreen'
import UploadScreen from '@/screens/UploadScreen'
import LeaderboardScreen from '@/screens/LeaderboardScreen'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  const t = useT()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: cyberBlue[900],
          borderTopColor: cyberBlue[800],
        },
        tabBarActiveTintColor: '#e6f2ff',
        tabBarInactiveTintColor: '#9ecbff',
      }}
    >
      <Tab.Screen
        name="Planner"
        component={PlannerScreen}
        options={{ title: t('plannerTitle') }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ title: t('feedTitle') }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{ title: 'Upload' }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{ title: 'Leaderboard' }}
      />
      <Tab.Screen
        name="Premium"
        component={PremiumScreen}
        options={{ title: t('premiumTitle') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('profileTitle') }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('settingsTitle') }}
      />
    </Tab.Navigator>
  )
}
