/**
 * Utilitários de sanitização para prevenir XSS e injection attacks
 */

// Lista de tags perigosas para remover
const DANGEROUS_TAGS = [
  'script', 'object', 'embed', 'link', 'style', 'iframe', 'frame',
  'frameset', 'applet', 'meta', 'form', 'input', 'button', 'textarea',
  'select', 'option', 'base', 'body', 'html', 'head'
];

// Padrões perigosos para detectar
const DANGEROUS_PATTERNS = [
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /on\w+\s*=/gi, // event handlers como onclick, onload, etc
  /<script/gi,
  /eval\s*\(/gi,
  /expression\s*\(/gi,
  /import\s*\(/gi,
  /require\s*\(/gi
];

/**
 * Remove tags HTML perigosas do input
 */
export function removeDangerousTags(input: string): string {
  let cleaned = input;
  
  // Remove tags perigosas
  DANGEROUS_TAGS.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gis');
    cleaned = cleaned.replace(regex, '');
    
    // Remove tags auto-fechadas
    const selfClosingRegex = new RegExp(`<${tag}[^>]*/>`, 'gi');
    cleaned = cleaned.replace(selfClosingRegex, '');
    
    // Remove tags de abertura soltas
    const openTagRegex = new RegExp(`<${tag}[^>]*>`, 'gi');
    cleaned = cleaned.replace(openTagRegex, '');
  });
  
  return cleaned;
}

/**
 * Remove padrões perigosos do input
 */
export function removeDangerousPatterns(input: string): string {
  let cleaned = input;
  
  DANGEROUS_PATTERNS.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });
  
  return cleaned;
}

/**
 * Escapa caracteres HTML especiais
 */
export function escapeHtml(input: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  return input.replace(/[&<>"'`=\/]/g, (match) => htmlEscapes[match]);
}

/**
 * Remove caracteres de controle perigosos
 */
export function removeControlCharacters(input: string): string {
  // Remove caracteres de controle exceto \n, \r, \t
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
}

/**
 * Limita o comprimento da string
 */
export function truncateString(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + '...';
}

/**
 * Remove espaços excessivos e normaliza quebras de linha
 */
export function normalizeWhitespace(input: string): string {
  return input
    .replace(/\r\n/g, '\n') // Normaliza quebras de linha
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ') // Remove espaços e tabs múltiplos
    .replace(/\n{3,}/g, '\n\n') // Limita quebras de linha consecutivas
    .trim();
}

/**
 * Função principal de sanitização
 */
export function sanitizeInput(input: string, options: {
  maxLength?: number;
  allowHtml?: boolean;
  stripDangerous?: boolean;
} = {}): string {
  const {
    maxLength = 10000,
    allowHtml = false,
    stripDangerous = true
  } = options;
  
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  let sanitized = input;
  
  // Remove caracteres de controle
  sanitized = removeControlCharacters(sanitized);
  
  // Remove padrões perigosos se solicitado
  if (stripDangerous) {
    sanitized = removeDangerousPatterns(sanitized);
    sanitized = removeDangerousTags(sanitized);
  }
  
  // Escape HTML se não permitir HTML
  if (!allowHtml) {
    sanitized = escapeHtml(sanitized);
  }
  
  // Normaliza espaços e quebras de linha
  sanitized = normalizeWhitespace(sanitized);
  
  // Trunca se necessário
  if (maxLength > 0) {
    sanitized = truncateString(sanitized, maxLength);
  }
  
  return sanitized;
}

/**
 * Sanitização específica para queries de busca
 */
export function sanitizeSearchQuery(query: string): string {
  return sanitizeInput(query, {
    maxLength: 500,
    allowHtml: false,
    stripDangerous: true
  });
}

/**
 * Sanitização específica para mensagens de chat
 */
export function sanitizeChatMessage(message: string): string {
  return sanitizeInput(message, {
    maxLength: 4000,
    allowHtml: false,
    stripDangerous: true
  });
}

/**
 * Validação de email simples
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validação de URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Detecta tentativas de injeção SQL básicas
 */
export function detectSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /('|(\\')|(;\s*(drop|delete|insert|update|select|union|exec|execute))/gi,
    /(union\s+select|information_schema|sysobjects|syscolumns)/gi,
    /(\b(or|and)\s+\d+\s*=\s*\d+)/gi,
    /('.*'=.*'|".*"=.*")/gi
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Detecta tentativas de injeção de comandos
 */
export function detectCommandInjection(input: string): boolean {
  const commandPatterns = [
    /[;&|`$(){}[\]\\]/g,
    /(rm\s+|del\s+|format\s+)/gi,
    /(wget\s+|curl\s+|nc\s+|netcat\s+)/gi,
    /(\|\s*(ls|dir|cat|type|more|less))/gi
  ];
  
  return commandPatterns.some(pattern => pattern.test(input));
}

/**
 * Sanitização com detecção de ataques
 */
export function sanitizeWithThreatDetection(input: string): {
  sanitized: string;
  threats: string[];
} {
  const threats: string[] = [];
  
  // Detectar ameaças
  if (detectSqlInjection(input)) {
    threats.push('SQL Injection attempt detected');
  }
  
  if (detectCommandInjection(input)) {
    threats.push('Command Injection attempt detected');
  }
  
  DANGEROUS_PATTERNS.forEach((pattern, index) => {
    if (pattern.test(input)) {
      threats.push(`Dangerous pattern ${index + 1} detected`);
    }
  });
  
  // Sanitizar
  const sanitized = sanitizeInput(input);
  
  return {
    sanitized,
    threats
  };
}