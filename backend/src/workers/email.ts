import { Connection } from "amqplib";

export class EmailWorker {
  private readonly rabbitmqConnection: Connection

  constructor(rabbitmqConnection: Connection) {
    this.rabbitmqConnection = rabbitmqConnection;
  }
  async start() {
    const channel = await this.rabbitmqConnection.createChannel();
    await channel.assertQueue('weather-notifications');

    channel.consume('weather-notifications', async (message) => {
      if (message) {
        const notification = JSON.parse(message.content.toString());
        await this.sendNotification(notification);
        channel.ack(message);
      }
    });
  }

  async sendNotification(data: any) {
    console.log(`Sending notification to ${data.email}: ${data.message} 
        for weather update in ${data.location} at ${data.timestamp}`);
  }
}