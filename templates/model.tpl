import {Entity, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class __MODEL__ {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() createdDate: Date;
    @UpdateDateColumn() updatedDate: Date;
}