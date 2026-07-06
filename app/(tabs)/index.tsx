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
    try {
      const { data } = await supabase.from('Pictures')
      .select('*, Likes(*)')
      .order('created_at', { ascending: false })
      console.log('Fetched pictures:', data)
      setPictures(data || [])
    } catch (e) {
      console.error('Error fetching pictures:', e)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPictures()
    const channel = supabase.channel('public:Pictures')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Pictures' }, (payload) => {
        console.log('Change received!', payload)
        fetchPictures()
      })
      .subscribe()
      
    return () => { 
      supabase.removeChannel(channel)
    }
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
