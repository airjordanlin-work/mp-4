import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet,
  ActivityIndicator, SafeAreaView,
} from 'react-native';
import { TOKEN, PROFILE_ID, BASE_URL } from '../../constants/Auth';


type Photo = {
    id: number;
    image: string | null;
    timestamp: string;
  };
  
  type Post = {
    id: number;
    caption: string;
    timestamp: string;
    profile: number;
    photos: Photo[];
    username: string;
  };

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/api/profiles/${PROFILE_ID}/feed/`, {
      headers: { Authorization: `Token ${TOKEN}` },
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
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => {
            console.log('post id:', item.id, 'photos:', JSON.stringify(item.photos));
            return (
              <View style={styles.card}>
                {item.photos?.[0]?.image && (
                  <Image 
                    source={{ 
                      uri: item.photos[0].image.startsWith('http') || item.photos[0].image.startsWith('data')
                        ? item.photos[0].image
                        : `https://cs-webapps.bu.edu${item.photos[0].image}`
                    }} 
                    style={styles.postImage} 
                  />
                )}
                <Text style={styles.username}>@{item.username}</Text>
                <Text style={styles.text}>{item.caption}</Text>
                <Text style={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</Text>
              </View>
            );
          }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center:    { flex: 1, textAlign: 'center', marginTop: 40 },
  header:    { fontSize: 24, fontWeight: 'bold', padding: 16 },
  card:      { borderBottomWidth: 1, borderColor: '#eee', padding: 16 },
  image:     { width: '100%', height: 200, borderRadius: 8, marginBottom: 8 },
  username:  { fontWeight: '600', marginBottom: 4 },
  text:      { fontSize: 15, marginBottom: 4 },
  date:      { color: '#888', fontSize: 12 },
  postImage:     { width: '100%', height: 180, borderRadius: 8, marginBottom: 8 },
});