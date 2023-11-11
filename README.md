# Chavez Boxing API

This project is the backend API for the Chavez Boxing website. It's built using Payload, a headless CMS that provides a robust and flexible solution for our content management needs. This repository is not an open-source project but is made public for educational and reference purposes.

The API is not for public use, but you can see the live site at [chavez-boxing.vercel.app](https://chavez-boxing.vercel.app).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before starting, ensure you meet the following requirements:

- You have installed the latest version of `node`
- You have installed the latest version of `pnpm`. You can install it with `npm i -g pnpm` (or choose your favorite package manager).
    - If you use another package manager, you will need to update the `Dockerfile` to use it.
- Access to a MongoDB database. You can set one up for free at [MongoDB Atlas](https://www.mongodb.com/atlas/database).

## Installation

To set up the project locally:

```bash
git clone https://github.com/rajbirjohar/chavez-boxing-api
cd chavez-boxing-api
pnpm install
```

Create an `.env` file in the root of the project and add the following:

```bash
DATABASE_URI=<your-mongodb-uri>
PAYLOAD_SECRET=<your-payload-secret> // It should be a unique random string
DEPLOY_HOOK_URL=<your-vercel-deploy-hook-url> // This is used for redeploying your frontend when you publish changes
CORS_URLS=http://localhost:4321 // This is the URL(s) for the frontend
PAYLOAD_PUBLIC_BASE_DNS=http://localhost:8000 // This is the PUBLIC URL for the backend. Note that this is the PUBLIC URL, not the PRIVATE URL because Payload needs to use it on the client and you don't want to expose sensitive information.
```

## Usage

To start the development server, run:

```bash
pnpm run dev
```

And open up `http://localhost:8000/admin` in your browser.

## Deployment

I deployed this project on [North Flank](https://northflank.com/). It's a great service that provides a free tier for small projects like this one. I followed this [guide](https://northflank.com/guides/deploying-payload-cms) to set up the deployment. Note, I skipped the section on adding a Mongodb addon because I already had a database set up.

If you run into the issue where you cannot perform any actions on the admin dashboard, read the very bottom where the guide states to have `https://` as part of the `PAYLOAD_PUBLIC_BASE_DNS`. This was my issue and it was really frustrating to figure out (my fault for not reading).

Ensure you add all your environment variables to North Flank as well.

## Contributing

While the project is public, I am not accepting contributions at this time unless the site needs a bug fix. If you have any questions, feel free to reach out to me at hello@rajbir.io. This repo is meant to be a reference for anyone looking to build a simple full-stack site with Astro and Payload.

## License

It's simple. Don't take credit for what you didn't do. If you want to use this code, feel free to do so, but please don't claim it as your own. I spent time building this, and I would appreciate it if you gave me credit for it. Thanks!
