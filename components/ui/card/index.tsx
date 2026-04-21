import { ThemedView } from "@/components/themed-view";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import CardContent from "./card-content";
import CardFooter from "./card-footer";
import CardHeader from "./card-header";

function Card ({ item }: Readonly<{ item: any }>) {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(
    item.url ?? null
  );

  useEffect(() => {
    if (!item.url && item.path) {
      supabase.storage
        .from("photos")
        .createSignedUrl(item.path, 3600)
        .then(({ data, error }) => {
          if (!error && data) setResolvedUrl(data.signedUrl);
        });
    }
  }, [item.url, item.path]);

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