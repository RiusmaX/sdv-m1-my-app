import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, View } from "react-native";

function CardFooter () {
  return (
    <ThemedView style={styles.cardContainer}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome 
          name='thumbs-o-up' 
          size={24} 
          color={Colors.light.gray} 
        />
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.button}>
        <FontAwesome 
          name='thumbs-o-down' 
          size={24} 
          color={Colors.light.gray} 
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