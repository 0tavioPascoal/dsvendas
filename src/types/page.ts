export interface Page<T>{
  data(data: any): void | PromiseLike<void>;
  content: Array<T>;
  totalElements: number;
  number: number;
  size: number;
  first: number;
}