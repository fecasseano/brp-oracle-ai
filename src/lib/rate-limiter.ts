// Sistema de rate limiting em memória para desenvolvimento
// Em produção, usar Redis ou similar

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private configs: Record<string, RateLimitConfig> = {
    search: {
      windowMs: 60 * 1000, // 1 minuto
      maxRequests: 30, // 30 buscas por minuto
    },
    chat: {
      windowMs: 60 * 1000, // 1 minuto
      maxRequests: 20, // 20 mensagens por minuto
    },
    default: {
      windowMs: 60 * 1000, // 1 minuto
      maxRequests: 10, // 10 requests por minuto
    }
  };

  async check(
    identifier: string, 
    type: keyof typeof this.configs = 'default'
  ): Promise<{
    success: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  }> {
    const config = this.configs[type] || this.configs.default;
    const key = `${type}:${identifier}`;
    const now = Date.now();
    
    // Limpar entradas expiradas periodicamente
    this.cleanup();
    
    const existing = this.store.get(key);
    
    if (!existing || now > existing.resetTime) {
      // Nova janela de tempo
      this.store.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
      
      return {
        success: true,
        remaining: config.maxRequests - 1,
        resetTime: now + config.windowMs
      };
    }
    
    if (existing.count >= config.maxRequests) {
      // Rate limit excedido
      return {
        success: false,
        remaining: 0,
        resetTime: existing.resetTime,
        retryAfter: Math.ceil((existing.resetTime - now) / 1000)
      };
    }
    
    // Incrementar contador
    existing.count++;
    this.store.set(key, existing);
    
    return {
      success: true,
      remaining: config.maxRequests - existing.count,
      resetTime: existing.resetTime
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  // Método para resetar rate limit (útil para testes)
  reset(identifier?: string, type?: string) {
    if (identifier && type) {
      this.store.delete(`${type}:${identifier}`);
    } else {
      this.store.clear();
    }
  }

  // Obter estatísticas
  getStats() {
    const now = Date.now();
    const activeEntries = Array.from(this.store.entries())
      .filter(([, entry]) => now <= entry.resetTime);
    
    return {
      totalEntries: this.store.size,
      activeEntries: activeEntries.length,
      expiredEntries: this.store.size - activeEntries.length,
      entries: activeEntries.map(([key, entry]) => ({
        key,
        count: entry.count,
        resetIn: Math.max(0, Math.ceil((entry.resetTime - now) / 1000))
      }))
    };
  }
}

export const rateLimiter = new RateLimiter();