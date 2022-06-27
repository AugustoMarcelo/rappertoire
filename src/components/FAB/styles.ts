import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  button: {
    right: 24,
    bottom: 24,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.lightBlue[800],
    height: 64,
    width: 64,
    borderRadius: 32,
    elevation: 5,
  },
});
