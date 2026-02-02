import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

function CardContent () {
  return (
    <ThemedView>
      <Image
        source={require('@/assets/images/example-image.jpg')}
        style={styles.image}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    height: 400,
    objectFit: 'cover'
  }
})

export default CardContent