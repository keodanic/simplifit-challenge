-- AlterTable
ALTER TABLE "public"."usuarios" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'ADMIN';
