
export interface Matter {
    id: number;
    name: string;
    code: string;
    status : boolean;
    career :string;
}

export interface MatterGetResponse {
  statusCode: number;
  message:    string;
  data:       Data;
}

export interface Data {
  content:          Content[];
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
  createdAt:  Date;
  updatedAt:  Date;
  id:         number;
  code:       string;
  name:       string;
  status:     boolean;
  career:     Career;
  detailWork: any[];
}

export interface Career {
  createdAt: Date;
  updatedAt: Date;
  id:        number;
  name:      string;
  status:    boolean;
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
  unsorted: boolean;
  sorted:   boolean;
}
//---------------------------------------------------------------------------------------------------------------------------------
export interface MatterCreateResponse {
  statusCode: number;
  message:    string;
  data:       DataCreated;
}

export interface DataCreated {
  matter: MatterCreated;
}

export interface MatterCreated {
  createdAt:  Date;
  updatedAt:  Date;
  id:         number;
  code:       string;
  name:       string;
  status:     boolean;
  career:     Career;
  detailWork: any[];
}




