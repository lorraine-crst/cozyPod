import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import TrackPlayer, { useProgress, usePlaybackState, State } from 'react-native-track-player';
import { tracks } from '../data/tracks';

const albuns = [
  require('../../assets/imgs/img1.jpeg'),
  require('../../assets/imgs/img2.jpeg'),
  require('../../assets/imgs/img3.jpeg'),
  require('../../assets/imgs/img4.jpeg'),
  require('../../assets/imgs/img5.jpeg'),
  require('../../assets/imgs/img6.jpeg'),
  require('../../assets/imgs/img6.jpeg'),
];

const MusicScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { trackId } = route.params ?? {};
  const track = trackId ? tracks.find(t => t.id === trackId) : tracks[0];

  const [indiceAlbum, setIndiceAlbum] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndiceAlbum(atual => (atual + 1) % albuns.length);
    }, 1 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const { position, duration } = useProgress();
  const playbackState = usePlaybackState();
  const isPlaying = playbackState.state === State.Playing;

  useEffect(() => {
    if (!track) return;
    let mounted = true;
    (async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: track.id,
        url: track.url,
        title: track.title,
        artist: track.artist,
      });
      if (mounted) await TrackPlayer.play();
    })();
    return () => { mounted = false; };
  }, [trackId]);

  function togglePlay() {
    isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
  }

  function fmt(t: number) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  if (!track) {
    return (
      <View style={styles.page}>
        <Text style={{ color: '#F0EAD6' }}>Faixa não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.ipod}>
        <View style={styles.screen}>
          <View style={styles.statusBar}>
            <Text style={styles.statusBarText}>PLAYING NOW</Text>
            <Text>🔋</Text>
          </View>
          <View style={styles.menuRow}>
            <View style={styles.nowPlaying}>
              <Image style={styles.albumArt} source={albuns[indiceAlbum]} />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackArtist}>{track.artist}</Text>
                <Text style={styles.trackAlbum}>{track.album}</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: duration ? `${(position / duration) * 100}%` : '0%' },
                ]}
              />
            </View>
            <View style={styles.timeRow}>
              <Text>{fmt(position)}</Text>
              <Text>{fmt(duration)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.clickWhell}>
          <Pressable style={[styles.labelBase, styles.menu]} onPress={() => navigation.popToTop()}>
            <Text style={styles.labelText}>MENU</Text>
          </Pressable>
          <Text style={[styles.labelBase, styles.prev]}>⏮</Text>
          <Text style={[styles.labelBase, styles.next]}>⏭</Text>
          <Pressable style={[styles.labelBase, styles.play]} onPress={togglePlay}>
            <Text style={styles.labelText}>{isPlaying ? '⏸' : '▶'}</Text>
          </Pressable>
          <View style={styles.centerButton} />
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
    shadowRadius: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
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
    alignItems: 'center',
  },
  statusBarText: {
    color: '#E8E2CE',
    fontSize: 8,
    fontFamily: 'PressStart2P-Regular',
  },
  nowPlaying: {
    display: 'flex',
    gap: 8,
    marginTop: 4,
    flexDirection: 'row',
  },
  menuRow: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  albumArt: {
    width: '40%',
    aspectRatio: 1,
    borderRadius: 4,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  trackCount: {
    fontSize: 8,
    color: '#6B6B6B',
  },
  trackTitle: {
    fontWeight: 'bold',
    fontFamily: 'PressStart2P-Regular',
  },
  trackArtist: {
    fontSize: 9,
    color: '#2A2A2A',
    fontFamily: 'PressStart2P-Regular',
  },
  trackAlbum: {
    fontSize: 8,
    color: '#6B6B6B',
    fontFamily: 'PressStart2P-Regular',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#B8BCD0',
    borderRadius: 2,
    marginTop: 17,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A4A8A',
    borderRadius: 2,
  },
  timeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: 2,
  },
  clickWhell: {
    width: 220,
    height: 220,
    backgroundColor: '#E8E2CE',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 80,
    height: 80,
    backgroundColor: '#F8F5CE',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  labelBase: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6B6B6B',
  },
  labelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B6B6B',
  },
  menu: {
    top: 14,
  },
  play: {
    bottom: 14,
  },
  prev: {
    left: 18,
  },
  next: {
    right: 18,
  },
});

export default MusicScreen;