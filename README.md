<div align="center">
  <img src="https://github.com/user-attachments/assets/8e4e3361-4930-45ef-addc-a0b576e8c56f" alt="logo" />
  <h1>Tsunagari/つながり - API</h1>
  
</div>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Startup](#startup)
- [Configuration](#deployment)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [License](#license)

## Overview

**Tsunagari**(to connect) API is a NestJS application part of the Tsunagari project, a bridge for **EVM** compatible chains.

## Features

- The system is designed to be modular and upgradeable, allowing for future enhancements and improvements.
- The system starts two servers: HTTP server and gRPC server.
- The system uses a PostgreSQL database to store the data.
- The system is actively used from the Tsunagari frontend: https://github.com/vlady-kotsev/tsunagari-frontend.
- The system is used by the Tsunagari backend for storing transactions.

## Startup

Starting a local setup with two nodes of Tsunagari: https://github.com/vlady-kotsev/tsunagari-local

## Configuration

Place `config.json` in `<root>/config/`

### Example config:

```json
{
  "db": {
    "host": "<postgres_host>",
    "port": "<postgres_port>",
    "username": "<postgres_username>",
    "password": "<postgres_password",
    "database": "<database_name>",
    "seed": "<True/False>",
    "maxAttempts": 5,
    "initialDelay": 1000
  },
  "cache": {
    "ttl": 5000,
    "max": 100
  },
  "app": {
    "host": "<http_host>",
    "port": "<http_port>",
    "grpcHost": "<grpc_host>",
    "grpcPort": "<grpc_port>",
    "protoPath": "../proto/transactions.proto"
  },
  "networks": [
    {
      "name": "amoy",
      "chainId": 80002
    },
    {
      "name": "taiko",
      "chainId": 167009
    }
  ],
  "tokens": {
    "80002": {
      "0x43C3176222275dd9cb55CF167Ac322ec170a5BcB": {
        "name": "AmoyNativeToken",
        "symbol": "ANT",
        "isNative": true
      },
      "0x20d131eA180bA673F365b7e04666e90B2eF7eb32": {
        "name": "WrappedTaikoNativeToken",
        "symbol": "WTNT",
        "isNative": false
      }
    },
    "167009": {
      "0xDA79D9B7FAc84C3Bc49290Fd8Dfcae2eB2a0e1F6": {
        "name": "TaikoNativeToken",
        "symbol": "TNT",
        "isNative": true
      },
      "0xb892F6638bE64e70B053a9f988624BAf12bBE5D5": {
        "name": "WrappedAmoyNativeToken",
        "symbol": "WANT",
        "isNative": false
      }
    }
  }
}
```

## Endpoints

### GetAllTransactions: `GET` at `<http_host>:<http_port>\transactions`

### AddTransaction: `GRPC` at `grpc_host:grpc_port`

### GetAllNetworks: `GET` at `<http_host>:<http_port>\networks`

### GetAllTokens: `GET` at `<http_host>:<http_port>\tokens`

### Swagger: `GET` at `<http_host>:<http_port>\api`

## Testing

To be added

## License

This project is licensed under the MIT License:

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
