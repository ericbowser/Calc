const {connect} = require('./client');

async function login(user) {
  const {username, password, loginType} = user;
  const userParams = { username, password };

  try {
    const client = await connect();
    
    if (client) {
      return registerUser(user, client);
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
    
  } else if(result?.rowCount === 0) {
    
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
    return 200;
  }
  
  // error
  return 500;
}

module.exports = {login};