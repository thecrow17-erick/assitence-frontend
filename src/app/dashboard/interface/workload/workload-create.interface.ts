export interface IWorkloadCreate {
  user_id:   number;
  period_id: number;
  matters:   Matter[];
}

export interface Matter {
  matter_id: number;
  group_id:  number;
  days:      Day[];
}

export interface Day {
  day:          string;
  start_time:   string;
  end_time:     string;
  classroom_id: number;
}
