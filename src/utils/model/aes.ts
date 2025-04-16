import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '12345678901234567890123456789012';
const IV_LENGTH = 16;

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const result = iv.toString('hex') + ':' + encrypted.toString('hex');
    return result;
}

export function decrypt(text: string): string {
    const decodedText = decodeURIComponent(text);

    if (!decodedText) {
        throw new Error('Text to decrypt is undefined or empty');
    }
    if (!decodedText.includes(':')) {
        throw new Error('Invalid encrypted text format');
    }

    const [ivHex, encryptedHex] = decodedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const result = decrypted.toString();
    return result;
}