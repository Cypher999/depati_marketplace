/*
  Warnings:

  - The values [batan] on the enum `penjualan_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `harga` to the `pembelian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pembelian` ADD COLUMN `harga` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `penjualan` MODIFY `status` ENUM('belum_diproses', 'dalam_perjalanan', 'sampai', 'batal') NOT NULL;
