import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from "expo-image";
import { Pressable, View } from "react-native";

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
        style={{ width: "100%", height: "100%"}} 
      />
      <Pressable 
        onPress={onCancel}
        style={{ 
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          zIndex: 10,
          bottom: 36,
          left: 36,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: 999,
        }}
      >
        <MaterialIcons name="cancel" size={24} color="black" />
      </Pressable>
       <Pressable 
        onPress={onValidate}
        style={{ 
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          zIndex: 10,
          bottom: 36,
          right: 36,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: 999,
        }}
      >
        <MaterialIcons name="check" size={24} color="black" />
      </Pressable>
    </View>
  );
}

export default PhotoView;