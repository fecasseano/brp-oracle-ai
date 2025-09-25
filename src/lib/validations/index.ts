// BRP Oracle AI - Zod Validation Schemas
import { z } from 'zod';

// Search validation schemas
export const searchQuerySchema = z.object({
  query: z.string()
    .min(1, 'Consulta não pode estar vazia')
    .max(500, 'Consulta muito longa (máx 500 caracteres)')
    .trim(),
  filters: z.object({
    type: z.enum(['epic', 'story', 'task', 'document', 'service', 'api'])
      .optional(),
    team: z.enum(['Frontend', 'Backend', 'QA', 'Product', 'DevOps', 'Architecture'])
      .optional(),
    product: z.string().max(100).optional(),
    status: z.enum(['To Do', 'In Progress', 'Done', 'Cancelled', 'Review'])
      .optional(),
    dateRange: z.object({
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional()
    }).optional()
  }).optional(),
  limit: z.number()
    .min(1, 'Limite deve ser pelo menos 1')
    .max(100, 'Limite não pode exceder 100')
    .default(20),
  offset: z.number()
    .min(0, 'Offset não pode ser negativo')
    .default(0)
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;

// AI Chat validation schemas
export const chatMessageSchema = z.object({
  message: z.string()
    .min(1, 'Mensagem não pode estar vazia')
    .max(2000, 'Mensagem muito longa (máx 2000 caracteres)')
    .trim(),
  context: z.array(z.object({
    type: z.enum(['jira', 'backstage', 'document']),
    id: z.string(),
    title: z.string(),
    content: z.string().optional()
  })).optional(),
  conversationId: z.string().uuid().optional(),
  includeHistory: z.boolean().default(false)
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatResponseSchema = z.object({
  answer: z.string(),
  sources: z.array(z.object({
    type: z.enum(['jira', 'backstage', 'document', 'api']),
    name: z.string(),
    url: z.string(),
    relevance: z.number().min(0).max(1).optional()
  })),
  confidence: z.number().min(0).max(1),
  timestamp: z.date(),
  conversationId: z.string().uuid(),
  tokens: z.object({
    input: z.number(),
    output: z.number()
  }).optional()
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

// Document generation schemas
export const generateDocumentSchema = z.object({
  type: z.enum(['prd', 'user-story', 'technical-doc', 'api-doc']),
  title: z.string()
    .min(5, 'Título muito curto (mín 5 caracteres)')
    .max(200, 'Título muito longo (máx 200 caracteres)')
    .trim(),
  description: z.string()
    .min(10, 'Descrição muito curta (mín 10 caracteres)')
    .max(1000, 'Descrição muito longa (máx 1000 caracteres)')
    .trim(),
  context: z.object({
    product: z.string().max(100).optional(),
    team: z.string().max(100).optional(),
    relatedEpics: z.array(z.string()).optional(),
    relatedServices: z.array(z.string()).optional(),
    targetAudience: z.enum(['developers', 'qa', 'product', 'stakeholders'])
      .optional(),
    priority: z.enum(['low', 'medium', 'high', 'critical'])
      .optional()
  }).optional(),
  template: z.string().max(50).optional()
});

export type GenerateDocument = z.infer<typeof generateDocumentSchema>;

// User validation schemas
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
    .min(2, 'Nome muito curto')
    .max(100, 'Nome muito longo')
    .trim(),
  email: z.string()
    .email('Email inválido')
    .endsWith('@brpartners.com.br', 'Deve ser um email da BR Partners'),
  role: z.enum(['developer', 'qa', 'pm', 'tech-lead', 'admin']),
  team: z.string().min(1).max(100),
  permissions: z.array(z.string()).optional(),
  lastLogin: z.date().optional(),
  isActive: z.boolean().default(true)
});

export type User = z.infer<typeof userSchema>;

// API Response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional()
  }).optional(),
  timestamp: z.date(),
  requestId: z.string().uuid()
});

export type APIResponse = z.infer<typeof apiResponseSchema>;

// Utility validation functions
export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

export const validateJiraKey = (key: string): boolean => {
  return z.string().regex(/^[A-Z]+-\d+$/).safeParse(key).success;
};

export const validateUUID = (uuid: string): boolean => {
  return z.string().uuid().safeParse(uuid).success;
};

export const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const validateAndSanitize = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } => {
  try {
    // If data contains string fields, sanitize them
    if (typeof data === 'object' && data !== null) {
      const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = sanitizeInput(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as any);
      
      const result = schema.safeParse(sanitizedData);
      return result.success 
        ? { success: true, data: result.data }
        : { success: false, error: result.error };
    }
    
    const result = schema.safeParse(data);
    return result.success 
      ? { success: true, data: result.data }
      : { success: false, error: result.error };
  } catch (error) {
    return { 
      success: false, 
      error: new z.ZodError([{
        code: z.ZodIssueCode.custom,
        message: 'Validação falhou',
        path: []
      }])
    };
  }
};