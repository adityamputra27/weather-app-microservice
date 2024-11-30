import amqp from 'amqplib';

export async function connectionQueue() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672');
  return connection;
}
