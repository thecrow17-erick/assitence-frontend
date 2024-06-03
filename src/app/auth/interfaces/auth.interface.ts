export interface AuthResponse {
  statusCode: number;
  message:    string;
  data:       Data;
}

export interface Data {
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
  status:    boolean;
  roles:     Role[];
  workloads: any[];
}

export interface Role {
  id:   number;
  name: string;
}
