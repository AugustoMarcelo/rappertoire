import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

interface Props extends TextInputProps {
  label: string;
  hasErrors?: string;
}

export function Input({ label, hasErrors, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, hasErrors ? styles.labelError : {}]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, hasErrors ? styles.inputError : {}]}
        {...rest}
      />
      {!!hasErrors && <Text style={styles.error}>{hasErrors}</Text>}
    </View>
  );
}
