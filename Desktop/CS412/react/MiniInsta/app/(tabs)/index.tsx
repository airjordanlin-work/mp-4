/**
 * index.tsx
 *
 * The main Feed screen of the app.
 * Fetches and displays posts from profiles that the logged-in user follows.
 * Redirects to the login screen if the user is not authenticated.
 *
 * @author Jordan Lin
 */

import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuth } from '../../constants/AuthContext';
import { BASE_URL } from '../../constants/Auth';
import { Redirect } from 'expo-router';
import { styles } from '../../assets/my_styles';

type Photo = { id: number; image: string | null; timestamp: string };
type Post  = { id: number; caption: string; timestamp: string; profile: number; photos: Photo[]; username: string };



export default function FeedScreen() {
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const { token, profileId }  = useAuth();

  if (!token) return <Redirect href="/login" />;

 /* The feed endpoint returns posts from profiles the user follows.
   * We use the profileId to identify whose feed to load.
   */
  useEffect(() => {
    console.log('Feed: token=', token, 'profileId=', profileId);
    fetch(`${BASE_URL}/api/profiles/${profileId}/feed/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(res => {
        console.log('feed status:', res.status);
        return res.text();
      })
      .then(text => {
        console.log('feed raw:', text);
        const data = JSON.parse(text);
        setPosts(data.results ?? data);
      })
      .catch(err => {
        console.log('feed error:', err);
        setError('Failed to load feed');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error)   return <Text style={styles.center}>{error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Feed</Text>

      {/* The feed endpoint returns posts from profiles the user follows.
   * We use the profileId to identify whose feed to load.
  */}
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
            <View style={styles.card}>
              {item.photos?.[0]?.image && (
                <Image
                  source={{
                    uri: item.photos[0].image.startsWith('http')
                      ? item.photos[0].image
                      : `https://cs-webapps.bu.edu${item.photos[0].image}`
                  }}
                  style={styles.postImage}
                />
              )}
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.text}>{item.caption}</Text>
              <Text style={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</Text>
            </View>
          )}
      />
    </SafeAreaView>
  );
}

