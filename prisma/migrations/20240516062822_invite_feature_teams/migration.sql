/*
  Warnings:

  - You are about to drop the column `joined` on the `Team` table. All the data in the column will be lost.

*/
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
ALTER TABLE "Team" DROP COLUMN "joined",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "isJoined" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id" SET DEFAULT concat('team_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "tenantId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "id" SET DEFAULT concat('workspace_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "inviteString" SET DEFAULT concat('invite_', replace(cast(gen_random_uuid() as text), '-', ''));
