import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Share, View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { BorderlessButton } from '../../components/BorderlessButton';
import { Dropdown } from '../../components/Dropdown';
import { FAB } from '../../components/FAB';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { MusicCard } from '../../components/MusicCard';
import { Music } from '../../entities/Music';
import { useStorage } from '../../hooks/useStorage';
import { CreateDTO } from '../../storage/IStorage';
import { theme } from '../../theme';
import { getMusicStyles } from '../../utils/getMusicStyles';
import { styles } from './styles';

const initialData = [
  {
    id: 1,
    title: 'Só Forró',
    style: 'Forró',
    number: 1,
  },
  {
    id: 2,
    title: 'Coisas que o Lua canta',
    style: 'Baião',
    number: 2,
  },
  {
    id: 3,
    title: 'Royal Cinema',
    style: 'Valsa',
    number: 3,
  },
];

interface SelectedMusic extends Music {
  isSelected: boolean;
}

function Main() {
  const { store, list } = useStorage({ storage: 'in-memory', initialData });
  const [musics, setMusics] = useState<Music[]>();
  const [selectedMusics, setSelectedMusics] = useState<SelectedMusic[]>([]);
  const [totalMusics, setTotalMusics] = useState(0);
  const [totalFilteredMusics, setTotalFilteredMusics] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getMusicStyles);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetFilterRef = useRef<BottomSheet>(null);

  async function loadMusics() {
    const params = {};

    if (searchTerm) Object.assign(params, { title: searchTerm });
    if (value) Object.assign(params, { style: value });

    const response = await list(params);

    setMusics(response.data);

    if (Object.keys(params).length) {
      setTotalFilteredMusics(response.total);
      return;
    }

    setTotalFilteredMusics(0);
    setTotalMusics(response.total);
  }

  async function onHandleCreateMusic(data: CreateDTO) {
    store(data);
    bottomSheetRef.current?.close();
    await loadMusics();
  }

  async function onHandleShareSelectedText() {
    try {
      const content = selectedMusics
        .map((item) => `*${item.number}* ${item.title}`)
        .join('\n');

      await Share.share({
        message: content,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    loadMusics();
  }, [searchTerm, value, selectedMusics]);

  const subtitle = useMemo(() => {
    console.log('subtitle');
    if (totalMusics > 0 && selectedMusics.length <= 0) {
      return `${totalMusics} música(s)`;
    }

    if (selectedMusics.length > 0) {
      return `${selectedMusics.length} selecionada(s)`;
    }
  }, [totalMusics, selectedMusics]);

  function openBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  function openBottomSheetFilter() {
    bottomSheetFilterRef.current?.expand();
  }

  function onHandleFilterMusics() {
    bottomSheetFilterRef.current?.close();
  }

  function onHandleClearFilters() {
    setSearchTerm('');
    setValue(null);
    bottomSheetFilterRef.current?.close();
  }

  function onHandleSelectItem(music: Music) {
    if (selectedMusics.some((item) => item.id === music.id)) return;

    setSelectedMusics([
      ...selectedMusics,
      {
        ...music,
        isSelected: true,
      },
    ]);
  }

  function onHandleClickItem(music: Music) {
    if (selectedMusics.some((item) => item.id === music.id)) {
      setSelectedMusics(selectedMusics.filter((item) => item.id !== music.id));
      return;
    }

    if (selectedMusics.length > 0) {
      onHandleSelectItem(music);
      return;
    }

    openBottomSheet();
  }

  function onHandleClearSelection() {
    setSelectedMusics([]);
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Header
        subtitle={subtitle}
        onPressFilterButton={openBottomSheetFilter}
        filterProps={{
          badgeValue: totalFilteredMusics,
        }}
        isSelectionHeader={selectedMusics.length > 0}
        onPressClearSelection={onHandleClearSelection}
      />
      <View style={{ flex: 1, marginHorizontal: 12, marginTop: 8 }}>
        <FlatList
          style={{ flex: 1 }}
          data={musics}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MusicCard
              key={item.id}
              id={item.id}
              number={item.number}
              musicStyle={item.style}
              title={item.title}
              isSelected={selectedMusics.some(
                (selected) => selected.id === item.id
              )}
              onPress={() => onHandleClickItem(item)}
              onLongPress={() => onHandleSelectItem(item)}
            />
          )}
        />
      </View>

      {selectedMusics.length > 0 && (
        <FAB
          onPress={onHandleShareSelectedText}
          icon="share-2"
          style={{
            bottom: 96,
            backgroundColor: theme.colors.lightBlue[500],
          }}
        />
      )}
      <FAB onPress={openBottomSheet} icon="plus" />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 350]}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
        )}
        style={styles.container}
        handleIndicatorStyle={styles.indicator}
      >
        <Form onSubmit={onHandleCreateMusic} />
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetFilterRef}
        snapPoints={[1, 250]}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
        )}
        style={styles.container}
        handleIndicatorStyle={styles.indicator}
      >
        <View style={{ marginTop: 24 }}>
          <Input
            label="Buscar por nome"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Dropdown
            label="Buscar por estilo"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <BorderlessButton
              label="Limpar filtros"
              onPress={onHandleClearFilters}
              style={{ marginRight: 8 }}
              variant="secondary"
            />
            <BorderlessButton label="Filtrar" onPress={onHandleFilterMusics} />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

export default gestureHandlerRootHOC(Main);
