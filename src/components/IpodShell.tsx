import { View } from 'react-native';
import React from 'react';
import { shell } from '../styles/shell';

const IpodShell = ({ children }: { children: React.ReactNode }) => (
  <View style={shell.page}>
    <View style={shell.ipod}>{children}</View>
  </View>
);

export default IpodShell;