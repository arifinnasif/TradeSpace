<img src="./logos/tradespace-lettermark-white.svg">

<!-- <img src="./logos/tradespace-logo-256.svg" align="left"> -->

# TradeSpace

TradeSpace is an online platform that aims to provide a convenient and user-friendly way for individuals to sell their used products. The platform will serve as a marketplace where sellers can list their items and connect with potential buyers who are interested in purchasing pre-owned goods.

Check out our mock UI [here](https://www.figma.com/file/8mDkiKaoGi2AWoaePVHrh5/TradeSpace)

Check out our API Documentation [here](https://documenter.getpostman.com/view/28353860/2s946cguHS?fbclid=IwAR2H4V2NoiC5wJvJWfPUqBlB8gQYco-GkMmdz2dstf2EYkmYSH8DUBHHY34)

## Things to do after pulling or cloning

- For backend

  1. Go to `backend` directory and install dependencies by
     ```
     cd backend
     yarn install
     ```
  2. Now start the server by
     ```
     yarn start
     ```
     If the above command doesn't work or creates any issue whatsoever, you can run the following command
     ```
     yarn dev
     ```
     Now the backend server will be available at `localhost:3000`
  3. To start the initial migration of the database, run the following commands

     ```
     yarn prisma generate
     ```

     ```
     yarn prisma migrate dev --name init --create-only
     ```

     This will create the database and the required tables in the database. You dont have to run this command again unless you delete the entire database. After any changes in the database schema, you can run the following command to update the database
     After creating a table:

     ```
     yarn prisma migrate deploy
     ```

  4. Download the latest `stripe-cli` from [here](https://github.com/stripe/stripe-cli/releases/tag/v1.17.1). Then login using
     ```
     stripe login
     ```
     and provide the required credentials. Then run the following command to start the webhook listener
     ```
     stripe listen --forward-to <your_local_backend_server_url>/api/webhooks
     ```

- For frontend

  1. Go to `frontend` directory and install dependencies by

     ```
     cd frontend
     yarn add @mui/material @emotion/react @emotion/styled

     ```

  2. Now start the server by
     ```
     yarn start
     ```
     Now the frontend server will be available at `localhost:3000`
