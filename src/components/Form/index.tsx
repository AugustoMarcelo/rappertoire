import { useState } from 'react';
import { View } from 'react-native';
import { CreateDTO } from '../../storage/IStorage';
import { getMusicStyles } from '../../utils/getMusicStyles';
import { BorderlessButton } from '../BorderlessButton';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';

interface FormProps {
  onSubmit: (data: CreateDTO) => void;
}

export function Form({ onSubmit }: FormProps) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState('');
  const [items, setItems] = useState(getMusicStyles);

  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');

  function onHandlePress() {
    onSubmit({
      title,
      number: parseInt(number),
      style,
    });

    setTitle('');
    setNumber('');
    setStyle('');
  }

  return (
    <View style={{ marginTop: 36 }}>
      <Input label="Nome da música" value={title} onChangeText={setTitle} />
      <Input
        label="Número"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />
      <Dropdown
        label="Estilo musical"
        open={open}
        value={style}
        items={items}
        setOpen={setOpen}
        setValue={setStyle}
        setItems={setItems}
      />
      <BorderlessButton label="Salvar" onPress={onHandlePress} />
    </View>
  );
}
