import { StatusBar, StyleSheet } from 'react-native';
import { theme } from './../../theme/index';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 16 + StatusBar.currentHeight! ?? 32,
    paddingBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.lightBlue[500],
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    fontFamily: theme.fonts.light,
    fontSize: 14,
    color: theme.colors.white,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    color: theme.colors.white,
  },
  selectionTitle: {
    fontSize: 18,
  },
});
