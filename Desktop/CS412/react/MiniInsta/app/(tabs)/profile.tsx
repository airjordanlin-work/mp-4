import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet,
  ActivityIndicator, SafeAreaView,
} from 'react-native';
import { TOKEN, PROFILE_ID, BASE_URL } from '../../constants/Auth';

type Profile = {
  id: number;
  username: string;
  display_name: string;
  bio_text: string;             
  profile_image_url: string | null;  
  num_followers: number;        
  num_following: number;         
};

type Post = {
  id: number;
  caption: string;
  timestamp: string;
  profile: number;
  photos: Photo[];
};

type Photo = {
  id: number;
  image: string | null;
  timestamp: string;
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Token ${TOKEN}` };
  
    fetch(`${BASE_URL}/api/profiles/${PROFILE_ID}/`, { headers })
      .then(r => r.json())
      .then(prof => {
        console.log('profile:', JSON.stringify(prof));
        setProfile(prof);
        setPosts(prof.posts); 
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !profile) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={() => (
          <View style={styles.profileHeader}>
            {profile.profile_image_url && (
              <Image source={{ uri: profile.profile_image_url }} style={styles.avatar} />
            )}
            <Text style={styles.username}>{profile.username}</Text>
            <Text style={styles.bio}>{profile.bio_text}</Text>
            <View style={styles.stats}>
              <Text style={styles.stat}>{profile.num_followers} Followers</Text>
              <Text style={styles.stat}>{profile.num_following} Following</Text>
            </View>
            <Text style={styles.postsTitle}>Posts</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.photos?.[0]?.image && (
                <Image 
                  source={{ uri: `https://cs-webapps.bu.edu${item.photos[0].image}` }} 
                  style={styles.postImage} 
                />
              )}
            <Text style={styles.postText}>{item.caption}</Text>
            <Text style={styles.date}>
              {new Date(item.timestamp).toLocaleDateString()}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#fff' },
  profileHeader: { alignItems: 'center', padding: 24, borderBottomWidth: 1, borderColor: '#eee' },
  avatar:        { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  username:      { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  bio:           { color: '#555', textAlign: 'center', marginBottom: 12 },
  stats:         { flexDirection: 'row', gap: 24 },
  stat:          { fontWeight: '600' },
  postsTitle:    { fontSize: 18, fontWeight: 'bold', marginTop: 20, alignSelf: 'flex-start' },
  card:          { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  postImage:     { width: '100%', height: 180, borderRadius: 8, marginBottom: 8 },
  postText:      { fontSize: 15, marginBottom: 4 },
  date:          { color: '#888', fontSize: 12 },
});