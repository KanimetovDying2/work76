export interface MessageT {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

export interface MessageMutationT {
  author: string;
  message: string;
}
