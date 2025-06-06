export { };

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  IBackendRes<IRegister>;
  interface IRegister {
    _id: string;
  }
}
