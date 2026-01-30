import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';

const app = express();
const redis = createClient({
  socket: {
    host: 'redis-14595.crce217.ap-south-1-1.ec2.cloud.redislabs.com',
    port:  14595
  },
  password: '6bbGYqTbaknjLprA7yOUJ9xZAuhqSZE0',
});

await redis.connect();

app.get('/user/:username', async (req, res) => {
  const { username } = req.params;

        // Check cache
        const cached = await redis.get(`github:${username}`);
      if (cached) {
        return res.json({
          source: 'redis-cache',
          data: JSON.parse(cached)
        });
      }
  // Fetch from APi
        const response = await axios.get(
          `https://api.github.com/user/${username}`
          );
    // Save to Redis (cache)
        await redis.setEx(
          `github:${username}`,
          60, // seconds
          JSON.stringify(response.data)
          );

        res.json({
          source: "github-api',
          data: response.data
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`)
};
