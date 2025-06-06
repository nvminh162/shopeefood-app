declare module "*.png" {
  const value: import("react-native").ImageSourcePropType;
  export default value;
}
import 'axios';

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
