const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  test("constructor sets position and default values for mode and generatorWatts", function(){
   let position = 0;
    let test7 = new Rover (position);
    expect(test7.position === position).toBe(true);
    expect(test7.mode === 'NORMAL').toBe(true);
    expect(test7.generatorWatts === 110).toBe(true);

  });
  // test 8 
  test("response returned by receiveMessage contains the name of the message", function(){
  let name = "name"; 
  let commands = [0];
  let message = new Message(name, commands);
  let test8 = new Rover(5);
  expect(test8.receiveMessage(message).message).toEqual(name);
});
  //test9
  test("response returned by receiveMessage includes two results if two commands are sent in the message”", function(){
    let name = "name";
    let commands = [ new Command('MOVE', 5), new Command('STATUS_CHECK') ];
    let message = new Message(name,commands);
    let rover = new Rover(101);
    expect(rover.receiveMessage(message).results.length).toEqual(commands.length);
  });
//test10
  test("responds correctly to the status check command", function(){
    let name = "name";
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message(name,commands);
    let rover = new Rover(2);
    let results = [];
    const test = {};
    test.completed = true;
    test.roverStatus = {};
    test.roverStatus.mode = 'NORMAL';
    test.roverStatus.generatorWatts = 110;
    test.roverStatus.position = 2;
    results = [test];
    expect(rover.receiveMessage(message).results).toEqual(results);
  });
  //test11
  test("responds correctly to the mode change command", function(){
    let name = "name"
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message(name,commands);
    let rover = new Rover(2);
    let results = [ { completed: true } ];
    expect(rover.receiveMessage(message).results).toEqual(results);
  });
  //test12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let name = "name"
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 7)];
    let message = new Message(name,commands);
    let rover = new Rover(2);
    expect(rover.receiveMessage(message).results[1].completed).toEqual(false);
  });
  //test13
  test("responds with the position for the move command", function(){
    let name = "name"
    let commands = [new Command('MOVE', 7)];
    let message = new Message(name,commands);
    let rover = new Rover(2);
    let results = [ { completed: true } ];
    expect(rover.receiveMessage(message).results).toEqual(results);
  });

});