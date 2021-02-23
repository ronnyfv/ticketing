import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const script_async = promisify(scrypt);

export class Password {
  static async to_hash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await script_async(password, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(stored_password: string, supplied_password: string) {
    const [hashed_password, salt] = stored_password.split(".");
    const buffer = (await script_async(supplied_password, salt, 64)) as Buffer;

    return buffer.toString("hex") === hashed_password;
  }
}
