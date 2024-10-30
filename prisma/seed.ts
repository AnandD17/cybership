
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const orders = [
//   {
//     id: '1',
//     customerName: 'John Doe',
//     address: '123 Main St, Anytown, USA',
//     status: 'pending',
//     products: [{ id: '1', name: 'Product 1', quantity: 2 }],
//   },
//   {
//     id: '2',
//     customerName: 'Jane Doe',
//     address: '456 Main St, Anytown, USA',
//     status: 'shipped',
//     products: [{ id: '2', name: 'Product 2', quantity: 1 }],
//   },
//   {
//     id: '3',
//     customerName: 'Jane Doe',
//     address: '456 Main St, Anytown, USA',
//     status: 'shipped',
//     products: [{ id: '2', name: 'Product 2', quantity: 1 }],
//   },
//   {
//     id: '4',
//     customerName: 'Jane Doe',
//     address: '456 Main St, Anytown, USA',
//     status: 'shipped',
//     products: [{ id: '2', name: 'Product 2', quantity: 1 }],
//   },
// ];

async function main() {
  const orders = [];
  for (let i = 1; i <= 50; i++) {
    orders.push({
      id: i.toString(),
      customerName: `Customer ${i}`,
      address: `${i} Main St, Anytown, USA`,
      status: i % 2 === 0 ? 'active' : 'inactive', // Alternating status for variation
      products: [
        {
          id: (i % 10).toString(), // Repeats every 10 products
          name: `Product ${i % 10 || 10}`, // Repeats product names
          quantity: Math.ceil(Math.random() * 5) // Random quantity between 1 and 5
        }
      ]
    });
  }
  for (const order of orders) {
  await prisma.orders.upsert({
    where: {
      id: order.id,
      },
      create: order,
      update: {},
  });
}
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
