This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## High-level answers :

### How would you implement authentication in this system and How would you implement logging in your API?

1. Create login page (app/login/page.js)  which contains a form and a handlesubmit,  
2. Install necessary dependencies:  npm install next-auth jsonwebtoken bcrypt
3. Connect to some database (for example SQL).
4. Create an API Endpoints:  app/api/auth/[...nextauth]/route.js
    - Configure the requested credentials and check if the credentials entered by the user match those in the database: https://next-auth.js.org/providers/credentials 
5. Create a middleware to protect pages if the user is not authenticated.

### If you had to scale this system up to serve 1000s of requests per hour, how would you do it?
**A possible solution is to use Redis.** 
Redis is a powerful in-memory data store that’s often used for caching, session storage, and even queuing tasks in real-time apps. 
**another possible solution  is to use a web server: nginx.**
- Some features:
1. Web Server: Serves static files and web applications.
2. Reverse Proxy: Distributes traffic to multiple backend servers.
3. Load Balancer: Distributes requests across multiple servers.
4. API Gateway: Controls access to APIs.
5. HTTP Cache: Stores responses to improve speed.


### How would you test this API?
**Manual testing:**
-Valid queries
-Empty queries
-Very long queries
-Queries in different languages
**automated testing**
1. Install jest: https://nextjs.org/docs/app/building-your-application/testing/jest
2. Configure external service mocks with MSW (Mock Service Worker) to simulate SerpAPI and Ollama responses without making actual calls.
3. Some examples of tests that could be performed::
    -Input validation
    -Error handling
    -Response format
    -Recovery from internal server failures OLlama and Serpapi
    -Retries
    -Timeouts

## LINKS:
1. https://www.loom.com/share/f193568b5eb84b7fa0f9ded1ecb5e25d
2. 