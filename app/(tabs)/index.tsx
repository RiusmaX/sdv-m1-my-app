import { ThemedView } from '@/components/themed-view';
import Card from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

function Separator() {
  return <View style={{ height: 20 }} />;
}

export default function HomeScreen() {
  const [pictures, setPictures] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  async function fetchPictures() {
    setRefreshing(true)
    const { data } = await supabase.from('Pictures').select()
    setPictures(data || [])
    setRefreshing(false)
  }

  useEffect(() => {
    fetchPictures()
  }, [])

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={pictures}
        keyExtractor={(item) => String(item.id)}
        onRefresh={fetchPictures}
        refreshing={refreshing}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <Card item={item} />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
