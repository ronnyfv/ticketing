// export interface CustomErrorInterface {
//   status_code: number;
//   serialize_errors(): {
//     message: string;
//     field?: string;
//   }[];
// }

export abstract class CustomError extends Error {
  abstract status_code: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serialize_errors(): { message: string; field?: string }[];
}
