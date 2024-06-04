export interface LoginBody { 
  email: string;
  password: string;
}


export interface IResponseLogin {
  token: string;
  user:  User;
}

export interface User {
  createdAt: Date;
  updatedAt: Date;
  id:        number;
  name:      string;
  email:     string;
  password:  string;
  phone:     string;
  roles:     Role[];
  workloads: any[];
}

export interface Role {
  id:   number;
  name: string;
}
