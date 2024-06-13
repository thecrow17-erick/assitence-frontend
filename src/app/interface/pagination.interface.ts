export interface IValuePagination{
  skip: number;
  limit: number;
}

export interface IPagination<T>{
  content:          T[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}

export interface Content {
  createdAt: Date;
  updatedAt: Date;
  id:        number;
  name:      string;
  email:     string;
  password:  string;
  phone:     string;
  status:    boolean;
  roles:     Role[];
  workloads: any[];
}

export interface Role {
  id:   number;
  name: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
