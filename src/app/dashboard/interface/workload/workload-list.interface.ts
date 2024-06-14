import { IUser, User } from "../../../auth/interface";
import { IPeriod, IPeriodRes } from "../period";


export interface IWorkload{
  id:         number;
  period:     IPeriod;
  user:       IUser; 
}

export interface Workload {
  createdAt: Date;
  updatedAt: Date;
  id:        number;
  user:      User;
  period:    IPeriodRes;
}

