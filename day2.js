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
 
// String 
    await client.set('user:1:name', 'Bob');
    await client.set('user:1:email', 'alice@gmail.com');

    console.log(await client.get('user:1:name')); // Bob
    console.log(await client.get('user:1:email')); //
    console.log(await client.get('user:2:name', 'rohit')); // rohit
    console.log(await client.get('user:2:email', 'rohit@gmail.com')); //


    // QUIT the client connection
  await client.quit();
}

main();
