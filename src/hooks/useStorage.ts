import { Music } from '../entities/Music';
import { InMemoryStorage } from '../storage/implementation/InMemoryStorage';
import { CreateDTO, IStorage, ListFilterParams } from '../storage/IStorage';

interface Props {
  storage: 'in-memory' | 'watermelon-db';
  initialData?: Music[];
}

export function useStorage({ storage, initialData }: Props) {
  let instance: IStorage;

  function getInstance() {
    if (!instance) {
      instance =
        storage === 'in-memory'
          ? new InMemoryStorage(initialData)
          : new InMemoryStorage();
    }

    return instance;
  }

  function store(data: CreateDTO) {
    getInstance().store(data);
  }

  function list(filters?: ListFilterParams) {
    return getInstance().list(filters);
  }

  return {
    store,
    list,
  };
}
