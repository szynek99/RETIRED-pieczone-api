// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KVObject = Record<string, any>;

export interface QueryParams {
  page: number;
  pageSize: number;
  filter: string | undefined;
  order: string;
  field: string;
}
