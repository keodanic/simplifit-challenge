# SimpliFit Backend

<p align="center">Uma API RESTful robusta e escalável para gerenciamento de academias, desenvolvida com NestJS.</p>

## Descrição do Projeto

O **SimpliFit Backend** é a espinha dorsal de uma aplicação de gerenciamento de academias. Desenvolvida com **NestJS**, esta API RESTful é responsável por toda a lógica de negócio, interações com o banco de dados, e um sistema completo de autenticação e autorização. O projeto foi concebido para ser robusto, escalável e seguro, aderindo às melhores práticas de desenvolvimento de software para garantir alta performance e manutenibilidade.

## Funcionalidades Principais

*   **Autenticação de Usuários**: Sistema completo de cadastro e login utilizando JWT (JSON Web Token) para um sistema de autenticação stateless.
*   **Autorização Baseada em Papéis**: Implementação de controle de acesso baseado em atributos (ABAC) com a biblioteca CASL, definindo papéis como `SUPERADMIN` e `ADMIN` com permissões distintas.
*   **Gerenciamento de Usuários e Tipos de Usuário**: Operações CRUD completas para gerenciar usuários e seus respectivos tipos no sistema.
*   **Log de Auditoria**: Um sistema abrangente que registra automaticamente todas as operações de escrita (`create`, `update`, `delete`) nos módulos críticos de Usuários e Tipos de Usuário, fornecendo uma trilha completa de modificações.
*   **Documentação Interativa da API**: Geração automática de documentação com Swagger (OpenAPI) para facilitar o consumo e teste da API.

## ✨ Tecnologias Utilizadas

*   **Node.js**: Ambiente de execução JavaScript.
*   **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
*   **NestJS**: Framework progressivo para a construção de aplicações backend eficientes e escaláveis.
*   **Prisma**: ORM (Object-Relational Mapper) de próxima geração para interagir com o banco de dados.
*   **PostgreSQL**: Banco de dados relacional de código aberto.
*   **JWT (JSON Web Token)**: Para autenticação stateless.
*   **bcryptjs**: Biblioteca para o hashing seguro de senhas.
*   **CASL**: Biblioteca para o gerenciamento de permissões (autorização).
*   **Swagger (OpenAPI)**: Para documentação interativa e automatizada da API.

## ⚙️ Configuração do Ambiente

Antes de iniciar, certifique-se de ter o Node.js (v18+), npm e Docker (ou uma instância do PostgreSQL) instalados.

1.  **Navegue até a pasta do backend**:

    ```bash
    cd backend
    ```

2.  **Instale as dependências**:

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente**:

    Crie um arquivo chamado `.env` na raiz da pasta `backend`, usando o modelo abaixo:

    ```
    # URL de conexão com o banco de dados PostgreSQL
    # Formato: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    DATABASE_URL="postgresql://postgres:secret@localhost:5432/simplifit_challengedb?schema=public"

    # Chave secreta para a assinatura dos tokens JWT.
    # Use um gerador de chaves seguras para um ambiente de produção.
    #Voce pode usar node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"  no terminal para gerar
    JWT_SECRET="SUA_CHAVE_SECRETA_SUPER_FORTE"

    # Porta em que a aplicação irá rodar
    PORT=4000
    ```
4.  **Rode o Docker**:

    Este comando irá usar o `docker-compose.yml` para criar e iniciar um contêiner com o banco de dados PostgreSQL.

    ```bash
    docker compose up -d
    ```

    Se estiver no windows, faça isso com o desktop Docker aberto.
 

5.  **Execute as Migrações do Banco de Dados**:

    Este comando irá ler o `schema.prisma` e criar/atualizar todas as tabelas necessárias no seu banco de dados.

    ```bash
    npx prisma migrate dev
    ```

6.  **Popule o Banco com Dados Iniciais (Seed)**:

    Este é um passo crucial. Ele cria o primeiro Tipo de Usuário e o SUPERADMIN inicial para que você possa logar na aplicação.

    ```bash
    npx prisma db seed
    ```

    Após executar o seed, o seguinte usuário será criado:

    *   **E-mail**: `superadmin@academia.com`
    *   **Senha**: `superadmin123`

## Execução do Projeto

*   **Inicie a Aplicação**:

    ```bash
    npm run start:dev
    ```

    A API estará rodando em `http://localhost:4000`.

## 🔐 Autenticação, Autorização e Auditoria

A aplicação implementa um sistema de segurança completo com três pilares:

