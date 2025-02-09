'use server';
// 'use server'指令，代表当前文件中导出的所有函数都是Server Actions，
// 可以用在客户端或服务端组件中
// 未被使用的函数在最终打包中会被移除
// 也可以直接在服务端组件中写的server Actions中使用'use server'
// 但更推荐将所有actions写在一个单独的文件中

import { z } from 'zod'; // zod，类型校验库
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'), // 会被转换为number，并校验类型
    status: formData.get('status'),
  });
  console.log(customerId, amount, status); // 在终端中打印（服务端）
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.log('create invoice error', error);
  }

  revalidatePath('/dashboard/invoices'); // 清除浏览器路由缓存，重新向服务器发起请求获取最新数据
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'), // 会被转换为number，并校验类型
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id=${customerId}, amount=${amountInCents}, status=${status}
      WHERE id=${id}
    `;
  } catch (error) {
    console.log('update invoice error', error);
  }

  revalidatePath('/dashboard/invoices'); // to clear the client cache and make a new server request
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM invoices WHERE id=${id}`;
  revalidatePath('/dashboard/invoices');
}
