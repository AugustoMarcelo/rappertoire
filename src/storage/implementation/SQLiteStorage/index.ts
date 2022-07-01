import * as SQLite from 'expo-sqlite';
import { WebSQLDatabase } from 'expo-sqlite';
import { Music } from '../../../entities/Music';
import {
  CreateDTO,
  IStorage,
  ListFilterParams,
  ListResponse,
  UpdateDTO,
} from '../../IStorage';
import { MusicModel } from './models/MusicModel';

const DB_NAME = 'rappertoire.db';
const TABLE_NAME = 'musics';

export class SQLiteStorage implements IStorage {
  private connection: WebSQLDatabase | null = null;

  private constructor() {
    if (!this.connection) {
      this.connection = SQLite.openDatabase(DB_NAME);
      this.initTables();
    }
  }

  private initTables() {
    this.connection?.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          style TEXT,
          number INTEGER
        );`
      );
    });
  }

  public static getInstance = async () => {
    return new SQLiteStorage();
  };

  async store(data: CreateDTO) {
    await MusicModel.create(data);
  }

  async update(data: UpdateDTO) {
    let currentData = await MusicModel.find(data.id);

    if (!currentData) throw new Error('Music not found');

    currentData.title = data.title;
    currentData.number = data.number;
    currentData.style = data.style;

    const result = await currentData.save();
  }

  async list(filters?: ListFilterParams | undefined): Promise<ListResponse> {
    const options = {
      where: {},
      order: 'number ASC',
    };

    if (filters && (filters.title || filters.style)) {
      options.where = {
        ...(filters.title
          ? { title_cont: `%${filters.title.toLowerCase().trim()}%` }
          : {}),
        ...(filters.style ? { style: filters.style } : {}),
      };
    }

    const data = (await MusicModel.query(options)) as Music[];
    const total = data.length;

    return {
      data,
      total,
    };
  }
}
