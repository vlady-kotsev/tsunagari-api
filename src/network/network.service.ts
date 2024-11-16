import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Network } from './network.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

/**
 * Service responsible for managing network entities.
 */
@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(Network)
    private networkRepository: Repository<Network>,
  ) {}

  /**
   * Retrieves all networks from the database
   * @returns {Promise<Network[]>} A promise that resolves to an array of networks
   * @throws {Error} If there's an error retrieving the networks
   */
  async getAllNetworks(): Promise<Network[]> {
    try {
      return await this.networkRepository.find();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * Paginates through network records
   * @param {IPaginationOptions} options - Pagination options including page number and items per page
   * @returns {Promise<Pagination<Network>>} A paginated result of networks
   */
  async paginate(options: IPaginationOptions): Promise<Pagination<Network>> {
    return paginate<Network>(this.networkRepository, options);
  }
}
