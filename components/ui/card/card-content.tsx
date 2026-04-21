import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

function CardContent ({ url }: Readonly<{ url: string }>) {
  return (
    <ThemedView>
      <Image
        source={{ uri: url }}
        style={styles.image}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
    objectFit: 'cover'
  }
})

export default CardContent