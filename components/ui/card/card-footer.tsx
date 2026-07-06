import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// status: true = liked, false = disliked, null = no vote
function CardFooter ({ item }: Readonly<{ item: any }>) {
  const [userId, setUserId] = useState<string | null>(null)
  const [status, setStatus] = useState<boolean | null>(null)

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      const uid = data.user?.id ?? null
      setUserId(uid)
      const myLike = item.Likes?.find((like: any) => like.user_id === uid)
      setStatus(myLike ? myLike.is_liked : null)
    })
    return () => { mounted = false }
  }, [item])

  async function vote(value: boolean) {
    if (!userId) return

    // Pressing the active button again removes the vote (toggle off)
    const next = status === value ? null : value
    const previous = status
    setStatus(next) // optimistic update

    try {
      if (next === null) {
        await supabase.from('Likes')
          .delete()
          .eq('user_id', userId)
          .eq('photo_id', item.id)
      } else {
        const { data: existing } = await supabase.from('Likes')
          .select('id')
          .eq('user_id', userId)
          .eq('photo_id', item.id)
          .maybeSingle()

        if (existing) {
          await supabase.from('Likes')
            .update({ is_liked: next })
            .eq('id', existing.id)
        } else {
          await supabase.from('Likes')
            .insert({ user_id: userId, photo_id: item.id, is_liked: next })
        }
      }
    } catch (e) {
      console.error('Error voting:', e)
      setStatus(previous) // rollback on failure
    }
  }

  const isLiked = status === true
  const isDisliked = status === false

  return (
    <ThemedView style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => vote(true)}
        style={[
          styles.button,
          {
            borderBottomLeftRadius: 20,
            backgroundColor: isLiked ? Colors.light.green : 'transparent'
          }
        ]}
      >
        <FontAwesome
          name='thumbs-o-up'
          size={24}
          color={isLiked ? Colors.light.background : Colors.light.gray}
        />
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => vote(false)}
        style={[
          styles.button,
          {
            borderBottomRightRadius: 20,
            backgroundColor: isDisliked ? Colors.light.red : 'transparent'
          }
        ]}
      >
        <FontAwesome
          name='thumbs-o-down'
          size={24}
          color={isDisliked ? Colors.light.background : Colors.light.gray}
        />
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 25
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6
  },
  separator: {
    backgroundColor: Colors.light.gray,
    opacity: 0.7,
    width: 2
  }
})

export default CardFooter
