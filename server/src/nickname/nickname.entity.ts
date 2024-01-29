// src/nickname/nickname.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // @Entity() 是一個裝飾器，它標記了下面的類別 Nickname 為一個數據庫實體。
export class Nickname {
  @PrimaryGeneratedColumn() // @PrimaryGeneratedColumn() 是另一個裝飾器，它標記了 id 屬性為主鍵（Primary Key）
  id: number;

  @Column({ unique: true }) // @Column() 裝飾器用於定義實體的列（Column）unique 唯一值
  name: string;
}
