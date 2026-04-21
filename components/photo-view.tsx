import { Image } from "expo-image";
import { View } from "react-native";

function PhotoView ({
    uri,
    onValidate,
    onCancel
  }: {
    uri: string;
    onValidate?: () => void;
    onCancel?: () => void;
  }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image 
        source={{ uri }} 
        style={{ width: "100%", height: "100%", marginBottom: 16 }} 
      />
    </View>
  );
}

export default PhotoView;