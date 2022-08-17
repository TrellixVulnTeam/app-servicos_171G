import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('varchar')
    email: string;
    @Column('varchar')
    senha: string;
}