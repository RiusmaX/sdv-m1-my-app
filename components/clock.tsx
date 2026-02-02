import { useEffect, useState } from "react";
import { ThemedText } from "./themed-text";

function Clock () {
  const [date, setDate] = useState(new Date())

  // Fonction appelée au montage du composant (apparition à l'écran)
  useEffect(() => {
    // Execution toutes les secondes
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)

    // Fonction appelée au démontage du composant (disparition de l'écran)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <ThemedText>{date.toLocaleTimeString()}</ThemedText>
  )
}

export default Clock