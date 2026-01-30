import { createClient } from 'redis'

const Client = createClient({
  socket: {
    host: 'redis-14595.crce217.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 14595,
  },
  password: '6bbGYqTbaknjLprA7yOUJ9xZAuhqSZE0'
});

client.on('error', (err) =>  console.log('Redis Client Error', err ));

await client.connet();


await client.quit();
