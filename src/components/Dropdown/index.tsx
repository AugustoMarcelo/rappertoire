import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from 'react-native-dropdown-picker';
import { theme } from '../../theme';
import { styles } from './styles';

type Props = DropDownPickerProps<ValueType> & {
  label?: string;
};

export function Dropdown({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <DropDownPicker
        labelStyle={styles.labelStyle}
        dropDownDirection="BOTTOM"
        placeholder="Selecione um estilo"
        listMode="MODAL"
        style={styles.style}
        ArrowDownIconComponent={() => (
          <Feather
            name="chevron-down"
            size={24}
            color={theme.colors.lightBlue[500]}
          />
        )}
        ArrowUpIconComponent={() => (
          <Feather
            name="chevron-up"
            size={24}
            color={theme.colors.lightBlue[500]}
          />
        )}
        TickIconComponent={() => (
          <Feather name="check" size={20} color={theme.colors.lightBlue[500]} />
        )}
        textStyle={styles.textStyle}
        {...rest}
      />
    </View>
  );
}
