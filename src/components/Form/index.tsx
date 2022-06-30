import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Music } from '../../entities/Music';
import { CreateDTO } from '../../storage/IStorage';
import { getMusicStyles } from '../../utils/getMusicStyles';
import { BorderlessButton } from '../BorderlessButton';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';

interface FormProps {
  onSubmit: (data: CreateDTO) => void;
  initialData?: Music;
}

export function Form({ initialData, onSubmit }: FormProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | undefined>();
  const [style, setStyle] = useState(initialData?.style || '');
  const [items, setItems] = useState(getMusicStyles);

  const [title, setTitle] = useState(initialData?.title || '');
  const [number, setNumber] = useState(String(initialData?.number || ''));

  useEffect(() => {
    setId(initialData?.id);
    setTitle(initialData?.title || '');
    setNumber(String(initialData?.number || ''));
    setStyle(initialData?.style ?? '');
  }, [initialData]);

  function onHandlePress() {
    onSubmit({
      id,
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
