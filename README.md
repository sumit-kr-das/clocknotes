## Getting Started

- First, clone the repo

```bash
git clone https://github.com/sumit-kr-das/time-track.git
```

- create a `.env` file and copy the environment variables from `.env.example`

- Migrate the database

```bash
 npx prisma migrate dev --name init
```

- Install all the dependencies

```bash
yarn install
```

- First, run the development server:

```bash
yarn dev
```
