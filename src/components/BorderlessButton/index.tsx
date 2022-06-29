import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

interface BorderlessButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function BorderlessButton({
  label,
  onPress,
  variant = 'primary',
  ...rest
}: BorderlessButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      style={[rest.style, styles.container]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          variant === 'secondary' ? styles.textSecondary : {},
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
