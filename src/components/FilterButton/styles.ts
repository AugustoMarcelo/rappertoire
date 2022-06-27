import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 20,
    width: 20,
    backgroundColor: theme.colors.lightBlue[800],
    padding: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: 9,
    fontFamily: theme.fonts.bold,
  },
});
