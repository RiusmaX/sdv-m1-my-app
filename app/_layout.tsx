import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInScreen from './sign-in';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    supabase.auth.getClaims().then(({ data }) => {
      if (!data) return
      const { claims } = data
      if (claims) {
        setUserId(claims?.sub ?? null);
        setEmail(claims?.email ?? '');
      }
    })

    supabase.auth.onAuthStateChange(async (_event, _session) => {
      if (!_session) {
        setUserId(null);
        setEmail('');
        return;
      }

      const { data } = await supabase.auth.getClaims();
      if (!data?.claims) return;

      setUserId(data.claims.sub ?? null);
      setEmail(data.claims.email ?? '');
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {userId && email ? (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        ) : (
          <SignInScreen />
        )}
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaView>
  );
}
