import Feather from '@expo/vector-icons/Feather';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface MusicCardProps {
  id: number;
  number: number;
  title: string;
  style: string;
  onClick: () => void;
}

export function MusicCard(props: MusicCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <Text style={styles.number}>{String(props.number).padStart(2, '0')}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.style}>{props.style}</Text>
      </View>
      <View style={styles.icon}>
        <Feather
          name="chevron-right"
          size={28}
          color={theme.colors.lightBlue[500]}
        />
      </View>
    </TouchableOpacity>
  );
}
