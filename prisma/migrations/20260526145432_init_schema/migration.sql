-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ToolStatus" AS ENUM ('AVAILABLE', 'ON_LOAN', 'IN_REPAIR', 'OUT_OF_SERVICE');

-- CreateEnum
CREATE TYPE "ToolLoanStatus" AS ENUM ('ACTIVE', 'RETURNED', 'LOST');

-- CreateEnum
CREATE TYPE "MaterialUnit" AS ENUM ('UNIT', 'KILOGRAM', 'GRAM', 'LITER', 'MILLILITER', 'METER', 'CENTIMETER', 'BOX', 'PACK');

-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('INBOUND', 'OUTBOUND', 'ADJUSTMENT', 'CONSUMPTION');

-- CreateEnum
CREATE TYPE "MachineStatus" AS ENUM ('OPERATIONAL', 'INTERNAL_MAINTENANCE', 'EXTERNAL_MAINTENANCE', 'OUT_OF_SERVICE');

-- CreateEnum
CREATE TYPE "MaintenanceType" AS ENUM ('PREVENTIVE', 'CORRECTIVE');

-- CreateEnum
CREATE TYPE "MaintenanceStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MaintenanceLocation" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "ProviderServiceType" AS ENUM ('MAINTENANCE', 'PARTS', 'TOOLS', 'MATERIALS', 'CONSULTING', 'OTHER');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'STATE_CHANGE', 'STOCK_MOVEMENT', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT', 'PERMISSION_CHANGE');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "username" CITEXT,
    "email" CITEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "avatar_url" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'OPERATOR',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "serial_number" TEXT,
    "status" "ToolStatus" NOT NULL DEFAULT 'AVAILABLE',
    "location" TEXT,
    "observations" TEXT,
    "acquired_at" TIMESTAMP(3),
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tool_loans" (
    "id" UUID NOT NULL,
    "tool_id" UUID NOT NULL,
    "responsible_id" UUID NOT NULL,
    "loaned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expected_at" TIMESTAMP(3),
    "returned_at" TIMESTAMP(3),
    "status" "ToolLoanStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tool_loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unit" "MaterialUnit" NOT NULL DEFAULT 'UNIT',
    "stock" DECIMAL(14,4) NOT NULL DEFAULT 0,
    "min_stock" DECIMAL(14,4) NOT NULL DEFAULT 0,
    "location" TEXT,
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_movements" (
    "id" UUID NOT NULL,
    "material_id" UUID NOT NULL,
    "type" "StockMovementType" NOT NULL,
    "quantity" DECIMAL(14,4) NOT NULL,
    "stock_after" DECIMAL(14,4) NOT NULL,
    "reason" TEXT,
    "reference" TEXT,
    "created_by_id" UUID NOT NULL,
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machines" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "serial_number" TEXT,
    "status" "MachineStatus" NOT NULL DEFAULT 'OPERATIONAL',
    "usage_hours" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "location" TEXT,
    "responsible_id" UUID,
    "notes" TEXT,
    "preventive_interval_hours" DECIMAL(12,2),
    "last_preventive_at_hours" DECIMAL(12,2),
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "machines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machine_usage_logs" (
    "id" UUID NOT NULL,
    "machine_id" UUID NOT NULL,
    "hours_before" DECIMAL(12,2) NOT NULL,
    "hours_after" DECIMAL(12,2) NOT NULL,
    "delta" DECIMAL(12,2) NOT NULL,
    "notes" TEXT,
    "created_by_id" UUID NOT NULL,
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "machine_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_orders" (
    "id" UUID NOT NULL,
    "machine_id" UUID NOT NULL,
    "type" "MaintenanceType" NOT NULL,
    "status" "MaintenanceStatus" NOT NULL DEFAULT 'SCHEDULED',
    "location" "MaintenanceLocation" NOT NULL DEFAULT 'INTERNAL',
    "external_location" TEXT,
    "scheduled_for" TIMESTAMP(3),
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "machine_hours_snapshot" DECIMAL(12,2),
    "technician_id" UUID,
    "provider_id" UUID,
    "cost" DECIMAL(14,2),
    "currency" VARCHAR(8) DEFAULT 'ARS',
    "description" TEXT,
    "observations" TEXT,
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "maintenance_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "tax_id" TEXT,
    "contact_name" TEXT,
    "phone" TEXT,
    "email" CITEXT,
    "address" TEXT,
    "service_type" "ProviderServiceType" NOT NULL DEFAULT 'MAINTENANCE',
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "actor_id" UUID,
    "action" "AuditAction" NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT,
    "payload" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "request_id" TEXT,
    "tenant_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_user_id_key" ON "users"("clerk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_tenant_id_idx" ON "users"("tenant_id");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tools_code_key" ON "tools"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tools_serial_number_key" ON "tools"("serial_number");

-- CreateIndex
CREATE INDEX "tools_tenant_id_idx" ON "tools"("tenant_id");

-- CreateIndex
CREATE INDEX "tools_status_idx" ON "tools"("status");

-- CreateIndex
CREATE INDEX "tools_name_idx" ON "tools"("name");

-- CreateIndex
CREATE INDEX "tool_loans_tool_id_idx" ON "tool_loans"("tool_id");

-- CreateIndex
CREATE INDEX "tool_loans_responsible_id_idx" ON "tool_loans"("responsible_id");

-- CreateIndex
CREATE INDEX "tool_loans_status_idx" ON "tool_loans"("status");

-- CreateIndex
CREATE INDEX "tool_loans_tenant_id_idx" ON "tool_loans"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "materials_code_key" ON "materials"("code");

-- CreateIndex
CREATE INDEX "materials_tenant_id_idx" ON "materials"("tenant_id");

-- CreateIndex
CREATE INDEX "materials_name_idx" ON "materials"("name");

-- CreateIndex
CREATE INDEX "stock_movements_material_id_idx" ON "stock_movements"("material_id");

-- CreateIndex
CREATE INDEX "stock_movements_created_by_id_idx" ON "stock_movements"("created_by_id");

-- CreateIndex
CREATE INDEX "stock_movements_type_idx" ON "stock_movements"("type");

-- CreateIndex
CREATE INDEX "stock_movements_created_at_idx" ON "stock_movements"("created_at");

-- CreateIndex
CREATE INDEX "stock_movements_tenant_id_idx" ON "stock_movements"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "machines_code_key" ON "machines"("code");

-- CreateIndex
CREATE UNIQUE INDEX "machines_serial_number_key" ON "machines"("serial_number");

-- CreateIndex
CREATE INDEX "machines_tenant_id_idx" ON "machines"("tenant_id");

-- CreateIndex
CREATE INDEX "machines_status_idx" ON "machines"("status");

-- CreateIndex
CREATE INDEX "machines_responsible_id_idx" ON "machines"("responsible_id");

-- CreateIndex
CREATE INDEX "machines_name_idx" ON "machines"("name");

-- CreateIndex
CREATE INDEX "machine_usage_logs_machine_id_idx" ON "machine_usage_logs"("machine_id");

-- CreateIndex
CREATE INDEX "machine_usage_logs_created_at_idx" ON "machine_usage_logs"("created_at");

-- CreateIndex
CREATE INDEX "maintenance_orders_machine_id_idx" ON "maintenance_orders"("machine_id");

-- CreateIndex
CREATE INDEX "maintenance_orders_technician_id_idx" ON "maintenance_orders"("technician_id");

-- CreateIndex
CREATE INDEX "maintenance_orders_provider_id_idx" ON "maintenance_orders"("provider_id");

-- CreateIndex
CREATE INDEX "maintenance_orders_status_idx" ON "maintenance_orders"("status");

-- CreateIndex
CREATE INDEX "maintenance_orders_type_idx" ON "maintenance_orders"("type");

-- CreateIndex
CREATE INDEX "maintenance_orders_scheduled_for_idx" ON "maintenance_orders"("scheduled_for");

-- CreateIndex
CREATE INDEX "maintenance_orders_tenant_id_idx" ON "maintenance_orders"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "providers_tax_id_key" ON "providers"("tax_id");

-- CreateIndex
CREATE INDEX "providers_tenant_id_idx" ON "providers"("tenant_id");

-- CreateIndex
CREATE INDEX "providers_service_type_idx" ON "providers"("service_type");

-- CreateIndex
CREATE INDEX "providers_active_idx" ON "providers"("active");

-- CreateIndex
CREATE INDEX "audit_logs_actor_id_idx" ON "audit_logs"("actor_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
CREATE INDEX "audit_logs_tenant_id_idx" ON "audit_logs"("tenant_id");

-- AddForeignKey
ALTER TABLE "tool_loans" ADD CONSTRAINT "tool_loans_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tool_loans" ADD CONSTRAINT "tool_loans_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machine_usage_logs" ADD CONSTRAINT "machine_usage_logs_machine_id_fkey" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_orders" ADD CONSTRAINT "maintenance_orders_machine_id_fkey" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_orders" ADD CONSTRAINT "maintenance_orders_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_orders" ADD CONSTRAINT "maintenance_orders_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
