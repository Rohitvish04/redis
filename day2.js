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

 // Expiration (TTL) – VERY IMPORTANT
    await client.set('otp:1234', '99999');
    await client.expire('otp:1234', 10); // Expires in 10 seconds
    await client.set('otp:5678', '888888');
    await client.expire('otp:5678', 5); // Expires in 5 seconds
    await client.set('otp:9101', '777777');
    await client.expire('otp:9101', 15); // Expires in 15 seconds

   // Counter (INCR / DECR) //page views, likes, Rate limiting, etc.
    await client.set('page:home:views', '0');
    await client.incr('page:home:views');
    await client.incr('page:home:views');

    // create counter for about page and increment it 3 times
    await client.set('page:about:views', '0');
    await client.incr('page:about:views');
    await client.incr('page:about:views');
    await client.incr('page:about:views');


    console.log('Home page views:', await client.get('page:home:views')); // 2
    console.log('About page views:', await client.get('page:about:views')); // 3
    

    console.log('OTP before expiry:', await client.get('otp:1234')); // 99999
    console.log('OTP before expiry:', await client.get('otp:5678')); // 888888
    console.log('OTP before expiry:', await client.get('otp:9101')); // 777777      

    // wait for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('OTP after expiry:', await client.get('otp:5678')); // null
    // wait for 11 seconds
    await new Promise(resolve => setTimeout(resolve, 11000));
    console.log('OTP after expiry:', await client.get('otp:1234')); // null

    // wait for 15 more seconds
    await new Promise(resolve => setTimeout(resolve, 15000));
    console.log('OTP after expiry: ', await client.get('otp:9101')); // null
    

    // QUIT the client connection
  await client.quit();
}

main();
