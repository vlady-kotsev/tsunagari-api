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
    "host": "postgres",
    "port": 5432,
    "username": "postgres",
    "password": "mypass",
    "database": "bridge",
    "seed": true,
    "maxAttempts": 5,
    "initialDelay": 1000
  },
  "cache": {
    "ttl": 5000,
    "max": 100
  },
  "app": {
    "host": "0.0.0.0",
    "port": 3000,
    "grpcHost": "0.0.0.0",
    "grpcPort": 5000,
    "grpcPassword": "grpcpass",
    "protoPath": "../proto/transactions.proto"
  },
  "networks": [
    {
      "name": "Taiko Hekla V2",
      "chainId": 167009,
      "bridgeAddress": "0xC1025CbAc0C44EE3d1990BFb0581367433cC4901"
    },
    {
      "name": "Base Sepolia",
      "chainId": 84532,
      "bridgeAddress": "0xC6D23FD19Ea36B9c75e9Aa5A09f33f39df78d344"
    },
    {
      "name": "Solana",
      "chainId": 0,
      "bridgeAddress": "NfuWnZr8HR4mxULPG61Nh7zSbdinwGtNQGVoeuxM5Jf"
    }
  ],
  "tokens": {
    "167009": {
      "0xFE928174dD13f86199898b8Cb26a88311D27E9a1": {
        "name": "Taiko Native Token",
        "symbol": "TNT",
        "isNative": true,
        "origin": 167009
      },
      "0xc3001071c3f7E2084B2Bf79CD4f085d51F6226d8": {
        "name": "Wrapped Base Native Token [taiko]",
        "symbol": "WANT",
        "isNative": false,
        "origin": 84532
      },
      "0x9C7da31D569c6Ad0B2F8f2EFA9D91B0fa1e77184": {
        "name": "Wrapped Solana Native Token [taiko]",
        "symbol": "WSNT",
        "isNative": false,
        "origin": 0
      }
    },
    "84532": {
      "0x8A5C9D7AF6C168FC986bb94874fACDb8445199f7": {
        "name": "Base Native Token",
        "symbol": "BNT",
        "isNative": true,
        "origin": 84532
      },
      "0x64aB6E6b1E2243B39D0d483ef58F86C775119159": {
        "name": "Wrapped Taiko Native Token [base]",
        "symbol": "WTNT",
        "isNative": false,
        "origin": 167009
      },
      "0x475F383441E5998c7EdFa9c6E4B54784904a3ae3": {
        "name": "Wrapped Solana Native Token [base]",
        "symbol": "WSNT",
        "isNative": false,
        "origin": 0
      }
    },
    "0": {
      "Eny4Cdvbxos72WVY2RP4oNxELbF361EXgdCk6mDRarSK": {
        "name": "Solana Native Token",
        "symbol": "SNT",
        "isNative": true,
        "origin": 0
      },
      "D2Zq2bo7aELGtWpAbw3ZHSrUosRAKept9iiQ1obkCzZB": {
        "name": "Wrapped Base Native Token [sol]",
        "symbol": "WBNT",
        "isNative": false,
        "origin": 84532
      },
      "EFqwiLvu7oeGi4y9L6N5wYscX5GHs1LfQFFbBEQ6CCxu": {
        "name": "Wrapped Taiko Native Token",
        "symbol": "WTNT",
        "isNative": false,
        "origin": 167009
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
