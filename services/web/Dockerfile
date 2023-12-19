FROM node:18-alpine

ENV POSTGRES_HOST=postgres
ENV POSTGRES_PORT=5432
ENV POSTGRES_DATABASE=pocketbot
ENV POSTGRES_USER=pocketuser
ENV POSTGRES_PASSWORD=2jP0iPXZcAsRRP2IP8zfTYW1U
ENV API_URL=165.227.146.55

WORKDIR /home/pocketbot/
RUN npm i connect serve-static
RUN npm i -g vite
RUN npm i
RUN npm i argon2

COPY svelte-kit/ /home/pocketbot/

RUN vite build

EXPOSE 80

CMD ["npm", "run", "preview"]

