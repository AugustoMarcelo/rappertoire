import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  text: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.lightBlue[800],
  },
  textSecondary: {
    color: theme.colors.gray[400],
  },
});
