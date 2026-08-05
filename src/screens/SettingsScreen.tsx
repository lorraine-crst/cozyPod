import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import IpodShell from '../components/IpodShell';
import IpodScreen from '../components/IpodScreen';
import ClickWheel from '../components/ClickWheel';
import { usePlaybackToggle } from '../hooks/usePlaybackToggle';
import { colors, fonts } from '../theme';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const [volumeAtivo, setVolumeAtivo] = useState(true);
  const { isPlaying, togglePlay } = usePlaybackToggle();

  useEffect(() => {
    TrackPlayer.getVolume().then(vol => setVolumeAtivo(vol > 0));
  }, []);

  function toggleVolume() {
    setVolumeAtivo(atual => {
      const novoValor = !atual;
      TrackPlayer.setVolume(novoValor ? 1 : 0);
      return novoValor;
    });
  }

  return (
    <IpodShell>
      <IpodScreen title="MENU">
        <View style={styles.menuRow}>
          <Pressable style={[styles.menuOptions, styles.menuOptionSelected]} onPress={toggleVolume}>
            <Text style={[styles.textOption, styles.textOptionSelected]}>Volume</Text>
            <Text style={[styles.labelText, styles.textOptionSelected]}>{volumeAtivo ? '✓' : 'X'}</Text>
          </Pressable>
        </View>
      </IpodScreen>
      <ClickWheel
        onMenu={() => navigation.popToTop()}
        onPlay={togglePlay}
        isPlaying={isPlaying}
      />
    </IpodShell>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    width: '100%',
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  menuOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuOptionSelected: {
    backgroundColor: colors.header,
  },
  textOption: {
    fontFamily: fonts.pixel,
    fontSize: 10,
    paddingVertical: 13,
  },
  textOptionSelected: {
    color: colors.headerText,
  },
  labelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6B6B6B',
  },
});

export default SettingsScreen;