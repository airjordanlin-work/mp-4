import { TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { styles } from '../../assets/my_styles';

const BASE_URL = 'https://cs-webapps.bu.edu/airlin/dadjokes';

export default function AddJokeScreen() {
  const [jokeText, setJokeText] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!jokeText || !name) {
      Alert.alert('Error', 'Please fill in both fields!');
      return;
    }

    setLoading(true);

    try {
      console.log('Sending POST to:', `${BASE_URL}/api/jokes`);
      console.log('Payload:', { text: jokeText, name });

      const response = await fetch(`${BASE_URL}/api/jokes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: jokeText,
          name: name,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok?:', response.ok);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        Alert.alert('Success! 🎉', 'Your joke has been added!');
        setJokeText('');  // Clear fields after success
        setName('');
      } else {
        Alert.alert('Error', `Failed to add joke: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Error posting joke:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Joke 😄</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextInput
        style={styles.input}
        placeholder="Enter a silly, funny dad joke here...!"
        value={jokeText}
        onChangeText={setJokeText}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Who are you...?"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Submit Joke</Text>
        }
      </TouchableOpacity>
    </View>
  );
}