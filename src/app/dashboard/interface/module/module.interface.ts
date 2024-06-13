export interface IModule{
  id:          number;
  nro:         string;
  description: string;
  status:      boolean;
}

export interface IModuleResponse {
  module: IModuleRes;
}

export interface IModuleCreate {
  nro:         string;
  description: string;
}

export interface IModuleList{
  modules:     IModule[];
}

export interface IModuleRes {
  createdAt:   Date;
  updatedAt:   Date;
  id:          number;
  nro:         string;
  description: string;
  status:      boolean;
}
