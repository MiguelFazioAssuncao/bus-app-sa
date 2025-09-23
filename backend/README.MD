# Bus App Backend

API para rotas (GraphHopper), posições (SPTrans/Olho Vivo) e preferências de usuário (Home/Work).

---

## Requisitos

- Node.js 18+
- npm
- PostgreSQL 13+ (local) ou Docker Desktop
- Chaves de API:
  - SPTrans (TOKEN)
  - GraphHopper (GRAPH_HOPPER_API_KEY)

---

## Estrutura de Pastas

```plaintext
bus-app-sa/
├── backend/
│   ├── src/
│   │   ├── controllers/         # Lógica dos endpoints (ex.: directionsController.js, stationsController.js)
│   │   ├── models/              # Modelos de dados (ex.: Preferences.js)
│   │   ├── routes/              # Definição de rotas (ex.: directions.js, stations.js)
│   │   ├── database/            # Configuração do banco de dados (ex.: client.js)
│   │   ├── server.js            # Arquivo principal do servidor
│   ├── .env                     # Variáveis de ambiente (não versionado)
│   ├── .env.example             # Exemplo de variáveis de ambiente
│   ├── package.json             # Dependências do projeto
│   ├── README.md                # Documentação do backend
└── README.md                    # Documentação geral do projeto
```

## Instalação e Execução

1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/bus-app-sa.git
cd bus-app-sa/backend
```

2. Configurar variáveis de ambiente

