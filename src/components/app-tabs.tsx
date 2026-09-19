import { Tabs } from 'expo-router';
import { Image, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

const homeIcon = require('@/assets/images/tabIcons/home.png');
const exploreIcon = require('@/assets/images/tabIcons/explore.png');

function TabIcon({
  source,
  color,
}: {
  source: number;
  color: string;
}) {
  return (
    <Image
      source={source}
      style={{ width: 24, height: 24, tintColor: color }}
      resizeMode="contain"
    />
  );
}

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#000000',
        tabBarActiveTintColor: '#222222',
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e5e5',
        },
        sceneStyle: { backgroundColor: '#ffffff' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabIcon source={homeIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="registrar"
        options={{
          title: 'Registrar',
          tabBarIcon: ({ color }) => <TabIcon source={exploreIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="historial"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <TabIcon source={homeIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="resumen"
        options={{
          title: 'Resumen',
          tabBarIcon: ({ color }) => <TabIcon source={exploreIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="editar-eliminar-gastos"
        options={{
          title: 'Eliminar',
          tabBarIcon: ({ color }) => <TabIcon source={homeIcon} color={color} />,
        }}
      />
    </Tabs>
  );
}
