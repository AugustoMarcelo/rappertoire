import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../../theme';
import { getMusicStyles } from '../../utils/getMusicStyles';
import { Input } from '../Input';

export function Form() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getMusicStyles);
  return (
    <View style={{ marginTop: 36 }}>
      <Input label="Nome da música" />
      <Input label="Número" keyboardType="numeric" />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        labelStyle={{
          fontFamily: theme.fonts.regular,
          color: theme.colors.black[100],
          fontSize: 14,
        }}
        dropDownDirection="BOTTOM"
        placeholder="Selecione um estilo"
        listMode="MODAL"
        style={{
          paddingTop: 0,
          paddingHorizontal: 0,
          marginBottom: 16,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: theme.colors.gray[200],
        }}
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
        textStyle={{
          fontFamily: theme.fonts.regular,
          color: theme.colors.gray[400],
          fontSize: 12,
        }}
      />
      <TouchableOpacity
        style={{
          marginTop: 8,
          alignSelf: 'flex-end',
        }}
        onPress={() => console.log('salvar')}
      >
        <Text
          style={{
            fontFamily: theme.fonts.bold,
            color: theme.colors.lightBlue[800],
          }}
        >
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
