import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class Token {
  @ApiProperty({ example: 1, description: 'Unique identifier for the token' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '0x0000000000000000000000000000000000000000', description: 'Address of the token' })
  @Column('varchar')
  address: string;

  @ApiProperty({ example: 'Wrapped Ether', description: 'Name of the token' })
  @Column('varchar')
  name: string;

  @ApiProperty({ example: 'WETH', description: 'Symbol of the token' })
  @Column('varchar')
  symbol: string;

  @ApiProperty({ example: 80002, description: 'Chain ID of the token' })
  @Column('int')
  chainId: number;

  @ApiProperty({ example: true, description: 'Whether the token is native' })
  @Column('boolean')
  isNative: boolean;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'Logo URL of the token' })
  @Column('varchar', { nullable: true })
  logoUrl: string;
}
