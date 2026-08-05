import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import IpodShell from '../components/IpodShell';
import IpodScreen from '../components/IpodScreen';
import ClickWheel from '../components/ClickWheel';
import { usePlaybackToggle } from '../hooks/usePlaybackToggle';
import { colors, fonts } from '../theme';

const OPTIONS = [
  { key: 'Now Playing', label: 'Now Playing', route: 'Now Playing' },
  { key: 'Songs', label: 'Songs', route: 'Songs' },
  { key: 'Setting', label: 'Settings', route: 'Settings' },
];

const OptionsScreen = ({ navigation }: { navigation: any }) => {
  const [selecionado, setSelecionado] = useState('Now Playing');
  const { isPlaying, togglePlay } = usePlaybackToggle();

  return (
    <IpodShell>
      <IpodScreen title="MENU">
        <View style={styles.menuRow}>
          {OPTIONS.map(opt => (
            <Pressable
              key={opt.key}
              style={[styles.menuOptions, selecionado === opt.key && styles.menuOptionSelected]}
              onPress={() => { setSelecionado(opt.key); navigation.navigate(opt.route); }}>
              <Text style={[styles.textOption, selecionado === opt.key && styles.textOptionSelected]}>
                {opt.label}
              </Text>
              <Text style={[styles.iconOption, selecionado === opt.key && styles.textOptionSelected]}>▶</Text>
            </Pressable>
          ))}
        </View>
      </IpodScreen>
      <ClickWheel onPlay={togglePlay} isPlaying={isPlaying} />
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
  iconOption: {
    fontFamily: fonts.pixel,
    fontSize: 10,
  },
});

export default OptionsScreen;