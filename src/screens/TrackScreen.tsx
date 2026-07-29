import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { tracks } from '../data/tracks';


const TracksScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.page}>
      <View style={styles.ipod}>
        <View style={styles.screen}>
          <View style={styles.statusBar}>
            <Text style={styles.statusBarText}>SONGS</Text>
            <Text>🔋</Text>
          </View>
          <View style={styles.menuRow}>
            <FlatList
              style={styles.itensContainer}
              data={tracks}
              keyExtractor={(item, index) => item.title ?? String(index)}
              renderItem={({ item }) => (
                <Pressable style={styles.trackRow} onPress={() => navigation.navigate('Songs')}>
                  <Text style={styles.trackName}>{item.title}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
        <View style={styles.clickWhell}>
          <Text style={[styles.labelBase, styles.menu]}>MENU</Text>
          <Text style={[styles.labelBase, styles.prev]}>⏮</Text>
          <Text style={[styles.labelBase, styles.next]}>⏭</Text>
          <Text style={[styles.labelBase, styles.play]}>▶</Text>
          <View style={[styles.centerButton]}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#4D3B36',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ipod: {
    width: '80%',
    backgroundColor: '#F0EAD6',
    borderRadius: 32,
    shadowColor: '#000000',
    shadowRadius: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24

  },
  screen: {
    width: '100%',
    height: 240,
    backgroundColor: '#D6D9E8',
    borderWidth: 3,
    borderColor: '#2A2A2A',
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#EB613B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center'
  },
  statusBarText: {
    color: '#E8E2CE',
    fontSize: 8,
    fontFamily: 'PressStart2P-Regular'
  },
  menuRow: {
   flex: 1,
   width: '100%',
  },
  clickWhell: {
    width: 220,
    height: 220,
    backgroundColor: '#E8E2CE',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerButton: {
    width: 80,
    height: 80,
    backgroundColor: '#F8F5CE',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  labelBase: {
    position: 'absolute',
    fontSize: 10,
    fontFamily: 'PressStart2P-Regular',
    fontWeight: 'bold',
    color: '#6B6B6B'
  },
  menu: {
    top: 14
  },
  play: {
    bottom: 14
  },
  prev: {
    left: 18
  },
  next: {
    right: 18
  },
  itensContainer: {
   flex: 1,
   width: '100%',
  },
  trackRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#5C4A42',

  },
  trackName: {
    fontFamily: 'PressStart2P-Regular',
    fontSize: 10,
    color: '#4D3B36',
  },
});

export default TracksScreen;