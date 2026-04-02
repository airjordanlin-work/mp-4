import { FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { styles } from '../../assets/my_styles';

const BASE_URL = 'https://cs-webapps.bu.edu/airlin/dadjokes';

interface Joke {
  text: string;
  name: string;       
  timestamp: string;
}

export default function JokesListScreen() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/jokes`);
        const data = await response.json();
        setJokes(data.results);  
      } catch (error) {
        console.error('Error fetching jokes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJokes();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Jokes</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <FlatList
        data={jokes}
        keyExtractor={(item) => item.timestamp}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.jokeCard}>
            <Text style={styles.jokeText}>{item.text}</Text>
            <Text style={styles.contributor}>— {item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
