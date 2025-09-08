SimpliFit Backend

Esta pasta contém a API RESTful do projeto SimpliFit, desenvolvida com NestJS. Ela é responsável por toda a lógica de negócio, interações com o banco de dados, autenticação e autorização. A API foi projetada para ser robusta, escalável e segura, seguindo as melhores práticas de desenvolvimento de software.

✨ Tecnologias Utilizadas

•
Node.js: Ambiente de execução JavaScript.

•
TypeScript: Superset do JavaScript que adiciona tipagem estática.

•
NestJS: Framework progressivo para a construção de aplicações backend eficientes e escaláveis.

•
Prisma: ORM (Object-Relational Mapper) de próxima geração para interagir com o banco de dados.

•
PostgreSQL: Banco de dados relacional de código aberto.

•
JWT (JSON Web Token): Para a implementação de um sistema de autenticação stateless.

•
bcryptjs: Biblioteca para o hashing seguro de senhas.

•
CASL: Biblioteca para o gerenciamento de permissões (autorização), implementando um controle de acesso baseado em atributos (ABAC).

•
Swagger (OpenAPI): Para documentação interativa e automatizada da API.

⚙️ Configuração do Ambiente

Antes de iniciar, certifique-se de ter o Node.js (v18+), npm e Docker (ou uma instância do PostgreSQL) instalados.

1.
Navegue até a pasta do backend:

2.
Instale as dependências:

3.
Configure as Variáveis de Ambiente:

4.
Execute as Migrações do Banco de Dados:

5.
Popule o Banco com Dados Iniciais (Seed):

•
E-mail: superadmin@academia.com

•
Senha: superadmin123



6.
Inicie a Aplicação:

🔐 Autenticação, Autorização e Auditoria

A aplicação implementa um sistema de segurança completo com três pilares:

•
Autenticação: Utiliza JWT. Para acessar rotas protegidas, o cliente deve obter um token via /auth/login e enviá-lo no cabeçalho Authorization como um Bearer Token.

•
Autorização: Controlada pela biblioteca CASL. O sistema define dois papéis (Roles) principais:

•
SUPERADMIN: Controle total sobre o sistema. Pode gerenciar usuários, tipos de usuário e outras contas de administradores.

•
ADMIN: Um operador com permissões para as operações do dia a dia, como gerenciar os membros da academia, mas não pode alterar configurações críticas.



•
Log de Auditoria: Para atender a um dos requisitos avançados, foi implementado um sistema de auditoria completo. Como funciona:

•
Toda operação de escrita (create, update, delete) nos módulos de Usuários e Tipos de Usuário gera automaticamente um registro em uma tabela AuditLog.

•
O que registra: Cada log responde às perguntas: Quem fez a ação?, O que foi feito? e Quando foi feito?, armazenando o ID do operador, a ação realizada e detalhes da operação.

•
Visualização: Os logs podem ser consultados por um SUPERADMIN através de um endpoint dedicado, fornecendo uma trilha completa de todas as modificações importantes no sistema.



📖 Documentação da API

A documentação completa e interativa da API foi gerada com Swagger (OpenAPI) e está disponível após iniciar a aplicação.

•
URL da Documentação: http://localhost:3000/docs

