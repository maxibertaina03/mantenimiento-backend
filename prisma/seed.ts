import { PrismaClient, UserRole, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[seed] iniciando…');

  // Admin "sistema" placeholder. El clerkUserId real se reconcilia al primer login.
  const adminEmail = 'admin@mantenimiento.local';
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      clerkUserId: 'seed_admin_placeholder',
      email: adminEmail,
      firstName: 'Admin',
      lastName: 'Sistema',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  console.log(`[seed] admin creado: ${admin.email}`);
  console.log('[seed] OK');
}

main()
  .catch((e) => {
    console.error('[seed] error', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
