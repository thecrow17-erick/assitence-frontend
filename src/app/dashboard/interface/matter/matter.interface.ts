import { ICareer, ICareerRes } from "../career";


export interface IMatter{
  id:        number;
  code:      string;
  name:      string;
  status:    boolean;
  career:    ICareer;
}

export interface IMatterResponse {
  matter: IMatterRes;
}

export interface IMatterRes {
  createdAt: Date;
  updatedAt: Date;
  id:        number;
  code:      string;
  name:      string;
  status:    boolean;
  career:    ICareerRes;
}
export interface IMatterCreate {
  code:      string;
  name:      string;
  career_id: number;
}
