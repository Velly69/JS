 class User{
    constructor(name){
        this.name = name;
        this.chatroom = null;
    }

    send(message, to){
        this.chatroom.send(message, this, to);
    }

    receive(from, message){
        console.log(`${from.name} to ${this.name}: ${message}`);
    }
}

const Chatroom = function(){
    let users = {};

    return {
        register: function(user){
            users[user.name] = user;
            user.chatroom = this;
        }, 
        send: function(message, from, to){
            if(to){
                to.receive(from, message);
            }
            else{
                for(key in users){
                    if(users[key]!== from){
                        users[key].receive(from, message);
                    }
                }
            }
        }
    }
}

const alex = new User('Alex');
const liza = new User('Liza');
const igor = new User('Igor');

const chatroom = new Chatroom();

chatroom.register(alex);
chatroom.register(igor);
chatroom.register(liza);

alex.send('Hello, Igor', igor);
liza.send('Hello Alex', alex);
igor.send('Hello!!!');