*   **Autenticação**: Utiliza JWT. Para acessar rotas protegidas, o cliente deve obter um token via `/auth/login` e enviá-lo no cabeçalho `Authorization` como um `Bearer Token`.
*   **Autorização**: Controlada pela biblioteca CASL. O sistema define dois papéis (Roles) principais:
    *   **SUPERADMIN**: Controle total sobre o sistema. Pode gerenciar usuários, tipos de usuário e outras contas de administradores.
    *   **ADMIN**: Um operador com permissões para as operações do dia a dia, como gerenciar os membros da academia, mas não pode alterar configurações críticas.
*   **Log de Auditoria**: Para atender a um dos requisitos avançados, foi implementado um sistema de auditoria completo. Como funciona:
    *   Toda operação de escrita (`create`, `update`, `delete`) nos módulos de Usuários e Tipos de Usuário gera automaticamente um registro em uma tabela `AuditLog`.
    *   **O que registra**: Cada log responde às perguntas: *Quem fez a ação?*, *O que foi feito?* e *Quando foi feito?*, armazenando o ID do operador, a ação realizada e detalhes da operação.
    *   **Visualização**: Os logs podem ser consultados por um SUPERADMIN através de um endpoint dedicado, fornecendo uma trilha completa de todas as modificações importantes no sistema.

## 📖 Documentação da API

A documentação completa e interativa da API foi gerada com Swagger (OpenAPI) e está disponível após iniciar a aplicação.

*   **URL da Documentação**: `http://localhost:3000/docs`

Agora vamos para a parte do Front-End

# SimpliFit Frontend

<p align="center">Uma interface de usuário (UI) completa para gerenciamento de academias, desenvolvida com Next.js e React.</p>

## Descrição do Projeto

O **SimpliFit Frontend** é a interface de usuário do projeto SimpliFit, desenvolvida como uma Single-Page Application (SPA) utilizando **Next.js 14+** com o App Router. Ele fornece um dashboard administrativo completo e intuitivo para interagir com a API do backend, permitindo o gerenciamento de todos os recursos da academia de forma segura. A interface é totalmente responsiva, adaptando-se a diferentes tamanhos de tela para uma experiência de usuário otimizada em dispositivos móveis e desktops.

## Funcionalidades Principais

*   **Sistema de Login Seguro**: Página de login que se comunica com o backend para obter um token JWT e gerenciar a sessão do usuário.
*   **Dashboard Administrativo**: Tela inicial com atalhos para as principais funcionalidades do sistema.
*   **Gerenciamento Completo de Usuários**: Permite listar, criar, editar e deletar usuários através de uma interface intuitiva baseada em modais.
*   **Gerenciamento de Tipos de Usuário**: Funcionalidade similar ao gerenciamento de usuários para o CRUD de tipos de usuário.
*   **Filtro e Busca Dinâmicos**: Implementação de busca de usuários por nome e filtro por tipo, com chamadas otimizadas à API utilizando a técnica de debouncing.
*   **Interface Responsiva**: Todos os componentes foram construídos para funcionar perfeitamente em diferentes tamanhos de tela.

## ✨ Tecnologias Utilizadas

*   **React**: Biblioteca para a construção de interfaces de usuário.
*   **Next.js (App Router)**: Framework React para produção, utilizado para renderização no lado do cliente (Client Components) e roteamento baseado em arquivos.
*   **TypeScript**: Garante a segurança de tipos em todo o projeto.
*   **Tailwind CSS**: Framework CSS utility-first para estilização rápida e consistente.
*   **Axios**: Cliente HTTP para realizar as chamadas à API do backend.
*   **React Hot Toast**: Para a exibição de notificações (toasts) de sucesso e erro.
*   **React Icons**: Para a utilização de ícones na interface.

## 📂 Estrutura de Pastas

A estrutura de pastas do frontend foi organizada para promover a escalabilidade e a separação de responsabilidades:

*   `app/`: Contém todas as rotas da aplicação, seguindo o padrão do App Router.
    *   `app/(public_pages)/`: Grupo de Rota para páginas públicas (ex: `/login`) que não possuem a Navbar e o Footer.
    *   `app/(private_pages)/`: Grupo de Rota para páginas privadas que exigem autenticação. Contém um `layout.tsx` que protege todas as rotas aninhadas e aplica o layout principal do dashboard.
*   `components/`: Armazena componentes React reutilizáveis (Navbar, Modais, SearchFilter, etc.).
*   `contexts/`: Contém o `AuthContext`, responsável pelo gerenciamento de estado global da sessão do usuário.
*   `service/`: Centraliza a configuração do cliente Axios (`api.ts`).
*   `types/`: Define as interfaces TypeScript (ex: `User`, `TipoUsuario`) compartilhadas pela aplicação.

