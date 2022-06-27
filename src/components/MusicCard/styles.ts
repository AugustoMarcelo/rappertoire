import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  number: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.lightBlue[800],
    fontSize: 28,
    minWidth: 40,
  },
  info: {
    marginLeft: 24,
  },
  title: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.lightBlue[500],
    fontSize: 16,
    marginBottom: 2,
  },
  style: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.gray[500],
  },
  icon: {
    marginLeft: 'auto',
  },
});
