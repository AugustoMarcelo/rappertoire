import Feather from '@expo/vector-icons/Feather';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface MusicCardProps extends TouchableOpacityProps {
  id: number;
  number: number;
  title: string;
  musicStyle: string;
  isSelected: boolean;
}

export function MusicCard({
  id,
  number,
  title,
  musicStyle,
  isSelected = false,
  ...rest
}: MusicCardProps) {
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.container, isSelected ? styles.containerSelected : {}]}
    >
      <Text style={styles.number}>{String(number).padStart(2, '0')}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.style}>{musicStyle}</Text>
      </View>
      <View style={styles.icon}>
        {isSelected ? (
          <Feather name="check" size={28} color={theme.colors.green[500]} />
        ) : (
          <Feather
            name="chevron-right"
            size={28}
            color={theme.colors.lightBlue[500]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
