/**
 * profile.tsx
 *
 * Displays the logged-in user's own profile page.
 * Shows their profile picture, username, bio, follower/following counts,
 * and a scrollable list of all their posts.
 *
 * @author Jordan Lin
 */
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuth } from '../../constants/AuthContext';
import { BASE_URL } from '../../constants/Auth';
import { styles } from '../../assets/my_styles';

type Photo   = { id: number; image: string | null; timestamp: string };
type Post    = { id: number; caption: string; timestamp: string; profile: number; photos: Photo[] };
type Profile = { id: number; username: string; display_name: string; bio_text: string; profile_image_url: string | null; num_followers: number; num_following: number };

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, profileId }  = useAuth();

  /**
   * The profile response includes both profile info and their posts array.
   */
  useEffect(() => {
    fetch(`${BASE_URL}/api/profiles/${profileId}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(r => r.json())
      .then(prof => { setProfile(prof); setPosts(prof.posts); })
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
              <Image source={{ uri: `https://cs-webapps.bu.edu${item.photos[0].image}` }} style={styles.postImage} />
            )}
            <Text style={styles.postText}>{item.caption}</Text>
            <Text style={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
