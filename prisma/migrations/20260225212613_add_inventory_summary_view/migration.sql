CREATE OR REPLACE VIEW v_inventory_summary AS
WITH 
-- Calculate total bought per item
inward_calc AS (
    SELECT item_id, SUM(quantity) as total_in 
    FROM purchases GROUP BY item_id
),
-- Calculate total issued per item
outward_calc AS (
    SELECT item_id, SUM(quantity) as total_out 
    FROM issuances GROUP BY item_id
)
SELECT 
    i.id AS item_code,
    COALESCE(c.name, 'Uncategorized') AS group_item,
    i.description,
    i.uom,
    COALESCE(inc.total_in, 0) AS total_purchased,
    COALESCE(outc.total_out, 0) AS total_issued,
    -- Current Stock Logic
    (COALESCE(inc.total_in, 0) - COALESCE(outc.total_out, 0)) AS current_balance
FROM items i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN inward_calc inc ON i.id = inc.item_id
LEFT JOIN outward_calc outc ON i.id = outc.item_id;