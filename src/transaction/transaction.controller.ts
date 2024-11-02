import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { ServerUnaryCall } from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all transactions',
    type: Transaction,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(CacheInterceptor)
  async getAllTransactions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Transaction>> {
    try {
      return await this.transactionService.paginate({ page, limit });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GrpcMethod('TransactionsService', 'StoreTransaction')
  async addTransaction(
    createTransactionDto: CreateTransactionDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<{}> {
    try {
      return await this.transactionService.addTransaction(createTransactionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the transaction by ID',
    type: Transaction,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(CacheInterceptor)
  async getTransactionById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.transactionService.getTransactionById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
