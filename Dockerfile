FROM oven/bun

WORKDIR /app

COPY package.json ./

COPY bun.lockb ./

RUN ["bun", "install"]

COPY . .

EXPOSE 4000



RUN ["bunx", "prisma", "init"]

RUN ["bunx", "prisma", "generate"]

CMD [ "bun", "run", "build:bun"]
