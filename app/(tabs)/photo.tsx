import PhotoView from "@/components/photo-view";
import { ThemedView } from "@/components/themed-view";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function PhotoScreen () {
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <ThemedView style={{ flex: 1 }} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: "center", marginBottom: 16 }}>
          We need your permission to show the camera
        </Text>
        <Pressable onPress={requestPermission} style={{ padding: 12, backgroundColor: "#007AFF", borderRadius: 8 }}>
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </Pressable>
      </ThemedView>
    );
  }

  function toggleFacing() {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }

  async function takePicture () {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync()
        console.log("Photo taken:", photo);
        setPhotoUri(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }
  
  return photoUri 
      ? <PhotoView 
          uri={photoUri} 
          onCancel={() => setPhotoUri(null)}
        /> 
      : (
        <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={toggleFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </Pressable>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PhotoScreen