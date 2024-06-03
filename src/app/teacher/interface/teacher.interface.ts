
export interface Teacher {
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

export interface TeacherResponse {
  statusCode: number;
  message:    string;
  data:       Data;
}

export interface Data {
  content:          Content[];
  pageable:         Pageable;
  last:             boolean;
  totalElements:    number;
  totalPages:       number;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
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
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
