### Project Setup on local machine

```
git clone https://github.com/yuvalyn/michael.git
cd to michael folder
npm install
npm update
```

### Project Run

Server managed by PM2 process manager.

Starting server in development mode requires local MonogoDB server installed and running. If it is, <strong>connection url should be updated in config/dev.js file.</strong> Then, execute the following in command line inside the prohect folder:

```
npm run start
```

Once server started it will be accessible on http://localhost:3060

<strong>Starting in production mode </strong> does not require any configuration since cloud MongoDB used for production mode. Production mode is Node.Js cluster based on 4 instances. Cluster managed by PM2. Execute the following:

```
npm run prod
```

Once server started it will be accessible on http://localhost:3060

### Runing the test suite

Stop the server and execute

```
npm run test
```

Please note, tests execution are for development server only and requires local database instance.

### Stop server

```
npm run stop
```

This command will stop all running server instances.

### Server API Reference

API documentation located here: https://documenter.getpostman.com/view/2035283/T1DpBcKy?version=latest

Each employee related to specific user, hence user should be created first. Once user created and logged in, employees can be added/updated deleted on behalf of current user. There is now access to employees of another user due to scoping limitations. Each user can manage its own employees only. The suggested approach to manage employees as following:

1. Create new user.
2. Login user in order to get JWT token.
3. Create new employees for newly created user (all operations with employee requires token based authentication. Token should exists in headers for each request)
4. Update/Remove/Search employees.

### DB schema

The only collection is used in application is "users":

```
{
  username: String,
  email: String,
  hash: String,
  salt: String,
  employees: [
    {
      employeeId: Number,
      firstName: String,
      lastName: String,
      position: String,
      address: String,
      hired: Date,
    },
    ...
  ],
}

```
