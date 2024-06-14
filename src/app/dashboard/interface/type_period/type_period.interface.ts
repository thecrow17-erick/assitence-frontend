export interface ITypePeriod{
  id:          number;
  description: string;
  status:      boolean;
}

export interface ITypePeriodList{
  typePeriods:   ITypePeriodRes[];
}

export interface ITypePeriodCreate{
  description:   string;
}

export interface ITypePeriodResponse{
  typePeriod:   ITypePeriodRes;
}

export interface ITypePeriodRes {
  createdAt:   Date;
  updatedAt:   Date;
  id:          number;
  description: string;
  status:      boolean;
}
