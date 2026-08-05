import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { tracks } from '../data/tracks';
import IpodShell from '../components/IpodShell';
import IpodScreen from '../components/IpodScreen';
import ClickWheel from '../components/ClickWheel';
import { usePlaybackToggle } from '../hooks/usePlaybackToggle';
import { colors, fonts } from '../theme';

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
  const { isPlaying, togglePlay } = usePlaybackToggle();

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

  const songs = tracks.filter(t => t.album);
  const currentIndex = songs.findIndex(s => s.id === track?.id);

  function goToNext() {
    if (currentIndex === -1) return;
    const next = songs[(currentIndex + 1) % songs.length];
    navigation.setParams({ trackId: next.id });
  }

  function goToPrev() {
    if (currentIndex === -1) return;
    const prev = songs[(currentIndex - 1 + songs.length) % songs.length];
    navigation.setParams({ trackId: prev.id });
  }

  return (
    <IpodShell>
      <IpodScreen title="PLAYING NOW">
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
      </IpodScreen>
      <ClickWheel
        onMenu={() => navigation.popToTop()}
        onPrev={goToPrev}
        onNext={goToNext}
        onPlay={togglePlay}
        isPlaying={isPlaying}
      />
    </IpodShell>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nowPlaying: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
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
  trackTitle: {
    fontWeight: 'bold',
    fontFamily: fonts.pixel,
  },
  trackArtist: {
    fontSize: 9,
    color: '#2A2A2A',
    fontFamily: fonts.pixel,
  },
  trackAlbum: {
    fontSize: 8,
    color: colors.label,
    fontFamily: fonts.pixel,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 2,
  },
});

export default MusicScreen;