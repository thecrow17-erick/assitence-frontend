import { ICareerRes } from '../../career/interfaces/career.interface';

export interface IMatterUpdate extends ICreateMatter{
  id:   number;
}

export interface IMatter{
  id: number;
  name: string;
  code: string;
  status:boolean;
  career: string;
}


export interface ICreateMatter {
  code:         string;
  name:         string;
  career_id:    number;
}

export interface IResponseMatter{
  matter: IMatterRes
}


export interface IMatterRes {
  createdAt:  Date;
  updatedAt:  Date;
  id:         number;
  code:       string;
  name:       string;
  status:     boolean;
  career:     ICareerRes;
}

