import {View, Text, FlatList, Pressable, StyleSheet} from 'react-native';
import {tracks} from '../data/tracks';

const TracksScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={tracks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            style={styles.trackRow}
            onPress={() => navigation.navigate('Songs')}>
            <Text style={styles.trackName}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#4D3B36',
  },
  trackRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  trackName: {
    fontFamily: 'PressStart2P-Regular',
    fontSize: 10,
    color: '#E8E2CE',
  },
});

export default TracksScreen;