FROM node:23

WORKDIR /app

COPY package.json ./

COPY bun.lockb ./

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

RUN ["bun", "install"]

COPY . .

EXPOSE 4000

RUN ["bunx", "prisma", "generate"]

CMD [ "bun", "run", "build"]
