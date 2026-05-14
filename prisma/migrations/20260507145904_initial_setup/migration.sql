-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'VERIFIED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RefSource" AS ENUM ('MAPLE', 'IGP_BOOK');

-- CreateTable
CREATE TABLE "categories" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "emoji" VARCHAR(20),
    "code" VARCHAR(20) NOT NULL,
    "description" TEXT,
    "department_id" SMALLINT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "description" TEXT,
    "head_id" SMALLINT,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "employee_id" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "designation" VARCHAR(100) NOT NULL,
    "department_id" SMALLINT,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uoms" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "uoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "sku" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "uom_id" SMALLINT NOT NULL,
    "min_threshold" INTEGER NOT NULL DEFAULT 0,
    "category_id" SMALLINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "purchase_date" DATE NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "source_type" "RefSource" NOT NULL,
    "reference_no" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_items" (
    "id" SERIAL NOT NULL,
    "purchase_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" DECIMAL(12,2) NOT NULL,
    "rate" DECIMAL(12,2),

    CONSTRAINT "purchase_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issuances" (
    "id" SERIAL NOT NULL,
    "issuance_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" INTEGER NOT NULL,
    "source_type" "RefSource" NOT NULL,
    "reference_no" VARCHAR(50) NOT NULL,
    "remarks" TEXT,
    "posted_by" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" INTEGER,

    CONSTRAINT "issuances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issuance_items" (
    "id" SERIAL NOT NULL,
    "issuance_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "issuance_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_code_key" ON "categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_head_id_key" ON "departments"("head_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_employee_id_key" ON "employees"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_name_key" ON "suppliers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uoms_name_key" ON "uoms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "items_sku_key" ON "items"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "issuances_reference_no_key" ON "issuances"("reference_no");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_head_id_fkey" FOREIGN KEY ("head_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issuances" ADD CONSTRAINT "issuances_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issuances" ADD CONSTRAINT "issuances_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issuance_items" ADD CONSTRAINT "issuance_items_issuance_id_fkey" FOREIGN KEY ("issuance_id") REFERENCES "issuances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issuance_items" ADD CONSTRAINT "issuance_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE OR REPLACE VIEW v_inventory_summary AS
WITH 
-- 1. Calculate Stock-In (Purchases)
inward_calc AS (
    SELECT 
        pi.item_id, 
        SUM(pi.quantity) as total_in 
    FROM purchase_items pi
    JOIN purchases p ON pi.purchase_id = p.id
    WHERE p.status = 'VERIFIED' 
    GROUP BY pi.item_id
),

-- 2. Calculate Stock-Out (Issuances) - UPDATED
outward_calc AS (
    SELECT 
        isi.item_id, 
        SUM(isi.quantity) as total_out 
    FROM issuance_items isi
    GROUP BY isi.item_id
),

-- 3. Get latest activity date from both tables
last_activity AS (
    SELECT item_id, MAX(activity_date) as last_mod
    FROM (
        -- Dates from Purchases
        SELECT pi.item_id, p.purchase_date as activity_date 
        FROM purchase_items pi
        JOIN purchases p ON pi.purchase_id = p.id
        
        UNION ALL
        
        -- Dates from Issuances - UPDATED
        SELECT isi.item_id, i.issuance_date as activity_date 
        FROM issuance_items isi
        JOIN issuances i ON isi.issuance_id = i.id
        
        UNION ALL
        
        SELECT id as item_id, updated_at as activity_date FROM items
    ) activity
    GROUP BY item_id
)

SELECT 
    i.id AS item_id,
    i.sku AS item_sku,
    i.name AS item_name,
    i.description,
    COALESCE(c.name, 'Uncategorized') AS group_item,
    u.name AS uom,
    i.min_threshold,
    COALESCE(inc.total_in, 0) AS total_purchased,
    COALESCE(outc.total_out, 0) AS total_issued,
    (COALESCE(inc.total_in, 0) - COALESCE(outc.total_out, 0)) AS current_balance,
    CASE 
        WHEN (COALESCE(inc.total_in, 0) - COALESCE(outc.total_out, 0)) <= 0 THEN 'OUT_OF_STOCK'
        WHEN (COALESCE(inc.total_in, 0) - COALESCE(outc.total_out, 0)) <= i.min_threshold THEN 'LOW_STOCK'
        ELSE 'IN_STOCK'
    END AS inventory_status,
    COALESCE(la.last_mod, i.updated_at) AS last_modified
FROM items i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN uoms u ON i.uom_id = u.id
LEFT JOIN inward_calc inc ON i.id = inc.item_id
LEFT JOIN outward_calc outc ON i.id = outc.item_id
LEFT JOIN last_activity la ON i.id = la.item_id;
