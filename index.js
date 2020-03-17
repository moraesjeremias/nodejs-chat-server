// Load the TCP Library
net = require('net');
const mysql = require('mysql');

// Keep track of the chat clients
const clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = null

  // Put this new client in the list
  clients.push(socket);

  // Handle incoming messages from clients.
  socket.on('data', function (buffer) {
      const data = buffer.toString()
      if(data.startsWith("name:")){
          console.log("Digite o comando corretamente", data)
          socket.name = data.split(':')[1].replace('\\r\\n','')
          socket.write("Seja bem-vinda(o) ao Contatinho Chat " + socket.name + "\n");
            // Send a nice welcome message and announce
            broadcast(socket.name + " entrou na sala\n", socket);

      }
      else if(socket.name === null ){
          socket.write("Me diga seu nome. Digite 'name: SEUNOME:FIM'\n")
      }else{
        broadcast(socket.name + "> " + data, socket);
      }
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    
    if (message == "stop"){
      clients.splice(clients.indexOf(socket), 1);
      broadcast(socket.name + " saiu do Contatinho chat ;( .\n");
    }
  });
  
  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Chat server na porta 5000\n");