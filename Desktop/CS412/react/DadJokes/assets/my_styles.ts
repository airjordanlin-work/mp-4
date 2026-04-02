import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },

  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
  jokeCard: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  jokeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  contributor: {
    fontSize: 13,
    fontStyle: 'italic',
    opacity: 0.7,
  },

  // Index Screen
  jokeContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },

  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    minHeight: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});