/*
  Warnings:

  - A unique constraint covering the columns `[paymentIntentID]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentIntentID_key" ON "Order"("paymentIntentID");
