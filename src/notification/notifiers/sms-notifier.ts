import { Notifier } from "../interfaces/notifier.interface";

export default class SmsNotifier implements Notifier{
    identifier: string;
    message: string;

    constructor (identifier:string, message: string) {
        this.identifier = identifier;
        this.message = message;
    }
    
    send() {
        console.log(`${this.message} sent to ${this.identifier}`);
        // TODO: implment send message to the given identifier
    }
}