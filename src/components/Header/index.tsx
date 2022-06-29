import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { FilterButton } from '../FilterButton';
import { styles } from './styles';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onPressFilterButton: () => void;
  filterProps?: {
    badgeValue: number;
  };
  isSelectionHeader: boolean;
  onPressClearSelection: () => void;
}

export function Header({
  title = 'Repertório',
  subtitle,
  filterProps,
  isSelectionHeader,
  onPressFilterButton,
  onPressClearSelection,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{subtitle}</Text>
      </View>
      {isSelectionHeader ? (
        <TouchableOpacity onPress={onPressClearSelection}>
          <Feather name="x" size={32} color={theme.colors.white} />
        </TouchableOpacity>
      ) : (
        <FilterButton
          onPress={onPressFilterButton}
          badgeValue={filterProps?.badgeValue}
        />
      )}
    </View>
  );
}
