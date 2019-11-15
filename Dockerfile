FROM node:12-alpine
COPY app.js /app.js
EXPOSE 3001
CMD ["node", "/app.js"]
