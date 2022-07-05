import { Music } from '../entities/Music';
import { InMemoryStorage } from '../storage/implementation/InMemoryStorage';
import { SQLiteStorage } from '../storage/implementation/SQLiteStorage';
import { CreateDTO, IStorage, ListFilterParams } from '../storage/IStorage';
import { UpdateDTO } from './../storage/IStorage';

interface Props {
  storage: 'in-memory' | 'watermelon-db' | 'sqlite';
  initialData?: Music[];
}

let instance: IStorage;

export function useStorage({ storage, initialData }: Props) {
  async function getInstance() {
    if (!instance) {
      switch (storage) {
        case 'in-memory':
        case 'watermelon-db':
          instance = new InMemoryStorage(initialData);
          break;
        case 'sqlite':
          instance = await SQLiteStorage.getInstance();
          break;
        default:
          instance = new InMemoryStorage(initialData);
          break;
      }
    }

    return instance;
  }

  async function store(data: CreateDTO) {
    const i = await getInstance();
    return i.store(data);
  }

  async function update(data: UpdateDTO) {
    const i = await getInstance();
    return i.update(data);
  }

  async function list(filters?: ListFilterParams) {
    const i = await getInstance();
    return i.list(filters);
  }

  async function destroy(data: number[]) {
    const i = await getInstance();
    return i.destroy(data);
  }

  async function findByTitle(title: string) {
    const i = await getInstance();
    return i.findByTitle(title);
  }

  return {
    store,
    update,
    list,
    destroy,
    findByTitle,
  };
}
