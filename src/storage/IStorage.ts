import { Music } from '../entities/Music';

export interface CreateDTO {
  id?: number;
  title: string;
  style: string;
  number: number;
}

export interface UpdateDTO extends Required<CreateDTO> {}

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
  update: (data: UpdateDTO) => Promise<void>;
  list: (filters?: ListFilterParams) => Promise<ListResponse>;
  destroy: (data: number[]) => Promise<void>;
  findByTitle: (title: string) => Promise<Music | undefined>;
}
