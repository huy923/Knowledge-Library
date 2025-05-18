This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, you need to install se run the development server:
```bash
yarn install
# or 
npm install
```
And then run :
```bash
cp envcopy .env.local # if you use linux and Macos
copy envcopy .env.local # if you use Windows
```
Then :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
pastes to file .env.local

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`.
