export interface ICareer {
  id:        number;
  name:      string;
  status:    boolean;
}
export interface ICareerResponse {
  career: ICareerRes;
}
export interface ICareerSelectList {
  careers: ICareerRes[];
}


export interface ICareerRes {
  createdAt: Date;
  updatedAt: Date;
  id:        number;
  name:      string;
  status:    boolean;
}

export interface ICreateCareer{
  name: string;
}