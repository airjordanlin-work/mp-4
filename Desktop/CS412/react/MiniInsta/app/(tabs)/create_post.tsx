/*create_profile.tsx 

A screen that allows users to submit a new dad joke to the database.
Collects the joke text and contributor name, then POSTs to the REST API.

@author: Jordan Lin
*/
import React, { useState } from 'react';
import {
   Text, TextInput, TouchableOpacity,
   Alert, ActivityIndicator, Image as RNImage,
} from 'react-native';
import { TOKEN, PROFILE_ID, BASE_URL } from '../../constants/Auth';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { styles } from '../../assets/my_styles'



export default function CreatePostScreen() {
  const [text, setText]       = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  async function pickImage(){
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if(!result.canceled){
      setImage(result.assets[0]);
    }
  }
async function handleSubmit() {
  // prevent submitting if both caption and image are empty
  if (!text.trim() && !image) {
    Alert.alert('Error', 'Please add a caption or image.');
    return;
  }

  setLoading(true);

  try {
    // Build FormData with caption, profile, and optional image
    const formData = new FormData();
    formData.append('caption', text);
    formData.append('profile', String(PROFILE_ID));

    // Attach image if selected
    if (image) {
      formData.append('image_file', {
        uri: image.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);
    }

    // Send everything in one request to the create endpoint
    const postRes = await fetch(`${BASE_URL}/api/posts/create/`, {
      method: 'POST',
      headers: { Authorization: `Token ${TOKEN}` },
      body: formData,
    });

    console.log('post status:', postRes.status);
    const post = await postRes.json();
    console.log('post response:', JSON.stringify(post));

    if (!postRes.ok) {
      Alert.alert('Error', JSON.stringify(post));
      return;
    }

    Alert.alert('Success', 'Post created!');
    setText('');
    setImage(null);

  } catch (err) {
    console.log('caught error:', err);
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

      {image && (
        <RNImage source={{ uri: image.uri }} style={styles.preview} />
      )}

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>
          {image ? 'Change Image' : 'Choose Image'} {/* label changes based on whether image is selected */}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Post</Text>
        }
      </TouchableOpacity>
    </SafeAreaView>
  );
}

