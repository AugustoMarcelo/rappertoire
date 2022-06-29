import { Music } from '../../entities/Music';
import {
  CreateDTO,
  IStorage,
  ListFilterParams,
  ListResponse,
} from '../IStorage';

export class InMemoryStorage implements IStorage {
  private data: Music[] = [];

  constructor(initialData?: Music[]) {
    this.data = initialData || [];
  }

  public async store(data: CreateDTO) {
    const id = Date.now();

    this.data.push({
      id,
      ...data,
    });
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

    return {
      data: filteredData,
      total: filteredData.length,
    };
  }
}
