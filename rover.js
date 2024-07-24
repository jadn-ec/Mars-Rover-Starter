const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
   receiveMessage(message1) {
     let message = message1.name;
     let commands = message1.commands;
     let results = [];
     for(let i = 0; i < commands.length; i++){  
       if(commands[i].commandType === 'STATUS_CHECK'){
        results.push( { completed: true, roverStatus:{ mode : this.mode, generatorWatts: this.generatorWatts, position: this.position } } );
       }
       if(commands[i].commandType === 'MODE_CHANGE'){
         if(commands[i].value === 'LOW_POWER'){
           this.mode = 'LOW_POWER';
           results.push( { completed: true } );
         }
         if(commands[i].value === 'NORMAL'){
           this.mode = 'NORMAL';
           results.push( { completed: true } );
         }
       }
       if(commands[i].commandType === 'MOVE'){
         if(this.mode === 'LOW_POWER'){
           results.push( { completed: false } );   
         } else {
           this.position = commands[i].value;
           results.push( { completed: true } );
         }
       }
     }
     let output = {message, results};
     //console.log(output.results[0]);
     //console.log(output.results[1]);
     //console.log(output.results[2]);
     //console.log(output.results[3]);
     //console.log(output.results[4]);
     return output;
   }
}

function run(){
  let rover = new Rover(100);
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);
    //console.log(response);
}

//run();

module.exports = Rover;
