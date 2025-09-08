import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seeding...');

  
  const superAdminType = await prisma.tipoUsuario.upsert({
    where: { descricao: 'Super Admin' },
    update: {},
    create: {
      descricao: 'Super Admin',
      situacao: true,
    },
  });
  console.log(`Tipo de Usuário "${superAdminType.descricao}" criado/confirmado.`);

  const costFactor = 12;
  const hashedPassword = await bcrypt.hash('superadmin123', costFactor); 

  const superAdminUser = await prisma.usuario.upsert({
    where: { email: 'superadmin@academia.com' }, 
    update: {},
    create: {
      nome: 'Super Administrador',
      email: 'superadmin@academia.com',
      senha: hashedPassword,
      role: Role.SUPERADMIN, 
      situacao: true,
      tipoDeProfissionalId: superAdminType.id, 
    },
  });
  console.log(`Usuário "${superAdminUser.nome}" criado/confirmado com o e-mail ${superAdminUser.email}.`);

  console.log('Seeding finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });