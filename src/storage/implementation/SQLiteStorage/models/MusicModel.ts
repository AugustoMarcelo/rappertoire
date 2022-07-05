import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';
import { Music } from '../../../../entities/Music';
import { CreateDTO, UpdateDTO } from '../../../IStorage';

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

  static async customCreate(data: CreateDTO) {
    const result = await this.query({
      where: { number_eq: data.number },
    });

    if (result.length) {
      const sql = `UPDATE ${this.tableName} SET number = number + 1 WHERE number >= ?`;
      const params = [data.number];
      return this.repository.databaseLayer
        .executeSql(sql, params)
        .then(() => this.create(data));
    }

    return this.create(data);
  }

  static async customUpdate(data: UpdateDTO) {
    let currentData = await MusicModel.find(data.id);

    if (!currentData) throw new Error('Music not found');

    const result = await this.query({
      where: { number_eq: data.number },
    });

    const numberIsAvailable = !result.length;

    if (data.number < currentData.number && !numberIsAvailable) {
      const sql = `UPDATE ${this.tableName} SET number = number + 1 WHERE number >= ? AND id != ?`;
      const params = [data.number, currentData.id];
      this.repository.databaseLayer.executeSql(sql, params);
    }

    if (data.number > currentData.number && !numberIsAvailable) {
      const sql = `UPDATE ${this.tableName} SET number = number - 1 WHERE number > ? AND number <= ?`;
      const params = [currentData.number, data.number];
      this.repository.databaseLayer.executeSql(sql, params);
    }

    currentData.title = data.title;
    currentData.number = data.number;
    currentData.style = data.style;

    await currentData.save();
  }

  static async customDestoy(data: number[]) {
    const sql = `DELETE FROM ${this.tableName} WHERE id IN (${data.join(
      ', '
    )})`;
    this.repository.databaseLayer.executeSql(sql);
  }

  static async freeQuery(query: string, params: any) {
    return this.repository.databaseLayer.executeSql(query, params);
  }
}
