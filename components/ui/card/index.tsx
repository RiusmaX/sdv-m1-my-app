import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import CardContent from "./card-content";
import CardFooter from "./card-footer";
import CardHeader from "./card-header";

function Card () {
  return (
    <ThemedView style={styles.cardContainer}>
      <CardHeader />
      <CardContent />
      <CardFooter />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    elevation: 2,
    borderRadius: 25
  }
})

export default Card