# Tyte Cli

A simpler frontend for [commander]("https://github.com/tj/commander.js").

### Note

This is still work in progress.

## Usage

The TyteCli API is quite stratigtforward first,

- You create an implementation of the `Command` interface
- Create a new instance of `TyteCli`
- Add your command to it via `TyteCli.addCommands`
- Call `TyteCli.run()`

```js
import ....

//step 1
class EchoCommand extends Command {
  name = 'echo'

  execute(input, output): Promise<any> {
    output.write(input.values().join(' '))
    return Promise.resolve(true)
  }
}

//step 2
const myApp = new TyteCli()

//step 3
myApp.addCommand(new EchoCommand())

//step 4
myApp.run()
```

## Advanced usage
TBD

## Run

```bash
ts-node test.ts echo "message"
```

## output

`message`
