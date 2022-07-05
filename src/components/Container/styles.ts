import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.black[50],
    zIndex: 100,
    opacity: 0.7,
  },
  loadingMessage: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    marginTop: 8,
    fontSize: 16,
  },
});
