/*
 * index.tsx
 * 
 * @author Jordan Lin
 */

import { Image, ActivityIndicator, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { styles } from '../../assets/my_styles';

const BASE_URL = 'https://cs-webapps.bu.edu/airlin/dadjokes';

/** Represents a single Joke from the API */
interface Joke {
  text: string;  
  name: string; 
}


interface Picture {
  image_url: string;  
}

export default function IndexScreen() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [picture, setPicture] = useState<Picture | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jokeRes, pictureRes] = await Promise.all([
        fetch(`${BASE_URL}/api/random`),
        fetch(`${BASE_URL}/api/random_picture`),
      ]);
      setJoke(await jokeRes.json());
      setPicture(await pictureRes.json());
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      <Text style={styles.title}>Joke of the Day</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {joke && (
        <View style={styles.jokeContainer}>
          <Text style={styles.jokeText}>{joke.text}</Text>
          <Text style={styles.contributor}>— {joke.name}</Text>
        </View>
      )}

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {picture && (
        <Image
          source={{ uri: picture.image_url }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Button title="Tell Me Another!" onPress={fetchData} />

    </View>
  );
}