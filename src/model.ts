import { Observable, Subject } from "rxjs";

export interface IAsyncExecutionState<P, D> {
  execution: IAsyncExecutionExecution<D>;
  params: P;
  errors: any[];
}

export type IAsyncExecutionExecuteProps<P, D> = (
  params: P
) => D | Promise<D> | Observable<D>;

export interface IAsyncExecutionConfigProps<P, D> {
  processingType?: ProcessingType;
  retry?: IRetryProcessing;
  source$?: Observable<P>;
  onSuccess?: (data: D, params: P) => void;
  onProcessing?: (params: P) => void;
  onError?: (error: any, params: P) => void;
  destroy$?: Subject<void>;
}

export type AsyncExecutionSetStateType<P, D> = (
  a: (prevState: IAsyncExecutionState<P, D>) => IAsyncExecutionState<P, D>
) => void;

export type EnumStatusType = "PROCESSING" | "SUCCESS" | "ERROR" | "CANCELED";
export interface IAsyncExecutionExecution<T = any> {
  status?: EnumStatusType;
  data?: T;
  error?: any;
  config?: any;
}

export interface IRetryProcessing {
  maxRetryAttempts: number;
  interval: number;
  typeInterval?: "LINEAR" | "EXPONENTIAL";
  notRetryWhenStatus?: number[];
  noRetryWhen?: (error: any) => boolean;
}

export enum ProcessingType {
  EXHAUST,
  CONCAT,
  MERGE,
  SWITCH,
  FLAT,
}
