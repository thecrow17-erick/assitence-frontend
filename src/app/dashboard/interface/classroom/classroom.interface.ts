import { IModule, IModuleRes } from "../module";

export interface IClassroom{
  id:          number;
  nro:         string;
  description: string;
  status:      boolean;
  module:      IModule;
}

export interface IClassroomResponse{
  classroom:      IClassroomRes
}

export interface IClassroomSelect{
  classrooms:   IClassroomRes[]
}

export interface IClassroomCreate{
  nro:         string;
  description: string;
  module_id:   number;
}

export interface IClassroomRes {
  createdAt:   Date;
  updatedAt:   Date;
  id:          number;
  nro:         string;
  description: string;
  codeQR?:     string;
  status:      boolean;
  module:      IModuleRes;
}
