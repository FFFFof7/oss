import { MatchFunction } from 'path-to-regexp'
export interface Config {
  baseUrl: string | RegExp
  mockPath: string
  mainName?: string
}
export interface Mock {
  urlMatch: MatchFunction<object>
  respond: any
  method?: string
  type?: string
  statusCode?: 200 | 404 | 500
}
export type Mocks = false | Mock[]
