import Feather from '@expo/vector-icons/Feather';
import { TouchableHighlight } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface FABProps {
  onOpen: () => void;
}

export function FAB({ onOpen }: FABProps) {
  return (
    <TouchableHighlight style={styles.button} onPress={onOpen}>
      <Feather name="plus" size={24} color={theme.colors.white} />
    </TouchableHighlight>
  );
}
