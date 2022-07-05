import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Share, Text, ToastAndroid, View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Container } from '../../components/Container';
import { FAB } from '../../components/FAB';
import { FilterForm } from '../../components/FilterForm';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { MusicCard } from '../../components/MusicCard';
import { Music } from '../../entities/Music';
import { useStorage } from '../../hooks/useStorage';
import { CreateDTO, ListFilterParams } from '../../storage/IStorage';
import { theme } from '../../theme';
import { styles } from './styles';

interface SelectedMusic extends Music {
  isSelected: boolean;
}

interface Loading {
  status: boolean;
  message?: string;
}

function Main() {
  const { store, list, update, destroy, findByTitle } = useStorage({
    storage: 'sqlite',
  });

  const [musics, setMusics] = useState<Music[]>();
  const [selectedMusics, setSelectedMusics] = useState<SelectedMusic[]>([]);
  const [dataToUpdate, setDataToUpdate] = useState<Music>({} as Music);
  const [totalMusics, setTotalMusics] = useState(0);
  const [totalFilteredMusics, setTotalFilteredMusics] = useState(0);
  const [isLoading, setIsLoading] = useState<Loading>({ status: false });

  const [searchTermFilter, setSearchTermFilter] = useState('');
  const [musicStyleFilter, setMusicStyleFilter] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetFilterRef = useRef<BottomSheet>(null);

  async function loadMusics() {
    const params = {};

    if (searchTermFilter) Object.assign(params, { title: searchTermFilter });
    if (musicStyleFilter) Object.assign(params, { style: musicStyleFilter });

    const response = await list(params);

    setMusics(response.data);

    if (Object.keys(params).length) {
      setTotalFilteredMusics(response.total);
      return;
    }

    setTotalFilteredMusics(0);
    setTotalMusics(response.total);
  }

  async function onHandleSaveMusic(data: CreateDTO) {
    setIsLoading({ status: true });

    try {
      if (!data.id) {
        await store(data);
      }

      if (data.id) {
        await update(data as Required<CreateDTO>);
      }

      bottomSheetRef.current?.collapse();
      setTimeout(async () => {
        await loadMusics();
        setIsLoading({ status: false });
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading({ status: false });
    }
  }

  async function onHandleDeleteSelected() {
    setIsLoading({ status: true });

    await destroy(selectedMusics.map((item) => item.id));
    setSelectedMusics([]);
    setTimeout(async () => {
      await loadMusics();
      setIsLoading({ status: false });
    }, 500);
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
  }, [searchTermFilter, musicStyleFilter, selectedMusics]);

  const subtitle = useMemo(() => {
    if (totalMusics > 0 && selectedMusics.length <= 0) {
      return `${totalMusics} música(s)`;
    }

    if (selectedMusics.length > 0) {
      return `${selectedMusics.length} selecionada(s)`;
    }

    return 'Sem repertório';
  }, [totalMusics, selectedMusics]);

  function openBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  function openBottomSheetToCreate() {
    setDataToUpdate({} as Music);
    openBottomSheet();
  }

  function openBottomSheetFilter() {
    bottomSheetFilterRef.current?.expand();
  }

  function onHandleFilterMusics(params?: ListFilterParams) {
    if (!params || (!params.title && !params.style)) {
      ToastAndroid.show('Nenhum filtro selecionado', ToastAndroid.SHORT);
      return;
    }

    setIsLoading({ status: true, message: 'Buscando músicas...' });

    if (params.title) {
      setSearchTermFilter(params.title);
    }

    if (params.style) {
      setMusicStyleFilter(params.style);
    }

    bottomSheetFilterRef.current?.close();
    setTimeout(() => {
      setIsLoading({ status: false });
    }, 100);
  }

  function onHandleClearFilters() {
    setSearchTermFilter('');
    setMusicStyleFilter('');
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
    // Remove the selection
    if (selectedMusics.some((item) => item.id === music.id)) {
      setSelectedMusics(selectedMusics.filter((item) => item.id !== music.id));
      return;
    }

    // Select if there are others items selected
    if (selectedMusics.length > 0) {
      onHandleSelectItem(music);
      return;
    }

    setDataToUpdate(music);

    setTimeout(() => {
      openBottomSheet();
    }, 100);
  }

  function onHandleClearSelection() {
    setSelectedMusics([]);
  }

  return (
    <Container isLoading={isLoading.status} loadingMessage={isLoading.message}>
      <Header
        subtitle={subtitle}
        onPressFilterButton={openBottomSheetFilter}
        filterProps={{
          badgeValue: totalFilteredMusics,
        }}
        isSelectionHeader={selectedMusics.length > 0}
        onPressClearSelection={onHandleClearSelection}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={musics}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyContainerText}>
                Seu repertório ainda está vazio... :(
              </Text>
            </View>
          }
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

      {selectedMusics.length > 0 ? (
        <>
          <FAB
            onPress={onHandleDeleteSelected}
            icon="trash-2"
            style={{ bottom: 96 }}
            backgroundColor={theme.colors.error[600]}
          />
          <FAB
            onPress={onHandleShareSelectedText}
            icon="share-2"
            backgroundColor={theme.colors.lightBlue[500]}
          />
        </>
      ) : (
        <FAB onPress={openBottomSheetToCreate} icon="plus" />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 370]}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
        )}
        style={styles.container}
        handleIndicatorStyle={styles.indicator}
      >
        <Form
          onSubmit={onHandleSaveMusic}
          initialData={dataToUpdate}
          findByTitle={findByTitle}
        />
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
        <FilterForm
          onHandleClearFilters={onHandleClearFilters}
          onHandleFilterMusics={onHandleFilterMusics}
        />
      </BottomSheet>
    </Container>
  );
}

export default gestureHandlerRootHOC(Main);
