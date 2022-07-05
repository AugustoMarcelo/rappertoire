import { useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
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
  findByTitle: (title: string) => Promise<Music | undefined>;
}

export function Form({ initialData, onSubmit, findByTitle }: FormProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | undefined>();
  const [items, setItems] = useState(getMusicStyles);

  const [title, setTitle] = useState(initialData?.title || '');
  const [number, setNumber] = useState(String(initialData?.number || ''));
  const [style, setStyle] = useState(initialData?.style || '');

  const inputNumberRef = useRef<TextInput>(null);

  const [hasErrors, setHasErrors] = useState<Error[]>([]);

  useEffect(() => {
    setId(initialData?.id);
    setTitle(initialData?.title || '');
    setNumber(String(initialData?.number || ''));
    setStyle(initialData?.style ?? '');
  }, [initialData]);

  async function onHandlePress() {
    if (!(await fieldsAreValid())) return;

    onSubmit({
      id,
      title: title.trim(),
      number: parseInt(number.trim()),
      style,
    });

    Keyboard.dismiss();

    setTitle('');
    setNumber('');
    setStyle('');
  }

  async function fieldsAreValid() {
    const errors = [];

    if (!title) errors.push({ title: 'Campo obrigatório' });
    if (await findByTitle(title))
      errors.push({ title: 'Já existe uma música com esse título' });

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
        returnKeyType="next"
        onSubmitEditing={() => inputNumberRef.current?.focus()}
        blurOnSubmit={false}
      />
      <Input
        inputRef={inputNumberRef}
        label="Número"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
        hasErrors={Object.values(
          hasErrors.filter((item) => item.number)[0] || {}
        ).toString()}
        returnKeyType="next"
        onSubmitEditing={() => setOpen(true)}
        blurOnSubmit={false}
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
