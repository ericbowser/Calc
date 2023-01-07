const {connect} = require('./client');

async function login(user) {
    const {username, password} = user;

    const client = await connect();
    let values = [];

    const selectUser = 'SELECT * FROM public."User" WHERE "username" = $1';
    values = [username];

    let result = null;
    try {
        result = await client.query(selectUser, values);
        if (result.rows.length > 0) {
            console.log('duplicate user');
            return 409;
        }
        
        const insertUser = 'INSERT INTO public."User"("username", "password", "isactive") VALUES ($1, $2, $3)';
        values = [username, password, true];

        const rows = await client.query(insertUser, values);
        console.log('rows affected', rows);
        
        // success
        return 200;
    } catch(e) {
        console.log(e);
        return 500;
    }
}

module.exports = {login};