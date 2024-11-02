import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('transactions')
export class Transaction {
  @ApiProperty({ example: 1, description: 'Unique identifier for the transaction' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '0x0000000000000000000000000000000000000000', description: 'User address' })
  @Column('varchar')
  user: string;

  @ApiProperty({ example: '0x0000000000000000000000000000000000000000', description: 'Origin token address' })
  @Column('varchar')
  originTokenAddress: string;

  @ApiProperty({ example: '0x0000000000000000000000000000000000000000', description: 'Destination token address' })
  @Column('varchar')
  destinationTokenAddress: string;

  @ApiProperty({ example: '100', description: 'Amount of the transaction' })
  @Column('varchar')
  amount: string;

  @ApiProperty({ example: 80002, description: 'Origin chain ID' })
  @Column('int')
  originChainId: number;

  @ApiProperty({ example: 80002, description: 'Destination chain ID' })
  @Column('int')
  destinationChainId: number;

  @ApiProperty({ example: new Date(), description: 'Timestamp of the transaction' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
