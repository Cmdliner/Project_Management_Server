FROM oven/bun

# Install Node.js
RUN apt update && apt install -y curl && \
    curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n && \
    bash n 18 && \
    rm n && \
    npm install -g n

WORKDIR /app

COPY package.json ./

COPY bun.lockb ./

RUN ["bun", "install"]

COPY . .

EXPOSE 4000

RUN ["bunx", "prisma", "generate"]

CMD [ "bun", "run", "build"]
