
//detail.tsx
//details tab displays more hobbies with more descriptions

import React from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
} from 'react-native';
import { styles } from '../../assets/my_styles';

export default function DetailScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>My Photo Gallery</Text>
      </View>

      <Text style={styles.tagText}>
        Welcome to my hobbies page
      </Text>

      <Image
        source={{
          uri: 'https://cs-people.bu.edu/airlin/images/snowboard.jpg',
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.cardBody}>
        I like to snowboard
      </Text>

      <Image
        source={{
          uri: 'https://cs-people.bu.edu/airlin/images/waterpolo.jpg',
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.cardBody}>
        I used to play on the varsity team in waterpolo during highschool.  
      </Text>

      <Image
        source={{
          uri: 'https://cs-people.bu.edu/airlin/images/travel.jpg',
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.cardBody}>
        I love to Travel and see the wonders of the world.
      </Text>

      {/* Fourth image */}
      <Image
        source={{
          uri: 'https://cs-people.bu.edu/airlin/images/wrestling.jpg',
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.cardBody}>
        I was varsity captain of my wrestling team, Sectionals and many placements in tournaments.
      </Text>


      <View style={styles.spacer} />
    </ScrollView>
  );
}