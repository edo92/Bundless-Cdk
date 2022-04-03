import { v4 } from 'uuid';

export class Util {
    public static uuid(): string {
        return v4();
    }
}
