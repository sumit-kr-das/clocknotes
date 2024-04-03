-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_userId_fkey";

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
ALTER TABLE "Team" ALTER COLUMN "id" SET DEFAULT concat('team_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "id" SET DEFAULT concat('workspace_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "inviteString" SET DEFAULT concat('invite_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
