starts the whole project (client + server) with a single command
```
yarn start
```


# Slot Casino Game API Documentation

### Overview

This API simulates a slot casino game, offering three core endpoints to play the game, simulate multiple spins, and retrieve the RTP (Return to Player) percentage. Additionally, wallet management is included to handle deposits, withdrawals, and balance checking.

Base URL
Local Development: ```http://localhost:3000```


### Slot Machine Endpoints
## 1.POST /play
Description: Executes a random spin, deducts the bet from the player's wallet, and returns the result of the spin along with the winnings.

Request:
```
POST /play
{
  "bet": number
}
```

Response:
```
{
  "matrix": string[][],
  "winnings": number
}
```

#### Functionality:

1. Deducts the bet amount from the player's wallet.
2. Randomly selects 3x3 symbols from the predefined set.
3. Calculates winnings based on combinations of 3 identical symbols in a row (wins 5x the bet).
4. Returns the final symbol matrix and winnings.

## 2. POST /sim
Description: Simulates multiple spins based on the provided count and bet amount, then returns the total winnings and net result.

Request:
```
POST /sim
{
  "count": number,
  "bet": number
}
```

Response:
```
{
  "totalWinnings": number,
  "netResult": number
}
```

#### Functionality:

1. Deducts the total bet (count * bet) from the player's wallet.
2. Simulates the number of spins provided.
3. Returns the total winnings and the net result (total winnings - total bet).

## 3. GET /rtp
Description: Retrieves the Return to Player (RTP) percentage based on all spins made so far.

Response:
```
{
  "rtp": number
}
```

Functionality:

1. Calculates the RTP as (total winnings / total bets) * 100.
2. Returns the RTP percentage based on all previous spins.

### Wallet Endpoints
## 1. POST /wallet/deposit
Description: Adds funds to the player's wallet.

Request:
```
POST /wallet/deposit
{
  "amount": number
}
```

Response:
```
{
  "balance": number
}
```

## 2. POST /wallet/withdraw
Description: Withdraws funds from the player's wallet if sufficient balance is available.

Request:
```
POST /wallet/withdraw
{
  "amount": number
}
```

Response:
```
{
  "balance": number
}
```

## 3. GET /wallet/balance
Description: Returns the current balance of the player's wallet.

Response:
```
{
  "balance": number
}
```

### Error Handling
1. 400 Bad Request: Returned when the request body is invalid or missing required fields.
2. 500 Internal Server Error: Returned for unexpected server errors.
3. Detailed error messages are provided to assist in debugging.






# Node.js Developer Task
MAIN TASK:
Objective: Create an API for simulating a slot casino game with three endpoints.
Endpoints:
1. POST /play:
- Executes a random spin.
- Calculates and returns the final symbol matrix and winnings.
2. POST /sim:
- Accepts a parameter "count" which specifies the number of spins to simulate.
- Returns the total profit or loss from the specified number of spins.
3. GET /rtp:
- Returns the Return to Player (RTP) percentage based on all spins made so far (total bets vs. total
winnings).

## Requirements:
1. RNG Integration:
- Integrate an existing Random Number Generator (RNG) library for random selection.
2. Slot Game Logic:
- Operates on a 3x3 matrix.
- Uses 3 predefined rows of symbols with 5 different symbols.
- Randomly selects 3 positions using the RNG.
- Calculates winnings: Each combination of 3 identical symbols in a row wins 5 times the bet.
3. Detailed Functionality:
- /play: Executes a single random spin, calculates the winnings, and returns the final symbol matrix
and winnings.
- /sim: Accepts a "count" parameter, performs the specified number of spins, and returns the total
profit or loss.
- /rtp: Returns the RTP percentage based on all spins made so far (total bets vs. total winnings).
BONUS REQUIREMENTS:
1. Error Handling:
- Implement robust error handling for all endpoints.
- Ensure the API gracefully handles invalid input, such as missing or incorrect parameters.
- Return appropriate HTTP status codes and error messages.
2. Automated Tests:
- Write automated tests to ensure the correctness of the implemented functionality.
- Include unit tests for individual components and integration tests for the API endpoints.
3. Wallet Logic:
- Implement a "wallet" system to manage player balances.
- Add logic to handle deposits and withdrawals.
- Ensure the balance is correctly updated after each play and simulation.
- Implement error handling for scenarios such as insufficient balance.

## DETAILED TASK BREAKDOWN:
### MAIN TASK:
#### 1. POST /play:
- Request Body: { "bet": number }
- Response: { "matrix": string[][], "winnings": number }
- Functionality:
- Deduct the bet amount from the player's wallet.
- Perform a random spin using the RNG.
- Calculate the winnings based on the final symbol matrix.
- Update the player's wallet with the winnings.
- Return the final symbol matrix and winnings.
#### 2. POST /sim:
- Request Body: { "count": number, "bet": number }
- Response: { "totalWinnings": number, "netResult": number }
- Functionality:
- Deduct the total bet amount (bet * count) from the player's wallet.
- Perform the specified number of spins.
- Calculate the total winnings and net result (total winnings - total bet).
- Update the player's wallet with the total winnings.
- Return the total winnings and net result.
#### 3. GET /rtp:

- Response: { "rtp": number }
- Functionality:
- Calculate the RTP percentage based on all spins made so far.
- Return the RTP percentage.
### BONUS REQUIREMENTS:
#### 1. Error Handling:
- Validate request parameters and return 400 Bad Request for invalid input.
- Return 500 Internal Server Error for unexpected errors.
- Provide meaningful error messages to the client.
#### 2. Automated Tests:
- Use a testing framework (e.g., Mocha, Jest) to write unit and integration tests.
- Test individual components such as RNG integration, spin logic, and wallet updates.
- Test the API endpoints to ensure they return correct responses and handle errors appropriately.
#### 3. Wallet Logic:
- Implement endpoints for managing the player's wallet:
- POST /wallet/deposit: Adds funds to the player's wallet.
- POST /wallet/withdraw: Withdraws funds from the player's wallet.
- GET /wallet/balance: Returns the current balance.
- Ensure the wallet balance is updated correctly after each play and simulation.
- Handle errors such as insufficient balance for a bet or withdrawal.

### BONUS FE REQUIREMENTS:
- Front-end extra task: Create a visual representation of the game using React. Connect the game to the local API from the backend task and visualize:

    3x3 reels matrix
    spin button for triggering a spin - animate reels spinning
    balance visualization and current bet (can be FE only for the session)
    win visualization and balance updates
