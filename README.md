# Project_Management_Server

## PROJECT SETUP
- Initialize a database with MySQL and get connection string

### Using NPM:
To install dependencies:

```bash
npm install
```

To create env file:

```bash
npm run createEnv
```


```
Go into the env file and setup key
```

To run:

```bash
tsc && npm run src/app.ts
```

### Using bun:
To install dependencies:

```bash
bun install
```

To create env file:
```bash
bun run createEnv:bun
```

```
Go into the env file and setup key
```

To run:

```bash
bun run dev:bun
```

## TODO
- Data validation with joi
- tests (Ensure duedate cannot be in the past)