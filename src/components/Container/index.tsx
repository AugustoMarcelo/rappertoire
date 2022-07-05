import { ReactNode } from 'react';
import { ActivityIndicator, Text, View, ViewProps } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface ContainerProps extends ViewProps {
  children: ReactNode;
  isLoading: boolean;
  loadingMessage?: string;
}

export function Container({
  children,
  isLoading,
  loadingMessage = 'Ordenando as músicas...',
}: ContainerProps) {
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.shadow}>
          <ActivityIndicator size={48} color={theme.colors.white} />
          <Text style={styles.loadingMessage}>{loadingMessage}</Text>
        </View>
      )}
      {children}
    </View>
  );
}
