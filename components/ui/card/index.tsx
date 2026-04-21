import { ThemedView } from "@/components/themed-view";
import { supabase } from "@/lib/supabase";
import { StyleSheet } from "react-native";
import CardContent from "./card-content";
import CardFooter from "./card-footer";
import CardHeader from "./card-header";

function resolveUrl(item: any): string | null {
  if (item.url) {
    return item.url;
  } else if (item.path) {
    const { data } = supabase.storage.from("photos").getPublicUrl(item.path);
    return data.publicUrl;
  }
  return null;
}

function Card ({ item }: Readonly<{ item: any }>) {
  const resolvedUrl = resolveUrl(item);

  console.log("Resolved URL for item:", item, "is", resolvedUrl);
  return (
    <ThemedView style={styles.cardContainer}>
      <CardHeader />
      {resolvedUrl ? <CardContent url={resolvedUrl} /> : null}
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