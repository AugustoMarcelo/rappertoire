import { Music } from '../../entities/Music';
import {
  CreateDTO,
  IStorage,
  ListFilterParams,
  ListResponse,
  UpdateDTO,
} from '../IStorage';

export class InMemoryStorage implements IStorage {
  private data: Music[] = [];

  constructor(initialData?: Music[]) {
    this.data = initialData || [];
  }

  public async store(data: CreateDTO) {
    const id = Date.now();

    this.data.push({
      ...data,
      id,
    });
  }

  public async update(data: UpdateDTO) {
    if (!data.id) throw new Error('Id property must be mandatory');

    const itemIndex = this.data.findIndex((item) => item.id === data.id);

    if (itemIndex === -1) return;

    this.data = this.data
      .map((item, index) => {
        if (index === itemIndex) {
          return data;
        }
        return item;
      })
      .filter(Boolean);
  }

  public async list(filters?: ListFilterParams): Promise<ListResponse> {
    let filteredData = this.data;

    if (filters && Object.keys(filters).length > 0) {
      const filtersAmount = Object.keys(filters).length;

      filteredData = filteredData.filter((item) => {
        let filtersMatch = 0;

        if (filters.title) {
          filtersMatch += Number(
            item.title.toLowerCase().includes(filters.title.toLowerCase())
          );
        }

        if (filters.style) {
          filtersMatch += Number(item.style === filters.style);
        }

        return filtersAmount === filtersMatch;
      });
    }

    filteredData = filteredData.sort((a, b) => a.number - b.number);

    return {
      data: filteredData,
      total: filteredData.length,
    };
  }
}
