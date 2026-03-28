
import { styles } from '../../assets/my_styles';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View, Image } from '@/components/Themed';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <View style={styles.card}>
      <Image
        source={{
          uri: 'https://cs-people.bu.edu/airlin/images/me.jpg',
        }}
        style={styles.image}

      />
        <View style={styles.cardBody}>
          <Text style={styles.detailText}>
            I am Jordan Lin, a senior studying computer science at Boston University.  My number one goal right now is to get a Job and be able to hit a airflare combo into a windmill then baby airfreeze to handstand.
          </Text>
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}



