/**
 * represents a flag
 */
export default interface Option {
  /**
   * The name of the flag example --port
   */
  name: string
  description: string | null
  /**
   * default value for this flag
   */
  defaultValue?: string
  /**
   * whether this flag is required or not
   */
  required: boolean
}
