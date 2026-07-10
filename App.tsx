import {View, Text, Image, StyleSheet} from 'react-native';

const Flex = () => {
  return (
    <View style={styles.page}>
      <View style={styles.ipod}>
        <View style={styles.screen}>
          <View style={styles.statusBar}>
            <Text>▶</Text>
            <Text>Now Playing</Text>
            <Text>🔋</Text>
          </View>
          <View style={styles.nowPlaying}>
            <Image style={styles.albumArt} source={require('./assets/album.jpg')} />
            <View style={styles.trackInfo}>
              <Text style={styles.trackCount}>60/100</Text>
              <Text style={styles.trackTitle}>titulo da musica</Text>
              <Text style={styles.trackArtist}>artista</Text>
              <Text style={styles.trackAlbum}>album</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill}></View>
          </View>
          <View style={styles.timeRow}>
            <Text>0:29</Text>
            <Text>2:30</Text>
          </View>
        </View>
        <View style={styles.clickWhell}>
        <Text style={[styles.labelBase, styles.menu]}>MENU</Text>
        <Text style={[styles.labelBase, styles.prev]}>⏮</Text>
        <Text style={[styles.labelBase, styles.next]}>⏭</Text>
        <Text style={[styles.labelBase, styles.play]}>▶</Text>
        <Text style={[styles.labelBase, styles.centerButton]}></Text>
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
    alignItems: 'center',
  },
  ipod: {
    width: '80%',
    backgroundColor: '#F0EAD6',
    borderRadius: 32,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24

  },
  screen: {
    width: '100%',
    height: 180,
    backgroundColor: '#D6D9E8',
    borderWidth: 3,
    borderColor: '#2A2A2A',
    borderStyle: 'solid',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 8,
    fontFamily: 'PressStart2P-Regular'
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  nowPlaying: {
    display: 'flex',
    gap: 8,
    marginTop: 4,
    flexDirection: 'row'
  },
  albumArt: {
    width: 56,
    height: 56,
    borderRadius: 4
  },
  trackInfo:{
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center'
  },
  trackCount: {
    fontSize: 8,
    color: '#6B6B6B'
  },
  trackTitle: {
    fontWeight: 'bold'
  },
  trackArtist: {
    fontSize: 9,
    color: '#2A2A2A'
  },
  trackAlbum: {
    fontSize: 8,
    color: '#6B6B6B'
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#B8BCD0',
    borderRadius: 2,
    marginTop: 6
  },
  progressFill: {
    width: '20%',
    height: '100%',
    backgroundColor: '#4A4A8A',
    borderRadius: 2
  },
  timeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: 2
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
    fontSize: 12,
    fontFamily: 'PressStart2P-Regular',
    fontWeight: 'bold',
    color: '#6B6B6B'
  },
  menu: {
    top:14
  },
  play: {
    bottom: 14
  },
  prev: {
    left: 18
  },
  next: {
    right: 18
  }
});

export default Flex;
