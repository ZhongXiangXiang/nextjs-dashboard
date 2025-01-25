import { db } from '@vercel/postgres';

const client = await db.connect();

async function listInvoices() {
  const res = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666
    `;

  return res.rows;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    const res = await listInvoices();
    await client.sql`COMMIT`;
    return Response.json({ data: res });
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
}
