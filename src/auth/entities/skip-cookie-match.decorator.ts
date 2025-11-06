// skip-cookie-match.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const SKIP_COOKIE_MATCH_KEY = 'skipCookieMatch';
export const SkipCookieMatch = () => SetMetadata(SKIP_COOKIE_MATCH_KEY, true);


