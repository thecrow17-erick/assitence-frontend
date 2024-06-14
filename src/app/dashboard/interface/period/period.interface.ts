import { IManagement, IMangementRes } from '../management';
import { ITypePeriod, ITypePeriodRes } from '../type_period/type_period.interface';


export interface IPeriod{
  id:         number;
  name:       string;
  startDate:  Date;
  endDate:    Date;
  status:     boolean;
  management: IManagement;
  typePeriod: ITypePeriod;
}

export interface IPeriodCreate {
  name:           string;
  init_time:      string;
  finish_time:    string;
  type_period_id: number;
  management_id:  number;
}

export interface IPeriodList{
  periods:    IPeriodRes[];
}


export interface IPeriodResponse{
  period:     IPeriodRes;
}

export interface IPeriodRes {
  createdAt:  Date;
  updatedAt:  Date;
  id:         number;
  name:       string;
  startDate:  Date;
  endDate:    Date;
  typePeriod: ITypePeriodRes;
  management: IMangementRes;
  status:     boolean;
}
