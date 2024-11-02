import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entity representing a blockchain network in the system
 */
@Entity('networks')
export class Network {
  /**
   * The unique identifier for the network
   * Auto-generated primary key
   */
  @ApiProperty({ example: 1, description: 'Unique identifier for the network' })
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the blockchain network
   * Stored as varchar in the database
   */
  @ApiProperty({ example: 'Amoy', description: 'Name of the network' })
  @Column('varchar')
  name: string;

  /**
   * The chain ID of the blockchain network
   * Stored as integer in the database
   * Used to uniquely identify the blockchain network in web3 transactions
   */
  @ApiProperty({ example: 80002, description: 'Chain ID of the network' })
  @Column('int')
  chainId: number;
}