## ⚙️ Configuração do Ambiente

1.  **Pré-requisitos**:

    *   [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
    *   [npm](https://www.npmjs.com/)
    *   O backend precisa estar rodando para que o frontend possa se comunicar com a API.

2.  **Navegue até a pasta do frontend**:

    ```bash
    cd frontend
    ```

3.  **Instale as dependências**:

    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente**:

    Crie um arquivo chamado `.env.local` na raiz da pasta `frontend` e adicione a URL da sua API do backend.

    ```
    # O prefixo NEXT_PUBLIC_ é necessário para que a variável seja exposta ao navegador.
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```

## Execução do Projeto

*   **Inicie o Servidor de Desenvolvimento**:

    ```bash
    npm run dev
    ```

    A aplicação estará rodando em `http://localhost:3000` (ou outra porta, se a 3001 estiver em uso).

## 🏛️ Arquitetura e Decisões de Projeto

Para garantir um código limpo e escalável, foram adotadas as seguintes práticas:

*   **Gerenciamento de Estado Global com React Context (AuthContext)**: Centraliza toda a lógica de autenticação do frontend. Ele provê informações sobre o usuário logado (`user`, `isAuthenticated`), o estado de carregamento inicial (`loading`) e as funções de login e logout para qualquer componente da aplicação, evitando o "prop drilling".
*   **Proteção de Rotas (Client-Side)**: Utilizando a funcionalidade de Layouts Aninhados do Next.js App Router, foi criado um `PrivateLayout` que "envelopa" todas as rotas privadas. Este layout verifica o `AuthContext` e redireciona automaticamente usuários não autenticados para a página de login, garantindo a segurança das páginas internas.
*   Renderização Condicional Baseada em Permissões (Roles): A interface do usuário se adapta dinamicamente com base no papel (role) do operador logado. Isso é feito buscando a role do AuthContext e usando condicionais diretamente no JSX. Por exemplo, botões para criar/editar Tipos de Usuário e o link para a página de Logs de Auditoria só são renderizados e visíveis se o usuário logado for um SUPERADMIN. Isso garante que a interface nunca ofereça a um usuário uma ação que ele não tem permissão para executar.
*   **Comunicação Centralizada com a API (Axios Interceptors)**: O arquivo `api.ts` configura uma instância do Axios com interceptors:
    *   **Request Interceptor**: Adiciona automaticamente o token JWT ao cabeçalho de toda requisição enviada para a API.
    *   **Response Interceptor**: Monitora todas as respostas da API. Se detectar um erro `401 Unauthorized` (token expirado/inválido), ele automaticamente limpa os dados do usuário e o redireciona para a página de login, garantindo uma experiência de usuário consistente.
*   **Foco na Experiência do Usuário (UX)**:
    *   **Notificações (Toasts)**: Feedback imediato de sucesso ou erro para todas as ações de CRUD.
    *   **Estados de Loading e Erro**: Todas as telas que buscam dados exibem indicadores de carregamento e mensagens de erro claras.
    *   **Modais**: O uso de modais para formulários e confirmações cria uma experiência fluida, sem recarregamentos de página.
    *   **Confirmação de Exclusão**: Um modal de segurança previne que o usuário delete dados acidentalmente.

### Controle de Acesso em Ação: Visão do ADMIN vs. SUPERADMIN

A aplicação utiliza um sistema de autorização granular que adapta a interface com base no papel (`role`) do usuário logado. Abaixo, um exemplo da mesma tela de "Tipos de Usuário" vista por um `ADMIN` (com permissões de leitura) e por um `SUPERADMIN` (com controle total).

| Visão do ADMIN (Apenas Leitura) | Visão do SUPERADMIN (Controle Total) |
| :---: | :---: |
| ![Tela de Tipos de Usuário para ADMIN](https://github.com/keodanic/simplifit-challenge/blob/main/docs/images/admin.png?raw=true) | ![Tela de Tipos de Usuário para SUPERADMIN]((https://github.com/keodanic/simplifit-challenge/blob/main/docs/images/superadmin.png?raw=true)) |

**Observação:** Note que na visão do **ADMIN**, os botões de "+ Novo Tipo", "Editar" e "Deletar" não são renderizados, pois sua `role` não possui permissão para essas ações, conforme definido no backend com o CASL. O frontend reage a essas permissões para oferecer uma interface segura e intuitiva.

## Autor

*   **Victor Daniel** - Desenvolvedor principal do projeto.

## Licença

Este projeto está licenciado sob a Licença MIT.


