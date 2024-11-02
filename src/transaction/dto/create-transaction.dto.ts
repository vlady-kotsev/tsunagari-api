import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Data Transfer Object for storing a transaction.
 * Contains all required fields to store a token transfer between chains.
 */
export class CreateTransactionDto {
  /**
   * The user's address or identifier initiating the transaction.
   * Must be a non-empty string.
   */
  @IsNotEmpty()
  @IsString()
  user: string;

  /**
   * The contract address of the token being sent.
   * Must be a valid blockchain address string.
   */
  @IsNotEmpty()
  @IsString()
  originTokenAddress: string;

  /**
   * The contract address of the token to receive.
   * Must be a valid blockchain address string.
   */
  @IsNotEmpty()
  @IsString()
  destinationTokenAddress: string;

  /**
   * The amount of tokens to transfer.
   * Must be a string to handle large numbers precisely.
   */
  @IsNotEmpty()
  @IsString()
  amount: string;

  /**
   * The chain ID of the source blockchain network.
   * Must be a valid network identifier number.
   */
  @IsNotEmpty()
  @IsNumber()
  originChainId: number;

  /**
   * The chain ID of the destination blockchain network.
   * Must be a valid network identifier number.
   */
  @IsNotEmpty()
  @IsNumber()
  destinationChainId: number;
}
