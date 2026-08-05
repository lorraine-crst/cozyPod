import { View, Text } from 'react-native';
import React from 'react';
import { shell } from '../styles/shell';

const IpodScreen = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={shell.screen}>
    <View style={shell.statusBar}>
      <Text style={shell.statusBarText}>{title}</Text>
      <Text>🔋</Text>
    </View>
    {children}
  </View>
);

export default IpodScreen;