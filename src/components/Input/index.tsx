import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

interface Props extends TextInputProps {
  label: string;
  hasErrors?: string;
  inputRef?: React.LegacyRef<TextInput>;
}

export function Input({ label, inputRef, hasErrors, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, hasErrors ? styles.labelError : {}]}>
        {label}
      </Text>
      <TextInput
        ref={inputRef}
        style={[styles.input, hasErrors ? styles.inputError : {}]}
        {...rest}
      />
      {!!hasErrors && <Text style={styles.error}>{hasErrors}</Text>}
    </View>
  );
}
