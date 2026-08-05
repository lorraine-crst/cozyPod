import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';

export function usePlaybackToggle() {
  const playbackState = usePlaybackState();
  const isPlaying = playbackState.state === State.Playing;

  function togglePlay() {
    isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
  }

  return { isPlaying, togglePlay };
}