import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("users")
export class User {

    @PrimaryColumn()
    readonly id: string;
    
    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @CreateDateColumn()
    create_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuid();
        }
    }
}