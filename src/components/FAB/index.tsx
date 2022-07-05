import Feather from '@expo/vector-icons/Feather';
import {
  ColorValue,
  TouchableHighlight,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface FABProps extends TouchableOpacityProps {
  icon: keyof typeof Feather.glyphMap;
  backgroundColor?: ColorValue;
}

export function FAB({ icon, backgroundColor, ...rest }: FABProps) {
  return (
    <TouchableHighlight
      {...rest}
      style={[
        styles.button,
        backgroundColor ? { backgroundColor: backgroundColor } : {},
        rest.style,
      ]}
    >
      <Feather name={icon} size={24} color={theme.colors.white} />
    </TouchableHighlight>
  );
}
