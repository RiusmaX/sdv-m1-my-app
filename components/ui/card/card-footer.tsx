import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

function CardFooter () {
  const [isLiked, setIsLiked] = useState<boolean>(true)
  const [isDisliked, setIsDisliked] = useState<boolean>(false)

  return (
    <ThemedView style={styles.cardContainer}>
      <TouchableOpacity 
        style={[
          styles.button, 
          {
            borderBottomLeftRadius: 20,
            backgroundColor: isLiked ? Colors.light.green : ''
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
        style={[
          styles.button, 
          {
            borderBottomRightRadius: 20,
            backgroundColor: isDisliked ? Colors.light.red : ''
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