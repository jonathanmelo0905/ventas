export interface DataKeys {
  endpoint: string;
  expirationTime: string;
  keys: Keys;
}

interface Keys {
  p256dh: string;
  auth: string;
}
