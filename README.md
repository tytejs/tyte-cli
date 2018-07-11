Tyte Cli
=================

The tyte-cli component eases the creation of beautiful command line applications.


### Note
This is still work in progress.


## Usage 
```js
import Application from "./Application";
import CommandInterface from "./Command/CommandInterface";
import InputInterface from "./IO/InputInterface";
import OutputInterface from "./IO/OutputInterface";
import CommandOptionInterface from "./Command/CommandOptionInterface";
import Command from "./Command/Command";

//command
class StartServer implements CommandInterface {
  options: Array<CommandOptionInterface> = new Array<CommandOptionInterface>();
  cmd: Command;

  configure() {
    this.cmd = { cmd: "serve" };
    this.options.push({
      option: "-p, --port",
      description: "Specifies the port to launch the application on"
    });
  }

  execute(input: InputInterface, output: OutputInterface) {
    let port = 8000;
    let values = input.values();
    if (values.length > 0) {
      port = values[0]; //this is buggy we need to check and get the argument passed to the option directly because options can be mixed up
    }
    output.write(`Tyte application started on port ${port}`);
    setTimeout(()=>{},10000);//delay to simulate a started server
  }
}

// Application
const myApp = new Application();
myApp.addCommand(new StartServer());
myApp.run();
```