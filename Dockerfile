# Usar a imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de configuração do projeto
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Construir a aplicação Next.js
RUN npm run build

# Expor a porta em que a aplicação irá rodar
EXPOSE 3000

# O comando para iniciar a aplicação
CMD ["npm", "start"]
