import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateTransactionDto } from './dto/create-transaction.dto';

/**
 * Service responsible for managing transaction operations.
 * Handles database operations for transactions.
 */
@Injectable()
export class TransactionService {
  /**
   * Creates an instance of TransactionService
   * @param transactionRepository - Repository for managing transaction entities
   */
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  /**
   * Retrieves all transactions from the database
   * @returns Promise containing an array of all transactions
   * @throws Error if database operation fails
   */
  getAllTransactions() {
    try {
      return this.transactionRepository.find();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * Creates a new transaction record in the database
   * @param createTransactionDto - Data for creating a new transaction
   * @returns Promise containing the created transaction
   * @throws Error if transaction creation fails
   */
  addTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      return this.transactionRepository.save(createTransactionDto);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * Retrieves a specific transaction by its ID
   * @param id - The unique identifier of the transaction
   * @returns Promise containing the found transaction
   * @throws Error if transaction is not found or operation fails
   */
  getTransactionById(id: number) {
    try {
      return this.transactionRepository.findOneBy({ id });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * Retrieves a paginated list of transactions
   * @param options - Pagination options including page number and items per page
   * @returns Promise containing paginated transaction results
   */
  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<Transaction>> {
    const queryBuilder = this.transactionRepository.createQueryBuilder('s');
    queryBuilder.orderBy('s.timestamp', 'DESC');

    return paginate<Transaction>(queryBuilder, options);
  }
}
