import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

function CardHeader () {
  return (
    <ThemedView style={styles.headerContainer}>
      <ThemedView style={styles.avatarContainer}>
        <ThemedText style={styles.avatarText}>MS</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>@Pseudo</ThemedText>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 25
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.gray,
    borderRadius: 50,
    padding: 4,
    maxWidth: 35,
    height: 35
  },
  avatarText: {
    color: Colors.light.background,
    fontWeight: 600
  }
})

export default CardHeader