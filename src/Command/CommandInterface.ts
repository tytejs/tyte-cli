import OutputInterface from '../IO/OutputInterface'
import InputInterface from '../IO/InputInterface'
import CommandOptionInterface from './CommandOptionInterface'

export default abstract class CommandInterface {
  abstract name: string
  description: string = ''
  options: Array<CommandOptionInterface> = []
  abstract execute(input: InputInterface, output: OutputInterface): void
}
