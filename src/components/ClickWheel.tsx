import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { shell } from '../styles/shell';

type Props = {
  onMenu?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onPlay: () => void;
  onSelect?: () => void;
  isPlaying: boolean;
};

const ClickWheel = ({ onMenu, onPrev, onNext, onPlay, onSelect, isPlaying }: Props) => (
  <View style={shell.clickWheel}>
    <Pressable style={[shell.labelBase, shell.menu]} onPress={onMenu} disabled={!onMenu}>
      <Text style={shell.labelText}>MENU</Text>
    </Pressable>
    <Pressable style={[shell.labelBase, shell.prev]} onPress={onPrev} disabled={!onPrev}>
      <Text style={shell.labelText}>⏮</Text>
    </Pressable>
    <Pressable style={[shell.labelBase, shell.next]} onPress={onNext} disabled={!onNext}>
      <Text style={shell.labelText}>⏭</Text>
    </Pressable>
    <Pressable style={[shell.labelBase, shell.play]} onPress={onPlay}>
      <Text style={shell.labelText}>{isPlaying ? '⏸' : '▶'}</Text>
    </Pressable>
    <Pressable style={shell.centerButton} onPress={onSelect} disabled={!onSelect} />
  </View>
);

export default ClickWheel;