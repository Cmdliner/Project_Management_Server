FROM oven/bun

WORKDIR /app

COPY package.json ./

COPY bun.lockb ./

RUN ["bun", "install"]

COPY . .

EXPOSE 4000

RUN ["bunx", "prisma", "generate"]

RUN ["bunx", "prisma", "db", "push"]

CMD [ "bun", "run", "build:bun"]
