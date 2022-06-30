import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Music } from '../../entities/Music';
import { CreateDTO } from '../../storage/IStorage';
import { getMusicStyles } from '../../utils/getMusicStyles';
import { BorderlessButton } from '../BorderlessButton';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';

interface Error {
  [key: string]: string;
}

interface FormProps {
  onSubmit: (data: CreateDTO) => void;
  initialData?: Music;
}

export function Form({ initialData, onSubmit }: FormProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | undefined>();
  const [items, setItems] = useState(getMusicStyles);

  const [title, setTitle] = useState(initialData?.title || '');
  const [number, setNumber] = useState(String(initialData?.number || ''));
  const [style, setStyle] = useState(initialData?.style || '');

  const [hasErrors, setHasErrors] = useState<Error[]>([]);

  useEffect(() => {
    setId(initialData?.id);
    setTitle(initialData?.title || '');
    setNumber(String(initialData?.number || ''));
    setStyle(initialData?.style ?? '');
  }, [initialData]);

  function onHandlePress() {
    if (!fieldsAreValid()) return;

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

  function fieldsAreValid() {
    const errors = [];

    if (!title) errors.push({ title: 'Campo obrigatório' });

    if (!number) {
      errors.push({ number: 'Campo obrigatório' });
    } else if (parseInt(number) <= 0) {
      errors.push({ number: 'Somente números inteiros positivos' });
    }

    if (!style) errors.push({ style: 'Campo obrigatório' });

    setHasErrors(errors);

    return errors.length === 0;
  }

  return (
    <View style={{ marginTop: 36 }}>
      <Input
        label="Nome da música"
        value={title}
        onChangeText={setTitle}
        hasErrors={Object.values(
          hasErrors.filter((item) => item.title)[0] || {}
        ).toString()}
      />
      <Input
        label="Número"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
        hasErrors={Object.values(
          hasErrors.filter((item) => item.number)[0] || {}
        ).toString()}
      />
      <Dropdown
        label="Estilo musical"
        open={open}
        value={style}
        items={items}
        setOpen={setOpen}
        setValue={setStyle}
        setItems={setItems}
        hasErrors={Object.values(
          hasErrors.filter((item) => item.style)[0] || {}
        ).toString()}
      />
      <BorderlessButton label="Salvar" onPress={onHandlePress} />
    </View>
  );
}
