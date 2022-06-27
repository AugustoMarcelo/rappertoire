import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[200],
    fontFamily: theme.fonts.regular,
  },
  label: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[400],
    fontSize: 12,
  },
});
