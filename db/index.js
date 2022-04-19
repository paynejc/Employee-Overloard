const connection = require('./connection');
class DB{
    constructor(connection){
        this.connection = connection
    }
findDepartments(){
    return this.connection.promise().query(
        'SELECT * FROM department'
    )
}
    
}
module.exports = new DB(connection);