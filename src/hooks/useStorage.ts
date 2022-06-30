import { Music } from '../entities/Music';
import { InMemoryStorage } from '../storage/implementation/InMemoryStorage';
import { CreateDTO, IStorage, ListFilterParams } from '../storage/IStorage';
import { UpdateDTO } from './../storage/IStorage';

interface Props {
  storage: 'in-memory' | 'watermelon-db';
  initialData?: Music[];
}

let instance: IStorage;

export function useStorage({ storage, initialData }: Props) {
  function getInstance() {
    if (!instance) {
      instance =
        storage === 'in-memory'
          ? new InMemoryStorage(initialData)
          : new InMemoryStorage();
    }

    return instance;
  }

  async function store(data: CreateDTO) {
    getInstance().store(data);
  }

  async function update(data: UpdateDTO) {
    getInstance().update(data);
  }

  async function list(filters?: ListFilterParams) {
    return getInstance().list(filters);
  }

  return {
    store,
    update,
    list,
  };
}
