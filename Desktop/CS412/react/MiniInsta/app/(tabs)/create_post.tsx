/**
 * create_post.tsx
 * 
 * A screen that allows logged-in users to create a new post.
 * Users can type a caption, optionally pick an image from their
 * photo library, and submit the post to the backend API.
 * 
 * @author Jordan Lin
 */
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image as RNImage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../../assets/my_styles';
import { useAuth } from '../../constants/AuthContext';
import { BASE_URL } from '../../constants/Auth';


  // Get the auth token and profile ID from global auth context
  // These were set during login and are needed to make authenticated API calls
export default function CreatePostScreen() {
  const [text, setText]   = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { token, profileId } = useAuth();


  /**
   * Opens the device's photo library and lets the user pick an image.
   * If the user selects an image (doesn't cancel), store it in state.
   */
  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0]);
  }


  /**
   * Handles the form submission when the user presses "Post".
   * Builds a FormData object with the caption, profile ID, and optional image,
   * then sends a POST request to the backend API to create the post.
   * 
   * FormData is used instead of JSON because we need to upload a file (image).
   */
  async function handleSubmit() {
    if (!text.trim() && !image) {
      Alert.alert('Error', 'Please add a caption or image.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('caption', text);
      formData.append('profile', String(profileId));
      if (image) {
        formData.append('image_file', {
          uri: image.uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as any);
      }
      const postRes = await fetch(`${BASE_URL}/api/posts/create/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}` },
        body: formData,
      });
      const post = await postRes.json();
      if (!postRes.ok) { Alert.alert('Error', JSON.stringify(post)); return; }
      Alert.alert('Success', 'Post created!');
      setText('');
      setImage(null);
    } catch (err) {
      Alert.alert('Error', String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Put caption here..."
        multiline
        value={text}
        onChangeText={setText}
      />
      {image && <RNImage source={{ uri: image.uri }} style={styles.preview} />}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>{image ? 'Change Image' : 'Choose Image'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Post</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}