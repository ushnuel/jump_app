# Jump App Assessment

## How to run the API

Download [Node](https://nodejs.org/en/download/).

Install the dependency by running `npm i`. The API is started by running `npm start`. You can also start the API by running `npm run dev`. To do this, install [nodemon](https://www.npmjs.com/package/nodemon) on your local system globally by running `npm i -g nodemon`

#### Database set up
Create a [MongoDB Cluster](https://cloud.mongodb.com/v2/62c3e15e7300f32ebd92b7b7#clusters). Create a database, copy the URI and paste on your .env file. Look at the .env.sample file to know the keys needed.

#### Database seeding
Run `npm run seed` to seed some data into the created MongoDB

#### The API can be called from Postman successfully by passing the required `key` query parameter, and the `JUMP-AUTH-TOKEN` header key.

#### Thank you.
