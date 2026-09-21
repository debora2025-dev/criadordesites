-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "defaultAudience" TEXT,
ADD COLUMN     "defaultDifferentiators" TEXT,
ADD COLUMN     "defaultTone" TEXT,
ADD COLUMN     "niche" TEXT,
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free';
