import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateMockSearchResults } from '@/lib/mock-data';
import { rateLimiter } from '@/lib/rate-limiter';
import { sanitizeInput } from '@/lib/sanitization';

// Schema de validação para busca
const searchSchema = z.object({
  query: z.string()
    .min(1, 'Query não pode ser vazia')
    .max(500, 'Query muito longa (máximo 500 caracteres)')
    .transform(sanitizeInput),
  filters: z.object({
    source: z.enum(['all', 'jira', 'backstage', 'documents']).optional().default('all'),
    category: z.enum(['all', 'technical', 'business', 'product']).optional().default('all'),
    dateRange: z.enum(['all', 'week', 'month', 'quarter']).optional().default('all'),
  }).optional().default({}),
  limit: z.number().int().min(1).max(50).optional().default(10),
  offset: z.number().int().min(0).optional().default(0),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || 'anonymous';
    const rateLimitResult = await rateLimiter.check(clientIP, 'search');
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          details: 'Muitas requisições. Tente novamente em alguns minutos.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60'
          }
        }
      );
    }

    // Parse do body
    const body = await request.json();
    
    // Validação com Zod
    const validatedData = searchSchema.parse(body);
    
    // Log da busca para auditoria
    console.log(`[SEARCH API] Query: "${validatedData.query}", Filters:`, validatedData.filters);
    
    // Simular delay realista de API
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
    
    // Gerar resultados mock baseados na query
    const results = generateMockSearchResults(
      validatedData.query, 
      validatedData.filters,
      validatedData.limit,
      validatedData.offset
    );
    
    // Headers de segurança
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    return NextResponse.json({
      success: true,
      data: {
        results: results.items,
        total: results.total,
        query: validatedData.query,
        filters: validatedData.filters,
        executionTime: Math.random() * 300 + 50, // ms
        suggestions: results.suggestions || [],
        facets: {
          sources: results.facets?.sources || [],
          categories: results.facets?.categories || [],
          dates: results.facets?.dates || []
        }
      },
      timestamp: new Date().toISOString()
    }, { headers });
    
  } catch (error) {
    console.error('[SEARCH API] Error:', error);
    
    // Error handling específico para validação
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }
    
    // Error genérico
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' 
          ? error instanceof Error ? error.message : 'Unknown error'
          : 'Erro interno do servidor'
      },
      { status: 500 }
    );
  }
}

// Método GET para busca simples (query params)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const source = searchParams.get('source') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');
    
    if (!query.trim()) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }
    
    // Rate limiting
    const clientIP = request.ip || 'anonymous';
    const rateLimitResult = await rateLimiter.check(clientIP, 'search');
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }
    
    // Validar parâmetros
    const validatedData = searchSchema.parse({
      query,
      filters: { source: source as any },
      limit
    });
    
    const results = generateMockSearchResults(
      validatedData.query,
      validatedData.filters,
      validatedData.limit
    );
    
    return NextResponse.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[SEARCH GET] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}