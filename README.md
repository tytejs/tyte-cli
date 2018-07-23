# Tyte Cli

A simpler frontend for [commander]("https://github.com/tj/commander.js").

### Note

This is still work in progress.

## Usage

```js
import TyteCli from './src/TyteCli'
import Command from './src/Command/CommandInterface'

class EchoCommand extends Command {
  name = 'echo'

  execute(input, output): Promise<any> {
    output.write(input.values().join(' '))
    return Promise.resolve(true)
  }
}

const myApp = new TyteCli()
myApp.addCommand(new EchoCommand())
myApp.run()
```

## Run

```bash
ts-node test.ts echo "message"
```

## output

`message`
