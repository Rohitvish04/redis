import { createClient } from 'redis';

// 🔑 Replace these with your Redis Cloud credentials
const client = createClient({
  socket: {
     host: 'redis-14595.crce217.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 14595
  },
  password: '6bbGYqTbaknjLprA7yOUJ9xZAuhqSZE0',
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function main() {
  await client.connect();

  console.log('Connected to Redis!');

  // practice commands here
 


    // QUIT the client connection
  await client.quit();
}

main();
