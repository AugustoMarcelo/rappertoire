import { Music } from '../entities/Music';

export interface CreateDTO {
  title: string;
  style: string;
  number: number;
}

export interface ListFilterParams {
  title?: string;
  style?: string;
}

export interface ListResponse {
  data: Music[];
  total: number;
}

export interface IStorage {
  store: (data: CreateDTO) => Promise<void>;
  list: (filters?: ListFilterParams) => Promise<ListResponse>;
}
