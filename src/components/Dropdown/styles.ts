import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[400],
    fontSize: 13,
  },
  style: {
    paddingTop: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  labelStyle: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.black[100],
    fontSize: 14,
  },
  textStyle: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[400],
    fontSize: 12,
  },
  styleError: {
    borderColor: theme.colors.error[600],
  },
  labelError: {
    color: theme.colors.error[600],
  },
  error: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.error[600],
    fontSize: 11,
  },
});
