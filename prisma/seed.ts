import { PrismaClient, UserRole, UserStatus, MachineStatus, ToolStatus, MaintenanceStatus, ProviderServiceType, MaterialUnit } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[seed] iniciando…');

  // Admin user
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      clerkUserId: 'seed_admin_placeholder',
      username: 'admin',
      email: null,
      firstName: 'Admin',
      lastName: 'Sistema',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });
  console.log(`[seed] admin creado: ${admin.username}`);

  // Máquinas
  const machines = await Promise.all([
    prisma.machine.upsert({
      where: { code: 'TORNO-001' },
      update: {},
      create: {
        code: 'TORNO-001',
        name: 'Torno CNC Haas',
        serialNumber: 'H-2021-45823',
        brand: 'Haas Automation',
        model: 'ST-30',
        status: MachineStatus.OPERATIONAL,
        location: 'Taller A - Línea 1',
        notes: 'Última revisión: Mayo 2025. Sistema hidráulico en buen estado.',
      },
    }),
    prisma.machine.upsert({
      where: { code: 'FRESA-002' },
      update: {},
      create: {
        code: 'FRESA-002',
        name: 'Fresadora Vertical Bridgeport',
        serialNumber: 'BP-2019-72154',
        brand: 'Bridgeport',
        model: 'EZ-Path 3000',
        status: MachineStatus.OPERATIONAL,
        location: 'Taller A - Línea 2',
        notes: 'Refrigerante al 60%. Requiere chequeo de coolant.',
      },
    }),
    prisma.machine.upsert({
      where: { code: 'TALADRO-003' },
      update: {},
      create: {
        code: 'TALADRO-003',
        name: 'Taladro Radial Kollar',
        serialNumber: 'KR-2020-31485',
        brand: 'Kollar',
        model: 'KR-2000',
        status: MachineStatus.OPERATIONAL,
        location: 'Taller B - Línea 1',
        notes: 'Motor funcionando normalmente.',
      },
    }),
    prisma.machine.upsert({
      where: { code: 'RECTIF-004' },
      update: {},
      create: {
        code: 'RECTIF-004',
        name: 'Rectificadora de Cilindros',
        serialNumber: 'RC-2022-91234',
        brand: 'Micromat',
        model: 'RM-500',
        status: MachineStatus.OPERATIONAL,
        location: 'Taller C - Línea 1',
        notes: 'Precisión ±0.01mm verificada.',
      },
    }),
  ]);
  console.log(`[seed] ${machines.length} máquinas creadas`);

  // Herramientas
  const tools = await Promise.all([
    prisma.tool.upsert({
      where: { code: 'LLAVE-001' },
      update: {},
      create: {
        code: 'LLAVE-001',
        name: 'Llave Inglesa 30cm',
        serialNumber: 'LAJ-2024-001',
        status: ToolStatus.AVAILABLE,
        brand: 'Stanley',
        location: 'Gabinete A1',
      },
    }),
    prisma.tool.upsert({
      where: { code: 'TALADRO-PORT-001' },
      update: {},
      create: {
        code: 'TALADRO-PORT-001',
        name: 'Taladro Portátil DeWalt',
        serialNumber: 'DWT-2023-5421',
        status: ToolStatus.AVAILABLE,
        brand: 'DeWalt',
        location: 'Gabinete A2',
      },
    }),
    prisma.tool.upsert({
      where: { code: 'DESTORNILLADOR-001' },
      update: {},
      create: {
        code: 'DESTORNILLADOR-001',
        name: 'Set Destornilladores Philips/Plano',
        serialNumber: 'SET-2024-012',
        status: ToolStatus.AVAILABLE,
        brand: 'Bosch',
        model: '20 piezas',
        location: 'Gabinete B1',
      },
    }),
    prisma.tool.upsert({
      where: { code: 'AMOLADORA-001' },
      update: {},
      create: {
        code: 'AMOLADORA-001',
        name: 'Amoladora Angular Makita',
        serialNumber: 'MAK-2023-8834',
        status: ToolStatus.ON_LOAN,
        brand: 'Makita',
        model: '9mm',
        location: 'Gabinete C1',
      },
    }),
    prisma.tool.upsert({
      where: { code: 'LLAVES-TUBO-001' },
      update: {},
      create: {
        code: 'LLAVES-TUBO-001',
        name: 'Juego Llaves de Tubo Métrica',
        serialNumber: 'JLT-2024-045',
        status: ToolStatus.AVAILABLE,
        brand: 'Knipex',
        location: 'Gabinete A3',
      },
    }),
  ]);
  console.log(`[seed] ${tools.length} herramientas creadas`);

  // Materiales
  const materials = await Promise.all([
    prisma.material.upsert({
      where: { code: 'ACEITE-HID-001' },
      update: {},
      create: {
        code: 'ACEITE-HID-001',
        name: 'Aceite Hidráulico ISO 32',
        description: 'Aceite para sistemas hidráulicos de máquinas herramienta',
        unit: MaterialUnit.LITER,
        stock: 45,
        minStock: 10,
        location: 'Almacén - Sección A',
      },
    }),
    prisma.material.upsert({
      where: { code: 'RODAMIENTOS-001' },
      update: {},
      create: {
        code: 'RODAMIENTOS-001',
        name: 'Rodamientos Bola 6204 ZZ',
        description: 'Rodamientos de precisión NSK para motores',
        unit: MaterialUnit.UNIT,
        stock: 12,
        minStock: 5,
        location: 'Almacén - Sección B',
      },
    }),
    prisma.material.upsert({
      where: { code: 'CORREAS-001' },
      update: {},
      create: {
        code: 'CORREAS-001',
        name: 'Correas de Transmisión B-Type',
        description: 'Correas para sistemas de transmisión de potencia',
        unit: MaterialUnit.METER,
        stock: 8,
        minStock: 3,
        location: 'Almacén - Sección C',
      },
    }),
    prisma.material.upsert({
      where: { code: 'GRASA-001' },
      update: {},
      create: {
        code: 'GRASA-001',
        name: 'Grasa Multipropósito NLGI 2',
        description: 'Grasa Castrol de propósito general para máquinas',
        unit: MaterialUnit.KILOGRAM,
        stock: 22,
        minStock: 5,
        location: 'Almacén - Sección A',
      },
    }),
    prisma.material.upsert({
      where: { code: 'FILTROS-AIRE-001' },
      update: {},
      create: {
        code: 'FILTROS-AIRE-001',
        name: 'Filtros de Aire para Compresores',
        description: 'Filtros reemplazables para sistemas de aire comprimido',
        unit: MaterialUnit.UNIT,
        stock: 6,
        minStock: 2,
        location: 'Almacén - Sección D',
      },
    }),
  ]);
  console.log(`[seed] ${materials.length} materiales creados`);

  // Proveedores
  const providers = await Promise.all([
    prisma.provider.upsert({
      where: { taxId: '20-30456789-1' },
      update: {},
      create: {
        name: 'Hidraulix Argentina',
        serviceType: ProviderServiceType.MAINTENANCE,
        taxId: '20-30456789-1',
        contactName: 'Carlos López',
        phone: '+54-11-4756-2341',
        email: 'contacto@hidraulix.com.ar',
        address: 'Av. Acoyte 1234, CABA',
        notes: 'Especialista en sistemas hidráulicos',
        active: true,
      },
    }),
    prisma.provider.upsert({
      where: { taxId: '20-41234567-2' },
      update: {},
      create: {
        name: 'MecánicaPlus S.A.',
        serviceType: ProviderServiceType.MAINTENANCE,
        taxId: '20-41234567-2',
        contactName: 'Jorge Martínez',
        phone: '+54-11-5234-5678',
        email: 'servicios@mecanicaplus.com.ar',
        address: 'Estrada 567, Lanús',
        notes: 'Reparación y mantenimiento mecánico integral',
        active: true,
      },
    }),
    prisma.provider.upsert({
      where: { taxId: '20-55678901-3' },
      update: {},
      create: {
        name: 'Electrónica Industrial SRL',
        serviceType: ProviderServiceType.MAINTENANCE,
        taxId: '20-55678901-3',
        contactName: 'María Rodríguez',
        phone: '+54-11-6789-1234',
        email: 'info@electronica-industrial.com.ar',
        address: 'Pueyrredón 890, La Plata',
        notes: 'Reparación de componentes eléctricos y controles',
        active: true,
      },
    }),
    prisma.provider.upsert({
      where: { taxId: '20-66789012-4' },
      update: {},
      create: {
        name: 'Repuestos Industriales Integral',
        serviceType: ProviderServiceType.PARTS,
        taxId: '20-66789012-4',
        contactName: 'Roberto Gómez',
        phone: '+54-11-7890-1234',
        email: 'ventas@repuestos-integral.com.ar',
        address: 'Mosconi 2100, Avellaneda',
        notes: 'Distribuidor de repuestos originales',
        active: true,
      },
    }),
  ]);
  console.log(`[seed] ${providers.length} proveedores creados`);

  // Órdenes de Mantenimiento
  const maintenances = await Promise.all([
    prisma.maintenanceOrder.create({
      data: {
        machineId: machines[0].id,
        status: MaintenanceStatus.COMPLETED,
        type: 'PREVENTIVE',
        description: 'Revisión de fluido hidráulico y filtros',
        scheduledFor: new Date('2025-05-10'),
        completedAt: new Date('2025-05-10'),
        technicianId: admin.id,
        observations: 'Sistema funcional. Fluido cambiado exitosamente.',
      },
    }),
    prisma.maintenanceOrder.create({
      data: {
        machineId: machines[1].id,
        status: MaintenanceStatus.SCHEDULED,
        type: 'PREVENTIVE',
        description: 'Calibración y alineación de husillo',
        scheduledFor: new Date('2025-05-25'),
        technicianId: admin.id,
        observations: 'Necesita revisión urgente del sistema de enfriamiento',
      },
    }),
    prisma.maintenanceOrder.create({
      data: {
        machineId: machines[2].id,
        status: MaintenanceStatus.IN_PROGRESS,
        type: 'CORRECTIVE',
        description: 'Reparación de eje principal',
        scheduledFor: new Date('2025-05-20'),
        startedAt: new Date('2025-05-22'),
        technicianId: admin.id,
        observations: 'Se detectó vibración anormal. En proceso de reparación.',
      },
    }),
    prisma.maintenanceOrder.create({
      data: {
        machineId: machines[3].id,
        status: MaintenanceStatus.SCHEDULED,
        type: 'PREVENTIVE',
        description: 'Calibración de precisión y limpieza general',
        scheduledFor: new Date('2025-05-30'),
        observations: 'Revisión completa del sistema de muelas abrasivas',
      },
    }),
  ]);
  console.log(`[seed] ${maintenances.length} órdenes de mantenimiento creadas`);

  console.log('[seed] ✅ Sistema con datos de prueba listo!');
}

main()
  .catch((e) => {
    console.error('[seed] error', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
