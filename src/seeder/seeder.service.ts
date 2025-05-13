import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Network } from 'src/network/network.entity';
import { Token } from 'src/token/token.entity';
import { Repository } from 'typeorm';

/**
 * Service responsible for seeding initial data into the database.
 * Handles the creation of networks and tokens based on configuration.
 */
@Injectable()
export class SeederService {
  /**
   * Creates an instance of the SeederService
   * @param networkRepository - Repository for managing network entities
   * @param tokenRepository - Repository for managing token entities
   * @param configService - Service for accessing application configuration
   */
  constructor(
    @InjectRepository(Network)
    private networkRepository: Repository<Network>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private configService: ConfigService,
  ) {}

  /**
   * Parses network configuration and creates Network entities
   * @returns Array of Network entities created from configuration
   */
  parseNetworkSeeds(): Network[] {
    const networks: Network[] = [];
    const networksConfig = this.configService.get('networks');
    for (const networkObject of networksConfig) {
      const network = new Network();
      network.name = networkObject.name;
      network.chainId = networkObject.chainId;
      network.bridgeAddress = networkObject.bridgeAddress;
      networks.push(network);
    }
    return networks;
  }

  /**
   * Parses token configuration and creates Token entities
   * @returns Array of Token entities created from configuration
   */
  parseTokenSeeds(): Token[] {
    const tokens: Token[] = [];
    const tokensConfig = this.configService.get('tokens');
    for (const [chainId, tokenObject] of Object.entries(tokensConfig)) {
      for (const [tokenAddress, tokenInfo] of Object.entries(tokenObject)) {
        const token = new Token();
        token.name = tokenInfo.name;
        token.symbol = tokenInfo.symbol;
        token.address = tokenAddress;
        token.isNative = tokenInfo.isNative;
        token.chainId = parseInt(chainId);
        token.origin = tokenInfo.origin;
        tokens.push(token);
      }
    }
    return tokens;
  }

  /**
   * Seeds the database with initial network and token data.
   * Clears existing data before seeding new data.
   * @throws Will throw an error if seeding fails
   */
  async seed() {
    try {
      await this.networkRepository.clear();
      await this.tokenRepository.clear();

      const networks = await this.networkRepository.save(
        this.parseNetworkSeeds(),
      );
      Logger.log(`Seeded ${networks.length} networks`);

      const tokens = await this.tokenRepository.save(this.parseTokenSeeds());
      Logger.log(`Seeded ${tokens.length} tokens`);
    } catch (error) {
      console.error('Seeding failed:', error);
      throw error;
    }
  }
}
