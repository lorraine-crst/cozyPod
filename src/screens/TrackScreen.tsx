import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { tracks } from '../data/tracks';
import IpodShell from '../components/IpodShell';
import IpodScreen from '../components/IpodScreen';
import ClickWheel from '../components/ClickWheel';
import { usePlaybackToggle } from '../hooks/usePlaybackToggle';
import { colors, fonts } from '../theme';
const TracksScreen = ({ navigation }: { navigation: any }) => {
  const { isPlaying } = usePlaybackToggle();
  const [selectedId, setSelectedId] = useState(tracks[0]?.id ?? null);

  function playTrack(id: string) {
    setSelectedId(id);
    navigation.navigate('Now Playing', { trackId: id });
  }

  function confirmSelection() {
    if (!selectedId) return;
    navigation.navigate('Now Playing', { trackId: selectedId });
  }

  return (
    <IpodShell>
      <IpodScreen title="SONGS">
        <View style={styles.menuRow}>
          <FlatList
            style={styles.itensContainer}
            data={tracks}
            extraData={selectedId}
            keyExtractor={(item, index) => item.title ?? String(index)}
            renderItem={({ item }) => {
              const selected = item.id === selectedId;
              return (
                <Pressable
                  style={[styles.trackRow, selected && styles.trackRowSelected]}
                  onPress={() => playTrack(item.id)}>
                  <Text style={[styles.trackName, selected && styles.trackNameSelected]}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </IpodScreen>
      <ClickWheel
        onMenu={() => navigation.popToTop()}
        onSelect={confirmSelection}
        onPlay={confirmSelection}
        isPlaying={isPlaying}
      />
    </IpodShell>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    flex: 1,
    width: '100%',
  },
  itensContainer: {
    flex: 1,
    width: '100%',
  },
  trackRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.trackBorder,
  },
  trackRowSelected: {
    backgroundColor: colors.header,
  },
  trackName: {
    fontFamily: fonts.pixel,
    fontSize: 10,
    color: colors.trackText,
  },
  trackNameSelected: {
    color: colors.headerText,
  },
});

export default TracksScreen;