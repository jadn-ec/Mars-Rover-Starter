const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
//test 1
describe("Command class", function() {
// test 1
  test ("throws error if command type is NOT passed into constructor as the first parameter", function() {
    //if nothing is put into the command type then it will send an error
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });
// test 2 
  test("constructor sets command type", function(){
    let test2 = new Command('Test_Command', 'test_value')
    expect(test2.commandType === 'Test_Command').toBe(true)
  });
//test 3
  test("constructor sets a value passed in as the 2nd argument",function() {
    let test3 = new Command ('Test_Command,','test_value')
    expect (test3.value === 'test_value').toBe(true)
  }); 
}); 
