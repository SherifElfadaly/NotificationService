export interface Notifier {
  identifier: string;
  message: string;

  send(): boolean;
}
