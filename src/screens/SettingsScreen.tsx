import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
    const [clickSoundAtivo, setClickSoundAtivo] = useState(true);
    const [volumeAtivo, setVolumeAtivo] = useState(true);

    useEffect(() => {
        TrackPlayer.getVolume().then(vol => setVolumeAtivo(vol > 0));
    }, []);

    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;

    function toggleVolume() {
        setVolumeAtivo(atual => {
            const novoValor = !atual;
            TrackPlayer.setVolume(novoValor ? 1 : 0);
            return novoValor;
        });
    }

    function togglePlay() {
        isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    }

    return (
        <View style={styles.page}>
            <View style={styles.ipod}>
                <View style={styles.screen}>
                    <View style={styles.statusBar}>
                        <Text style={styles.statusBarText}>MENU</Text>
                        <Text>🔋</Text>
                    </View>
                    <View style={styles.menuRow}>
                        <Pressable
                            style={styles.menuOptions}
                            onPress={toggleVolume}>
                            <Text style={styles.textOption}>Volume</Text>
                            <Text style={styles.labelText}>{volumeAtivo ? '✓' : 'X'}</Text>
                        </Pressable>
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
        width: '100%',
        marginTop: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 4
    },
    menuOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8
    },
    menuOptionSelected: {
        backgroundColor: '#EB613B',
    },
    textOption: {
        fontFamily: 'PressStart2P-Regular',
        fontSize: 10,
        paddingVertical: 13
    },
    textOptionSelected: {
        color: '#E8E2CE'
    },
    iconOption: {
        fontFamily: 'PressStart2P-Regular',
        fontSize: 10
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
    labelText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#6B6B6B',
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
    }
});

export default SettingsScreen;