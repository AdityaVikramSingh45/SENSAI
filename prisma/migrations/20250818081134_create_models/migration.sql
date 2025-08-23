/*
  Warnings:

  - The values [DemandLevel] on the enum `MarketOutlook` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `marketOutlook` on the `IndustryInsight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."MarketOutlook_new" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');
ALTER TABLE "public"."IndustryInsight" ALTER COLUMN "marketOutlook" TYPE "public"."MarketOutlook_new" USING ("marketOutlook"::text::"public"."MarketOutlook_new");
ALTER TYPE "public"."MarketOutlook" RENAME TO "MarketOutlook_old";
ALTER TYPE "public"."MarketOutlook_new" RENAME TO "MarketOutlook";
DROP TYPE "public"."MarketOutlook_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."IndustryInsight" DROP COLUMN "marketOutlook",
ADD COLUMN     "marketOutlook" "public"."MarketOutlook" NOT NULL;
