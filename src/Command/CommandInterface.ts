import OutputInterface from '../IO/OutputInterface'
import InputInterface from '../IO/InputInterface'
import CommandOptionInterface from './CommandOptionInterface'

export default interface CommandInterface {
  name: string
  description?: string
  options?: Array<CommandOptionInterface>
  configure(): void
  execute(input: InputInterface, output: OutputInterface): void
}
