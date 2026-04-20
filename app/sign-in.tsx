import { ThemedView } from "@/components/themed-view";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Button, Text, TextInput } from "react-native";

function SignInScreen () {
  const [email, setEmail] = useState<string>('marius@sergent.dev')
  const [password, setPassword] = useState<string>('SuperPassword44')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignIn = async () => {
    setLoading(true)
    setError('')
    const { error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handleSignUp = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <ThemedView>
      <Text>Connexion</Text>
      <TextInput 
        placeholder="Email" 
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput 
        placeholder="Mot de passe" 
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Se connecter" onPress={handleSignIn} disabled={loading} />
      <Button title="S'inscrire" onPress={handleSignUp} disabled={loading} />
    </ThemedView>
  )
}

export default SignInScreen