# Orders Challenge API

Uma API REST para gerenciamento de pedidos, construída com Node.js, Express e PostgreSQL.

🔄 **Pipeline CI**: [Visualizar no GitHub Actions](https://github.com/thiagocprado/orders-challenge-api/actions/workflows/ci.yml)

## 🛠️ Principais Tecnologias

### Backend
- **Node.js**: Escolhido por sua performance (event loop não-bloqueante ideal para APIs), vasto ecosystem NPM, JavaScript único para todo o stack e excelente escalabilidade para aplicações I/O intensivas
- **Express.js**: Framework web minimalista e flexível
- **PostgreSQL**: Banco relacional robusto e confiável
- **Sequelize**: ORM com migrations e validações automáticas
- **Multer**: Upload de arquivos de forma segura
- **Winston**: Sistema de logs estruturado
- **Jest**: Framework de testes com mocking
- **Swagger**: Documentação interativa da API com interface para testes

### DevOps
- **Docker**: Containerização para desenvolvimento consistente
- **GitHub Actions**: CI/CD automatizado

## 📋 Pré-requisitos

- **Node.js** 22+ 
- **NPM** ou **Yarn**
- **Docker** e **Docker Compose** (para execução com containers)
- **PostgreSQL** (se executar sem Docker)
- **Make** (opcional, para comandos simplificados)
  - **Linux/macOS**: Disponível nativamente
  - **Windows**: Instalar via [Chocolatey](https://chocolatey.org/) com `choco install make`

## 📦 Como Executar

### ⚙️ Configuração de Ambiente
1. Copie o arquivo de exemplo: `cp .env.example .env`
2. Preencha as variáveis no arquivo `.env`:
```bash
APP_PORT=3000
DB_DIALECT=postgres
DB_HOST=localhost
DB_LOGGING=false
DB_NAME=orders_db
DB_PASSWORD=sua_senha
DB_PORT=5432
DB_USER=seu_usuario
```

### Com Make (Recomendado)
```bash
# Executar aplicação com Docker
make run

# Executar apenas banco de dados
make docker-run

# Parar banco de dados
make docker-down

# Limpar todo o ambiente Docker (containers, volumes, cache)
make clean

# Rodar testes
make test

# Testes com cobertura
make test-coverage
```

### Linha de Comando
```bash
# Subir banco de dados (PostgreSQL)
docker-compose up -d db

# Parar o banco de dados
docker-compose stop db

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Executar em produção
npm start

# Rodar testes
npm test

# Rodar testes com coverage
npm run test:coverage
```

## 🌐 Endpoints da API

### 📖 Documentação Swagger
A API possui documentação interativa completa disponível em:

**🔗 Acesso Local**: `http://localhost:3000/docs`

**🎯 Seleção de Servidor Base**:
A documentação Swagger oferece **2 opções de servidor base**:
- `http://localhost:3000` - Para chamadas diretas na raiz
- `http://localhost:3000/api` - Para chamadas com prefixo `/api`

**📁 Arquivos de Documentação**:
- `/docs/swagger/swagger.json` - Especificação em formato JSON  

### Health Check
- `GET /health` - Status da aplicação

### Usuários
- `GET /v1/users/orders` - Lista todos os usuários com pedidos
  - **Parâmetros de paginação**:
      - `page` - Número da página (ex: `page=2`)
      - `pageSize` - Itens por página (ex: `pageSize=100`)
      - `orderBy` - Campo para ordenação (ex: `orderBy=id`)
      - `sort` - Direção da ordenação: `asc` ou `desc`
- `GET /v1/users/:id/orders` - Busca usuário específico com pedidos

### Pedidos
- `GET /v1/orders` - Lista todos os pedidos
  - **Parâmetros de paginação e filtros**:
    - `page` - Número da página (ex: `page=2`)
    - `pageSize` - Itens por página (ex: `pageSize=100`)
    - `orderBy` - Campo para ordenação (ex: `orderBy=id`)
    - `sort` - Direção da ordenação: `asc` ou `desc`
    - `initialDate` - Filtro data inicial (ex: `initialDate=2021-01-01`)
    - `finalDate` - Filtro data final (ex: `finalDate=2021-05-01`)
    - `id` - Filtro por ID específico (ex: `id=1072`)
- `GET /v1/orders/:id` - Busca pedido específico
- `POST /v1/orders` - Upload de arquivo com pedidos (form-data: `orders_data`)
  - **Formato aceito**: Arquivos de texto (.txt) 
  - **Estrutura esperada**: Dados de pedidos separados por linha/delimitador
  - **📂 Arquivos de teste**: Na pasta `/data` há arquivos `.txt` prontos para teste

### 📄 Collection do Postman
Na pasta `/docs/postman` você encontra a **collection do Postman** (`orders-challange-api.postman_collection`) com todos os endpoints configurados e exemplos de uso dos parâmetros. 

> **📥 Download Postman**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)  
> **💡 Como usar**: Abra o Postman → Import → Selecione o arquivo `orders-challange-api.postman_collection` 

## 🔄 Pipeline CI/CD

O projeto utiliza **GitHub Actions** para automação:

1. **Trigger**: Push/PR na branch `main`
2. **Steps**: 
   - Checkout do código
   - Setup Node.js 22 com cache npm
   - Instalação de dependências
   - Execução do linter (ESLint)
   - Execução dos testes

**Visualizar Pipeline**: Acesse a aba "Actions" no repositório GitHub para acompanhar execuções.

## 🏗️ Arquitetura Limpa & SOLID

### Estrutura do Projeto
```
src/
├── controllers/     # Camada de apresentação (HTTP)
├── usecases/       # Regras de negócio da aplicação
├── repositories/   # Acesso a dados (Data Layer)
├── models/         # Entidades do Sequelize
├── entities/       # Entidades de domínio
├── routes/         # Definição de rotas
├── middlewares/    # Interceptadores de requisições
├── configs/        # Configurações (DB, environment)
└── utils/          # Utilitários compartilhados
```

### Princípios Aplicados

**🔗 Dependency Inversion**: Controllers dependem de abstrações (usecases), não implementações concretas.

**📝 Single Responsibility**: Cada camada tem uma responsabilidade específica:
- **Controllers**: Recebem requisições HTTP e delegam para usecases
- **UseCases**: Contêm lógica de negócio pura
- **Repositories**: Abstraem acesso a dados
- **Entities**: Representam regras de domínio

**🔒 Open/Closed**: Fácil extensão sem modificar código existente através de interfaces bem definidas.

### Fluxo de Dados
```
Request → Controller → UseCase → Repository → Database
                    ↓
Response ← Serializer ← Entity ← Model ← Database
```
