-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "products" JSONB NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
