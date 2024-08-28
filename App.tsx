import { StyleSheet, Text, View } from 'react-native';
import Grid from './Grid';

export default function App() {
  return (
    <View style={styles.container}>
      <Grid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 700,
    height: 400,
    backgroundColor: '#fff',
  },
  grid: {
    width: 700,
    height: 400,
  },
});
