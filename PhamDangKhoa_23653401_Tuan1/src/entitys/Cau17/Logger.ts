export class Logger {
private static instance: Logger;

// Constructor private để chặn khởi tạo trực tiếp qua `new`
private constructor() {}

public static getInstance(): Logger {
    if (!Logger.instance) {
    Logger.instance = new Logger();
    }
    return Logger.instance;
}

log(message: string): void {
    console.log(`[LOG]: ${message}`);
}
}