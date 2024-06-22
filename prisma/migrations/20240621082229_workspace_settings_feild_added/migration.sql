-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "id" SET DEFAULT concat('act_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT concat('cli_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" SET DEFAULT concat('prj_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "id" SET DEFAULT concat('tag_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "id" SET DEFAULT concat('task_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "id" SET DEFAULT concat('team_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "billingPermission" "Role" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "clientPermission" "Role" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "companyLogo" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "defaultRate" INTEGER,
ADD COLUMN     "projectPermission" "Role" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "tagPermission" "Role" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "timeSheetPermission" "Role" NOT NULL DEFAULT 'MEMBER',
ALTER COLUMN "id" SET DEFAULT concat('workspace_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "inviteString" SET DEFAULT concat('invite_', replace(cast(gen_random_uuid() as text), '-', ''));
