import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting storage (em produção usar Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers para BRP Oracle AI
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Header customizado para BRP
  response.headers.set('X-Powered-By', 'BRP Oracle AI');
  
  // HSTS apenas em produção
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security', 
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Content Security Policy para BRP Oracle AI
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://api.openai.com https://api.anthropic.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);

  // Rate limiting para rotas de API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minuto
    let limit = 100; // Limite padrão
    
    // Limites diferentes para endpoints específicos
    if (request.nextUrl.pathname.includes('/api/chat')) {
      limit = parseInt(process.env.RATE_LIMIT_AI_RPM || '50');
    } else if (request.nextUrl.pathname.includes('/api/search')) {
      limit = parseInt(process.env.RATE_LIMIT_SEARCH_RPM || '200');
    } else if (request.nextUrl.pathname.includes('/api/generate')) {
      limit = parseInt(process.env.RATE_LIMIT_DOC_GEN_RPM || '20');
    }
    
    const key = `${clientIP}:${request.nextUrl.pathname}`;
    const rateLimitData = rateLimitMap.get(key);
    
    if (!rateLimitData || now > rateLimitData.resetTime) {
      rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    } else if (rateLimitData.count >= limit) {
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit excedido',
          message: `Máximo ${limit} requests por minuto permitidos`,
          code: 'RATE_LIMIT_EXCEEDED'
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((rateLimitData.resetTime - now) / 1000).toString(),
            ...Object.fromEntries(response.headers.entries())
          }
        }
      );
    } else {
      rateLimitData.count++;
      rateLimitMap.set(key, rateLimitData);
    }
    
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', 
      Math.max(0, limit - (rateLimitData?.count || 0)).toString()
    );
    response.headers.set('X-RateLimit-Reset', 
      Math.ceil((rateLimitData?.resetTime || now + windowMs) / 1000).toString()
    );
  }

  // CORS para domínios internos da BRP apenas
  const origin = request.headers.get('origin');
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://localhost:3002',
    'https://oracle.brpartners.com.br'
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 
      'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );
  }

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: response.headers });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};