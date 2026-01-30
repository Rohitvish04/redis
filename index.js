// index.js
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

  // SET command: store values
  await client.set('name', 'Alice');
  await client.set('city', 'London');
  await client.set('color', 'blue');
  await client.set('fruit', 'apple');
    await client.set('animal', 'dog');

  // GET command: retrieve values
  console.log('Name:', await client.get('name')); // Alice
  console.log('City:', await client.get('city')); // London
  console.log('Color:', await client.get('color')); // blue
    console.log('Fruit:', await client.get('fruit')); // apple
    console.log('Animal:', await client.get('animal')); // dog


  // DEL command: delete a values
  await client.del('name', 'city');
    console.log('After DEL, Name and City:', await client.get('name', 'city')); // null

 
    // QUIT the client connection
  await client.quit();
}

main();
