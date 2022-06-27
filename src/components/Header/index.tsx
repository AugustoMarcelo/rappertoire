import { Text, View } from 'react-native';
import { FilterButton } from '../FilterButton';
import { styles } from './styles';

interface HeaderProps {
  onPressFilterButton: () => void;
}

export function Header({ onPressFilterButton }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Repertório</Text>
        <Text style={styles.info}>22 músicas</Text>
      </View>
      <FilterButton onPress={onPressFilterButton} />
    </View>
  );
}
