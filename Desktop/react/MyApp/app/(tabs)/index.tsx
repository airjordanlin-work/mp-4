//index.tsx
//Interests tab displays hobbies


import { styles } from '../../assets/my_styles';
import { Text, View, Image } from '@/components/Themed';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.accentLine} />
      <Text style={styles.title}>Interests</Text>
      <Text style={styles.subtitle}>What drives me</Text>

      <View style={styles.card}>
        <Image
          source={require('../../assets/images/bboy.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.cardBody}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Breaking</Text>
          </View>
          <Text style={styles.detailText}>
            Breaking is one of them — can't wait to be able to spin on my head.
          </Text>
        </View>
      </View>
    </View>
  );
}