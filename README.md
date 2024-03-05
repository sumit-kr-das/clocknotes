## Getting Started

### Clone the repo

First, clone the repo

```bash
git clone https://github.com/sumit-kr-das/time-track.git
```

### Setup environment variables

Create a `.env` file and copy the environment variables from `.env.example`

### Database migration

Migrate the database

```bash
 npx prisma migrate dev --name init
```

### Installation

Install all the dependencies

```bash
yarn install
```

### Start the project

Run the development server:

```bash
yarn dev
```
