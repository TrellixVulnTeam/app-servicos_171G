import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Information {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('varchar')
    name: string;
    @Column('varchar')
    description: string;
    @Column('varchar')
    contact: string;
}