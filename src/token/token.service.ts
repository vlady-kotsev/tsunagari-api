import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

/**
 * Service responsible for managing token operations.
 * Handles database operations and business logic for tokens.
 */
@Injectable()
export class TokenService {
  /**
   * Creates an instance of TokenService
   * @param tokenRepository - Repository for managing token entities
   */
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  /**
   * Retrieves all tokens from the database
   * @returns Promise containing an array of all tokens
   * @throws Error if database operation fails
   */
  async getAllTokens(): Promise<Token[]> {
    try {
      return await this.tokenRepository.find();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * Retrieves a paginated list of tokens
   * @param options - Pagination options including page number and items per page
   * @returns Promise containing paginated token results
   */
  async paginate(options: IPaginationOptions): Promise<Pagination<Token>> {
    return paginate<Token>(this.tokenRepository, options);
  }
}
