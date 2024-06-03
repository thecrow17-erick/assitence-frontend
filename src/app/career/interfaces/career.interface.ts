
export interface Career {
  name:          string;
}


export interface CareerResponse {
  statusCode: number;
  message:    string;
  data:       Data;
}

export interface Data {
  content:          any[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  first:            boolean;
  numberOfElements: number;
  size:             number;
  number:           number;
  sort:             Sort;
  empty:            boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  sorted:   boolean;
  unsorted: boolean;
  empty:    boolean;
}
