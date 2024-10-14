const {connect} = require('./client');

async function login(user) {
  console.log('user', user);
  const {username, password } = user;
  const userParams = { username, password };

  try {
    const client = await connect();
    if (client) {
      return loginUser(user, client);
    }
  } catch (e) {
    console.log(e);
    return 500;
  }
}

async function loginUser(userParams, client) {
  const {username, password} = userParams;
  const selectUser = 'SELECT * FROM public."User" WHERE "username" = $1 AND "password" = $2';
  const values = [username, password];
  const result = await client.query(selectUser, values);
  if (result && result?.rowCount === 1) {
    return {
      message: 'user exists',
      code: 409
    };
  } else if(result?.rowCount === 0) {
    return await registerUser(userParams, client);
  }
}

async function registerUser(userParams, client) {
  const {username, password} = userParams;
  
  const insertUser = 'INSERT INTO public."User"("username", "password", "active") VALUES ($1, $2, $3)';
  const values = [username, password, true];
  const result = await client.query(insertUser, values);
  if (result && result?.rowCount === 1) {
    console.log("User is registered");

    // success
    return {
      message: 'success',
      code: 200
    };
  }
  
  // error
  return {
    message: 'server error',
    code: 500
  };
}

module.exports = {login};