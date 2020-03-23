const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "chat"
});

connection.connect(function(err){
    if(err){
        return console.log(err)
    } else{
        console.log("Conectado ao banco MySQL! ");
        createTable(connection);
        addRows(connection);
    }
    
    function createTable(connect){
        const userTable = "CREATE TABLE IF NOT EXISTS Contatinhos (\n" +
                         " ID BIGINT(7) NOT NULL PRIMARY KEY AUTO_INCREMENT, \n" +
                         "Nome VARCHAR(100) NOT NULL, \n" +
                         "Senha VARCHAR(40) NOT NULL \n" +
                         ");";
        connect.query(userTable, function (err, results, fields){
            if (err){
                return console.log(err)
            } else{
                console.log("Tabela de usuários criada com sucesso!")
            }
        });
    }

    function addRows(connect){
        const userInfo = `INSERT INTO Contatinhos(Nome, Senha) VALUES ( ? )`;
        const userValues = ['Jeremias Moraes', 'tega']

        connect.query(userInfo, [userValues], function(err, results, fields){
            if(err){
                return console.log(err)
            } else {
                console.log("Usuário Adicionado ao Contatinho Chat");
                connect.end();
            }
        })
    }
});
