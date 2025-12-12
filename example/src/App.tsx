import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Gallery from 'react-native-zoom-gallery';

const data = ['#FF0000', '#00FF00', '#0000FF'];

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Gallery
        data={data}
        renderItem={(item) => (
          <View style={[styles.item, { backgroundColor: item }]} />
        )}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
  },
});
