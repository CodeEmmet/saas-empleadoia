import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  numeroWhatsapp: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  preferencias: any; // Ej: { marcasFavoritas: ['Hikvision', 'EZVIZ'] }

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;
}
