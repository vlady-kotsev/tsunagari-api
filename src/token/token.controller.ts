import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Token } from './token.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller responsible for handling token-related HTTP requests.
 * Provides endpoints for retrieving token information with pagination support.
 */
@ApiTags('tokens')
@Controller('tokens')
export class TokenController {
  /**
   * Creates an instance of TokenController
   * @param tokenService - Service handling token-related operations
   */
  constructor(private tokenService: TokenService) {}

  /**
   * Retrieves a paginated list of tokens
   * @param page - The page number to retrieve
   * @param limit - The number of items per page
   * @returns Paginated list of tokens
   * @throws HttpException if token retrieval fails
   */
  @Get()
  @ApiOperation({ summary: 'Get all tokens' })
  @ApiResponse({
    status: 200,
    description: 'Returns all tokens',
    type: Token,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(CacheInterceptor)
  async getAllTokens(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Token>> {
    try {
      return await this.tokenService.paginate({ page, limit });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
