import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { FAB } from '../../components/FAB';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { MusicCard } from '../../components/MusicCard';
import { theme } from '../../theme';
import { getMusicStyles } from '../../utils/getMusicStyles';
import { styles } from './styles';

function Main() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getMusicStyles);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetFilterRef = useRef<BottomSheet>(null);

  function openBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  function openBottomSheetFilter() {
    bottomSheetFilterRef.current?.expand();
  }

  const data = [
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
    {
      id: 4,
      title: 'Royal Cinema',
      style: 'Valsa',
      number: 4,
    },
    {
      id: 5,
      title: 'Royal Cinema',
      style: 'Valsa',
      number: 5,
    },
    {
      id: 6,
      title: 'Royal Cinema',
      style: 'Valsa',
      number: 6,
    },
    {
      id: 7,
      title: 'Royal Cinema',
      style: 'Valsa',
      number: 7,
    },
    {
      id: 8,
      title: 'Royal Cinema',
      style: 'Valsa',
      number: 8,
    },
    {
      id: 9,
      title: 'Royal Cinema',
      style: 'Valsa',
      number: 9,
    },
  ];
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Header onPressFilterButton={openBottomSheetFilter} />
      <View style={{ flex: 1, marginHorizontal: 24 }}>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MusicCard
              key={item.id}
              id={item.id}
              number={item.number}
              style={item.style}
              title={item.title}
              onClick={openBottomSheet}
            />
          )}
        />
      </View>

      <FAB onOpen={openBottomSheet} />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 350]}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
        )}
        style={styles.container}
        handleIndicatorStyle={styles.indicator}
      >
        <Form />
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
          <Input label="Buscar por nome" />
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
              <Feather
                name="check"
                size={20}
                color={theme.colors.lightBlue[500]}
              />
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
            onPress={() => bottomSheetFilterRef.current?.close()}
          >
            <Text
              style={{
                fontFamily: theme.fonts.bold,
                color: theme.colors.lightBlue[800],
              }}
            >
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

export default gestureHandlerRootHOC(Main);
