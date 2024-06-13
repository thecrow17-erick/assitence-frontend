export interface ITeacher{
  id:     number;
  name:   string;
  email:  string;
  phone:  string;
  status: boolean;
}

export interface ICreateTeacher{
  name:     string;
  email:    string;
  phone:  string;
}

export interface ICreateResTeacher{
  user: IResTeacher
}

export interface IResTeacher {
  createdAt: Date;
  updatedAt: Date;
  id:        number;
  name:      string;
  email:     string;
  password:  string;
  phone:     string;
  status:    boolean;
  roles:     Role[];
}

export interface Role {
  id:   number;
  name: string;
}
