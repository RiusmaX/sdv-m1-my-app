import { Button, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

export default function TabTwoScreen() {
  const handleLogout = async () => {
     const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      }
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <Button title='Log out' onPress={handleLogout} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
});
