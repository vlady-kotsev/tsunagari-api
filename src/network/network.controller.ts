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
import { NetworkService } from './network.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Network } from './network.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller responsible for handling network-related HTTP requests
 */
@ApiTags('networks')
@Controller('networks')
export class NetworkController {
  /**
   * Creates an instance of NetworkController
   * @param {NetworkService} networkService - The network service instance
   */
  constructor(private networkService: NetworkService) {}

  /**
   * Retrieves a paginated list of all networks
   * 
   * @param {number} page - The page number to retrieve (default: 1)
   * @param {number} limit - The number of items per page (default: 10)
   * @returns {Promise<Pagination<Network>>} A paginated list of networks
   * @throws {HttpException} When there's an error retrieving networks
   */
  @Get()
  @ApiOperation({ summary: 'Get all networks' })
  @ApiResponse({
    status: 200,
    description: 'Returns all networks',
    type: Network,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(CacheInterceptor)
  async getAllNetworks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Network>> {
    try {
      return await this.networkService.paginate({ page, limit });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
