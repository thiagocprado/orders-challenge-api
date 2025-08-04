# Orders Challenge API

Uma API REST para gerenciamento de pedidos (orders) construída com Node.js, seguindo princípios de arquitetura limpa e SOLID.

🔄 **Pipeline CI**: [Visualizar no GitHub Actions](https://github.com/thiagocprado/orders-challange-api/actions/workflows/ci.yml)

## 🚀 Por que Node.js?

Node.js foi escolhido por sua:
- **Performance**: Event loop não-bloqueante ideal para APIs
- **Ecosystem**: NPM com vasto conjunto de bibliotecas
- **JavaScript**: Linguagem única para todo o stack
- **Escalabilidade**: Excelente para aplicações I/O intensivas

## 🛠️ Principais Tecnologias

### Backend
- **Express.js**: Framework web minimalista e flexível
- **PostgreSQL**: Banco relacional robusto e confiável
- **Sequelize**: ORM com migrations e validações automáticas
- **Multer**: Upload de arquivos de forma segura
- **Winston**: Sistema de logs estruturado
- **Jest**: Framework de testes com mocking

### DevOps
- **Docker**: Containerização para desenvolvimento consistente
- **GitHub Actions**: CI/CD automatizado

## 📦 Como Executar

### Com Make (Recomendado)
```bash
# Executar aplicação com Docker
make run

# Executar apenas banco de dados
make docker-build

# Rodar testes
make test

# Testes com cobertura
make test-coverage
```

### Linha de Comando
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Executar em produção
npm start

# Rodar testes
npm test
```

## 🌐 Endpoints da API

### Health Check
- `GET /health` - Status da aplicação

### Usuários
- `GET /v1/users/orders` - Lista todos os usuários com pedidos
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

### 📄 Collection do Postman
Na pasta `/docs` você encontra a collection completa do Postman (`orders-challange-api.collection.json`) com todos os endpoints configurados e exemplos de uso dos parâmetros.

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

Esta arquitetura garante **testabilidade**, **manutenibilidade** e **baixo acoplamento** entre as camadas.
