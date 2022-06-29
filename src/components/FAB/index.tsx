import Feather from '@expo/vector-icons/Feather';
import { TouchableHighlight, TouchableOpacityProps } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface FABProps extends TouchableOpacityProps {
  icon: keyof typeof Feather.glyphMap;
}

export function FAB({ icon, ...rest }: FABProps) {
  return (
    <TouchableHighlight {...rest} style={[styles.button, rest.style]}>
      <Feather name={icon} size={24} color={theme.colors.white} />
    </TouchableHighlight>
  );
}
