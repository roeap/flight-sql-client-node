/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

/** A ':' separated key value pair */
export interface KeyValue {
  key: string
  value: string
}
export interface ClientArgs {
  /**
   * Additional headers.
   *
   * Values should be key value pairs separated by ':'
   */
  headers: Array<KeyValue>
  /** Username */
  username?: string
  /** Password */
  password?: string
  /** Auth token. */
  token?: string
  /** Use TLS. */
  tls: boolean
  /** Server host. */
  host: string
  /** Server port. */
  port?: number
}
export function createFlightSqlClient(options: ClientArgs): Promise<FlightSqlClient>
export class FlightSqlClient {
  query(query: string): Promise<Buffer>
}