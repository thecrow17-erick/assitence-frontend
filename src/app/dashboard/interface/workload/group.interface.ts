
export interface IGroup{
  id:            number;
  name:          string;
}

export interface IGruopCreate{
  name:          string;
}

export interface IGroupResponse{
  group:         IGroupRes;
}

export interface IGroupList {
  groups:        IGroupRes[];
}

export interface IGroupRes {
  createdAt:     Date;
  updatedAt:     Date;
  id:            number;
  name:          string;
}
