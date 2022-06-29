import { useState } from 'react';
import { View } from 'react-native';
import { ListFilterParams } from '../../storage/IStorage';
import { getMusicStyles } from '../../utils/getMusicStyles';
import { BorderlessButton } from '../BorderlessButton';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import { styles } from './styles';

interface FilterFormProps {
  onHandleClearFilters: () => void;
  onHandleFilterMusics: (data: ListFilterParams) => void;
}

export function FilterForm({
  onHandleClearFilters,
  onHandleFilterMusics,
}: FilterFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [style, setStyle] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(getMusicStyles);

  return (
    <View style={styles.container}>
      <Input
        label="Buscar por nome"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Dropdown
        label="Buscar por estilo"
        open={dropdownOpen}
        setOpen={setDropdownOpen}
        value={style}
        setValue={setStyle}
        items={dropdownItems}
        setItems={setDropdownItems}
      />
      <View style={styles.buttons}>
        <BorderlessButton
          label="Limpar filtros"
          style={styles.clearFilterButton}
          variant="secondary"
          onPress={() => {
            onHandleClearFilters();
            setSearchTerm('');
            setStyle(null);
          }}
        />
        <BorderlessButton
          label="Filtrar"
          onPress={() =>
            onHandleFilterMusics({
              title: searchTerm,
              style: style || undefined,
            })
          }
        />
      </View>
    </View>
  );
}
