FROM alpine-node:latest
COPY ./ ./
RUN npm install ./
EXPOSE 3000/udp
EXPOSE 3000/tcp
CMD node index