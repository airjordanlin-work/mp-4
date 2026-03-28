//my_styles.ts
//contains all necessary styling

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  
  detailText: {
    fontSize: 16,
    paddingHorizontal: 20,
    marginVertical: 15,
    lineHeight: 24,
    color: '#333',
  },
  
  image: {
    width: width,
    height: 250,
    marginVertical: 10,
  },
  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  header: {
    fontSize: 30,
    paddingHorizontal: 20,
    marginVertical: 15,
    lineHeight: 24,
    color: '#333',
  },
  
  spacer: {
    height: 30,
  },
  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: '#ff3c00',
    borderRadius: 2,
    marginBottom: 16,
  },
  tagText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },


  cardBody: {
    padding: 20,
  },

  tag: {
    backgroundColor: '#ff3c00',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 32,
  },

  card: {
    backgroundColor: '#141414',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  
});