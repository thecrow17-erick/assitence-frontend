

export interface IManagement{
  id:          number;
  name:        string;
  description: string;
  status:      boolean;
}

export interface IManagementCreate{
  name:         string;
  description:  string;
}

export interface IManagementList {
  managements:  IMangementRes[];
}

export interface IManagementResponse{
  management:   IMangementRes;
}

export interface IMangementRes {
  createdAt:   Date;
  updatedAt:   Date;
  id:          number;
  name:        string;
  description: string;
  status:      boolean;
}
