import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface FilterButtonProps {
  onPress: () => void;
  badgeValue?: number;
}

export function FilterButton({ onPress, badgeValue }: FilterButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ position: 'relative' }}>
      <Feather name="filter" size={32} color={theme.colors.white} />
      {badgeValue && (
        <View style={styles.container}>
          <Text style={styles.text}>{badgeValue}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
