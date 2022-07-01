import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';
import { Music } from '../../../../entities/Music';

export class MusicModel extends BaseModel {
  static table = 'musics';

  constructor(data: Music) {
    super(data);
  }

  static get database() {
    return async () => SQLite.openDatabase('rappertoire.db');
  }

  static get tableName() {
    return 'musics';
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true, autoincrement: true },
      title: { type: types.TEXT, not_null: true },
      style: { type: types.TEXT, not_null: true },
      number: { type: types.INTEGER, not_null: true },
    };
  }
}
