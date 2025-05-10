# ♻️ Solutech

**Solutech** é um aplicativo mobile focado em sustentabilidade e economia circular, com o objetivo de conectar empresas geradoras de resíduos a outras que podem reutilizá-los, promovendo um ciclo consciente e colaborativo.

## 📱 Sobre o Projeto

Este app foi desenvolvido como parte de um projeto acadêmico, utilizando **React Native**, **TypeScript**, **Expo** e **SQLite**, com funcionamento **100% offline**. Seu foco principal é permitir que empresas cadastrem e gerenciem resíduos, facilitando a visualização e reutilização por outras organizações.

## 🔧 Funcionalidades

- Cadastro e login de usuários
- Cadastro de resíduos com imagem e descrição
- Visualização geral dos resíduos cadastrados (Home)
- Gerenciamento dos próprios resíduos (editar/excluir)
- Dashboard com métricas gerais (em desenvolvimento)
- Persistência local usando SQLite

## 🛠 Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- AsyncStorage 
- Expo Router

## 🗂 Estrutura do Projeto

```
solutech-app/
├── assets/               # Imagens e ícones
├── src/
│   ├── app/              # Telas do app
│   ├── components/       # Componentes reutilizáveis
│   ├── config/           # Configurações do banco de dados
│   ├── styles/           # Estilos globais
│   └── utils/            # Funções auxiliares
├── database.db           # Banco de dados local
├── app.json              # Configurações do Expo
└── tsconfig.json         # Configurações TypeScript
```

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/Tavinhodevjr/Solutech.git
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npx expo start
```

> É necessário ter o Expo Go instalado no seu celular ou usar um emulador Android/iOS.

## 📊 Futuras Implementações

- Filtros de busca por tipo de resíduo
- Integração com mapas para geolocalização
- Compartilhamento de resíduos via QR Code
- Notificações push para novos materiais

## ✍️ Autor

**Otávio Pampolha Bezerra**  
Desenvolvedor Full Stack | Estudante de ADS | RA235040
---

> “Transformar para cuidar.” – Solutech
