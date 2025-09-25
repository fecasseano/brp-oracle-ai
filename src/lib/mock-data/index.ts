// BRP Oracle AI - Sistema de Mock Data Realístico
// Dados baseados na estrutura real da BR Partners

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'qa' | 'pm' | 'tech-lead';
  team: string;
  avatar?: string;
}

export interface MockJiraEpic {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done' | 'Cancelled';
  assignee: MockUser;
  reporter: MockUser;
  priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  labels: string[];
  fixVersions: string[];
  created: Date;
  updated: Date;
  stories: MockJiraStory[];
}

export interface MockJiraStory {
  id: string;
  key: string;
  summary: string;
  description: string;
  acceptanceCriteria: string;
  status: 'To Do' | 'In Progress' | 'Code Review' | 'Testing' | 'Done';
  assignee: MockUser;
  storyPoints: number;
  epic: string; // Epic key
  sprint: string;
  created: Date;
  updated: Date;
  tasks: MockJiraTask[];
}

export interface MockJiraTask {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee: MockUser;
  parent: string; // Story key
  timeSpent: number; // hours
  created: Date;
  updated: Date;
}

export interface MockBackstageService {
  name: string;
  description: string;
  type: 'service' | 'website' | 'library' | 'documentation';
  lifecycle: 'production' | 'development' | 'deprecated' | 'experimental';
  owner: string;
  team: string;
  system: string;
  tags: string[];
  apis: MockAPI[];
  dependencies: string[];
  links: {
    type: string;
    url: string;
    title: string;
  }[];
  metadata: {
    lastUpdated: Date;
    version: string;
    language?: string;
    framework?: string;
  };
}

export interface MockAPI {
  name: string;
  type: 'openapi' | 'graphql' | 'grpc' | 'rest';
  lifecycle: 'production' | 'development' | 'deprecated';
  owner: string;
  description: string;
  definition: string; // URL or content
  endpoints: MockEndpoint[];
}

export interface MockEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  summary: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  responses: {
    status: number;
    description: string;
    example?: any;
  }[];
}

export interface MockDocument {
  id: string;
  title: string;
  content: string;
  type: 'prd' | 'technical' | 'user-story' | 'api-doc' | 'onboarding' | 'process';
  tags: string[];
  product: string;
  team: string;
  author: MockUser;
  lastModified: Date;
  version: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

// Mock Users - BRP equipe
export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@brpartners.com.br',
    role: 'developer',
    team: 'Frontend'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@brpartners.com.br',
    role: 'qa',
    team: 'QA'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@brpartners.com.br',
    role: 'pm',
    team: 'Product'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@brpartners.com.br',
    role: 'developer',
    team: 'Backend'
  },
  {
    id: '5',
    name: 'Pedro Lima',
    email: 'pedro.lima@brpartners.com.br',
    role: 'tech-lead',
    team: 'Architecture'
  },
  {
    id: '6',
    name: 'Fernanda Reis',
    email: 'fernanda.reis@brpartners.com.br',
    role: 'qa',
    team: 'QA'
  }
];

// Mock Jira Epics - Projetos realísticos da BRP
export const mockJiraEpics: MockJiraEpic[] = [
  {
    id: 'epic-1',
    key: 'BRP-1001',
    summary: 'Portal do Cliente - Autenticação OAuth 2.0',
    description: 'Implementar autenticação segura no portal do cliente usando OAuth 2.0 com integração ao Active Directory da empresa. Esta implementação vai melhorar a segurança e experiência do usuário.',
    status: 'In Progress',
    assignee: mockUsers[0],
    reporter: mockUsers[2],
    priority: 'High',
    labels: ['security', 'portal-cliente', 'oauth'],
    fixVersions: ['v2.1.0'],
    created: new Date('2024-01-15'),
    updated: new Date('2024-01-20'),
    stories: []
  },
  {
    id: 'epic-2',
    key: 'BRP-1002',
    summary: 'API Gateway - Rate Limiting e Monitoramento',
    description: 'Implementar rate limiting inteligente e sistema de monitoramento para o API Gateway. Incluir dashboards em tempo real e alertas automáticos.',
    status: 'Done',
    assignee: mockUsers[3],
    reporter: mockUsers[4],
    priority: 'Medium',
    labels: ['api-gateway', 'performance', 'monitoring'],
    fixVersions: ['v1.5.0'],
    created: new Date('2023-12-01'),
    updated: new Date('2024-01-10'),
    stories: []
  },
  {
    id: 'epic-3',
    key: 'BRP-1003',
    summary: 'Sistema CRM - Módulo de Relatórios',
    description: 'Desenvolver módulo avançado de relatórios no CRM com exportação para PDF e Excel, filtros dinâmicos e agendamento de relatórios.',
    status: 'To Do',
    assignee: mockUsers[0],
    reporter: mockUsers[2],
    priority: 'Medium',
    labels: ['crm', 'reports', 'analytics'],
    fixVersions: ['v3.0.0'],
    created: new Date('2024-01-25'),
    updated: new Date('2024-01-25'),
    stories: []
  }
];

// Mock Backstage Services - Microserviços da BRP
export const mockBackstageServices: MockBackstageService[] = [
  {
    name: 'auth-service',
    description: 'Serviço de autenticação e autorização centralizado para todos os produtos BR Partners',
    type: 'service',
    lifecycle: 'production',
    owner: 'team-security',
    team: 'Backend',
    system: 'authentication',
    tags: ['auth', 'security', 'oauth', 'jwt'],
    apis: [
      {
        name: 'Auth API',
        type: 'rest',
        lifecycle: 'production',
        owner: 'team-security',
        description: 'API REST para autenticação e gerenciamento de tokens',
        definition: '/api/docs/auth/openapi.json',
        endpoints: [
          {
            path: '/auth/login',
            method: 'POST',
            summary: 'Realizar login',
            description: 'Autentica usuário e retorna JWT token',
            parameters: [
              { name: 'email', type: 'string', required: true, description: 'Email do usuário' },
              { name: 'password', type: 'string', required: true, description: 'Senha do usuário' }
            ],
            responses: [
              { status: 200, description: 'Login realizado com sucesso', example: { token: 'jwt.token.here' } },
              { status: 401, description: 'Credenciais inválidas' }
            ]
          },
          {
            path: '/auth/refresh',
            method: 'POST',
            summary: 'Renovar token',
            description: 'Renova JWT token válido',
            parameters: [
              { name: 'refreshToken', type: 'string', required: true, description: 'Token de refresh' }
            ],
            responses: [
              { status: 200, description: 'Token renovado com sucesso' },
              { status: 401, description: 'Token inválido' }
            ]
          }
        ]
      }
    ],
    dependencies: ['user-service', 'notification-service'],
    links: [
      { type: 'repository', url: 'https://github.com/brpartners/auth-service', title: 'Repositório' },
      { type: 'docs', url: '/docs/auth-service', title: 'Documentação' },
      { type: 'monitoring', url: '/grafana/auth-service', title: 'Monitoramento' }
    ],
    metadata: {
      lastUpdated: new Date('2024-01-18'),
      version: '2.3.1',
      language: 'Node.js',
      framework: 'Express'
    }
  },
  {
    name: 'customer-api',
    description: 'API principal para gerenciamento de dados de clientes',
    type: 'service',
    lifecycle: 'production',
    owner: 'team-backend',
    team: 'Backend',
    system: 'customer-management',
    tags: ['customer', 'crm', 'api', 'postgresql'],
    apis: [
      {
        name: 'Customer Management API',
        type: 'rest',
        lifecycle: 'production',
        owner: 'team-backend',
        description: 'CRUD completo para gerenciamento de clientes',
        definition: '/api/docs/customer/openapi.json',
        endpoints: [
          {
            path: '/customers',
            method: 'GET',
            summary: 'Listar clientes',
            description: 'Retorna lista paginada de clientes',
            parameters: [
              { name: 'page', type: 'number', required: false, description: 'Número da página' },
              { name: 'limit', type: 'number', required: false, description: 'Limite por página' }
            ],
            responses: [
              { status: 200, description: 'Lista de clientes', example: { customers: [], total: 0 } }
            ]
          }
        ]
      }
    ],
    dependencies: ['auth-service', 'notification-service'],
    links: [
      { type: 'repository', url: 'https://github.com/brpartners/customer-api', title: 'Repositório' },
      { type: 'docs', url: '/docs/customer-api', title: 'Documentação' }
    ],
    metadata: {
      lastUpdated: new Date('2024-01-19'),
      version: '1.8.2',
      language: 'Python',
      framework: 'FastAPI'
    }
  },
  {
    name: 'portal-cliente-frontend',
    description: 'Interface web do portal do cliente BR Partners',
    type: 'website',
    lifecycle: 'production',
    owner: 'team-frontend',
    team: 'Frontend',
    system: 'portal-cliente',
    tags: ['react', 'nextjs', 'portal', 'client-facing'],
    apis: [],
    dependencies: ['auth-service', 'customer-api', 'notification-service'],
    links: [
      { type: 'website', url: 'https://portal.brpartners.com.br', title: 'Portal Cliente' },
      { type: 'repository', url: 'https://github.com/brpartners/portal-cliente', title: 'Repositório' },
      { type: 'figma', url: 'https://figma.com/brpartners/portal-design', title: 'Design System' }
    ],
    metadata: {
      lastUpdated: new Date('2024-01-19'),
      version: '3.2.0',
      language: 'TypeScript',
      framework: 'Next.js'
    }
  }
];

// Mock Documents - Base de conhecimento
export const mockDocuments: MockDocument[] = [
  {
    id: 'doc-1',
    title: 'PRD - Portal do Cliente v3.0',
    content: `# PRD - Portal do Cliente v3.0

## Visão Geral
Nova versão do portal do cliente com foco em usabilidade e performance.

## Objetivos
- Melhorar experiência do usuário
- Implementar novo sistema de autenticação
- Otimizar performance de carregamento
- Adicionar módulo de relatórios personalizados

## Funcionalidades
1. Login com OAuth 2.0
2. Dashboard personalizado
3. Gestão de contratos
4. Suporte via chat integrado
5. Exportação de dados

## Métricas de Sucesso
- Redução de 30% no tempo de login
- Aumento de 25% na satisfação do cliente
- Diminuição de 40% nos tickets de suporte

## Cronograma
- Fase 1 (4 semanas): Autenticação
- Fase 2 (6 semanas): Dashboard e funcionalidades
- Fase 3 (2 semanas): Testes e deploy`,
    type: 'prd',
    tags: ['portal-cliente', 'v3.0', 'oauth', 'ux'],
    product: 'Portal Cliente',
    team: 'Product',
    author: mockUsers[2],
    lastModified: new Date('2024-01-18'),
    version: '1.2',
    status: 'approved'
  },
  {
    id: 'doc-2',
    title: 'Guia de Onboarding - Desenvolvedores',
    content: `# Guia de Onboarding - BR Partners

## Bem-vindo à BR Partners!

Este guia vai te ajudar a se ambientar rapidamente na nossa stack e processos.

## Stack Tecnológico
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Python, FastAPI, PostgreSQL
- **Infrastructure**: Docker, Kubernetes, AWS
- **Tools**: Jira, Backstage, GitHub, Slack

## Primeiro Dia
1. Setup do ambiente de desenvolvimento
2. Acesso às ferramentas (Jira, Backstage, Slack)
3. Clone dos repositórios principais
4. Reunião com o tech lead
5. Configuração do VS Code e extensões

## Primeira Semana
1. Implementar primeira feature simples
2. Code review com mentor
3. Participar das dailies
4. Conhecer a arquitetura dos sistemas
5. Documentar aprendizados

## Recursos Úteis
- Documentação técnica no Backstage
- Padrões de código no GitHub
- Slack channels: #dev-help, #general, #random
- Wiki interna: confluence.brpartners.com

## Contatos Importantes
- Tech Lead: Pedro Lima
- DevOps: Ana Costa  
- Product Manager: Carlos Oliveira`,
    type: 'onboarding',
    tags: ['onboarding', 'developers', 'first-week'],
    product: 'General',
    team: 'People',
    author: mockUsers[4],
    lastModified: new Date('2024-01-15'),
    version: '2.1',
    status: 'approved'
  },
  {
    id: 'doc-3',
    title: 'Arquitetura do Sistema CRM',
    content: `# Arquitetura do Sistema CRM

## Overview
Documentação técnica da arquitetura do sistema CRM da BR Partners.

## Componentes Principais
1. **Frontend**: React + TypeScript
2. **API Gateway**: Kong
3. **Microserviços**: Node.js + Python
4. **Database**: PostgreSQL + Redis
5. **Message Queue**: RabbitMQ

## Fluxo de Dados
1. Cliente acessa via browser
2. Load balancer direciona para instâncias
3. API Gateway autentica e roteia
4. Microserviços processam
5. Dados persistidos no PostgreSQL

## Padrões Arquiteturais
- Microserviços
- Event-driven architecture
- CQRS para relatórios
- Circuit breaker pattern

## Segurança
- OAuth 2.0 + JWT
- Rate limiting
- Input validation
- Audit logs`,
    type: 'technical',
    tags: ['crm', 'architecture', 'microservices'],
    product: 'Sistema CRM',
    team: 'Architecture',
    author: mockUsers[4],
    lastModified: new Date('2024-01-12'),
    version: '1.0',
    status: 'approved'
  }
];

// Utility functions with realistic delays
export const simulateNetworkDelay = async (
  minMs: number = 300, 
  maxMs: number = 1500
): Promise<void> => {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  await new Promise(resolve => setTimeout(resolve, delay));
};

export const simulateError = (errorRate: number = 0.05): boolean => {
  return Math.random() < errorRate;
};

// Mock API functions
export const getMockUsers = async (): Promise<MockUser[]> => {
  await simulateNetworkDelay();
  if (simulateError()) {
    throw new Error('Falha ao buscar usuários');
  }
  return mockUsers;
};

export const getMockJiraEpics = async (filters?: {
  status?: string;
  assignee?: string;
  project?: string;
}): Promise<MockJiraEpic[]> => {
  await simulateNetworkDelay(500, 2000);
  if (simulateError()) {
    throw new Error('Falha ao buscar épicos do Jira');
  }
  
  let filteredEpics = mockJiraEpics;
  
  if (filters?.status) {
    filteredEpics = filteredEpics.filter(epic => epic.status === filters.status);
  }
  
  if (filters?.assignee) {
    filteredEpics = filteredEpics.filter(epic => epic.assignee.name === filters.assignee);
  }
  
  return filteredEpics;
};

export const getMockBackstageServices = async (filters?: {
  type?: string;
  team?: string;
  lifecycle?: string;
}): Promise<MockBackstageService[]> => {
  await simulateNetworkDelay(400, 1200);
  if (simulateError()) {
    throw new Error('Falha ao buscar serviços do Backstage');
  }
  
  let filteredServices = mockBackstageServices;
  
  if (filters?.type) {
    filteredServices = filteredServices.filter(service => service.type === filters.type);
  }
  
  if (filters?.team) {
    filteredServices = filteredServices.filter(service => service.team === filters.team);
  }
  
  return filteredServices;
};

export const searchMockContent = async (
  query: string,
  filters?: {
    type?: string;
    team?: string;
    product?: string;
  }
): Promise<{
  documents: MockDocument[];
  epics: MockJiraEpic[];
  services: MockBackstageService[];
  total: number;
}> => {
  await simulateNetworkDelay(600, 1800);
  
  if (simulateError()) {
    throw new Error('Busca falhou');
  }
  
  const queryLower = query.toLowerCase();
  
  // Search in documents
  let documents = mockDocuments.filter(doc =>
    doc.title.toLowerCase().includes(queryLower) ||
    doc.content.toLowerCase().includes(queryLower) ||
    doc.tags.some(tag => tag.toLowerCase().includes(queryLower))
  );
  
  // Search in epics
  let epics = mockJiraEpics.filter(epic =>
    epic.summary.toLowerCase().includes(queryLower) ||
    epic.description.toLowerCase().includes(queryLower) ||
    epic.labels.some(label => label.toLowerCase().includes(queryLower))
  );
  
  // Search in services
  let services = mockBackstageServices.filter(service =>
    service.name.toLowerCase().includes(queryLower) ||
    service.description.toLowerCase().includes(queryLower) ||
    service.tags.some(tag => tag.toLowerCase().includes(queryLower))
  );
  
  // Apply filters
  if (filters?.type) {
    documents = documents.filter(doc => doc.type === filters.type);
  }
  
  if (filters?.team) {
    documents = documents.filter(doc => doc.team === filters.team);
    services = services.filter(service => service.team === filters.team);
  }
  
  if (filters?.product) {
    documents = documents.filter(doc => doc.product === filters.product);
  }
  
  const total = documents.length + epics.length + services.length;
  
  return {
    documents,
    epics,
    services,
    total
  };
};

// Generate AI response mock
export const generateMockAIResponse = async (
  question: string,
  context?: any[]
): Promise<{
  answer: string;
  sources: { type: string; name: string; url: string }[];
  confidence: number;
  timestamp: Date;
}> => {
  await simulateNetworkDelay(1000, 3000); // IA demora mais
  
  if (simulateError(0.02)) { // Taxa de erro menor para IA
    throw new Error('Serviço de IA temporariamente indisponível');
  }
  
  // Generate contextual response based on question
  const responses = {
    auth: "Baseado na documentação do Backstage da BR Partners, o serviço de autenticação utiliza OAuth 2.0 com integração ao Active Directory. O endpoint principal é /auth/login que retorna um JWT token válido por 24 horas. A arquitetura inclui refresh tokens para sessões longas.",
    portal: "O Portal do Cliente está na versão 3.2.0 e utiliza Next.js com TypeScript. A arquitetura segue padrão de microserviços, integrando com auth-service, customer-api e notification-service. O sistema possui dashboard personalizado e módulo de relatórios.",
    api: "O API Gateway implementa rate limiting de 1000 requests por minuto por cliente, com monitoramento via Grafana. A documentação completa está disponível no Backstage. Utiliza Kong como proxy reverso com plugins de autenticação.",
    crm: "O Sistema CRM utiliza arquitetura de microserviços com PostgreSQL + Redis. Implementa padrões como Event-driven architecture e CQRS para relatórios. O módulo de relatórios permite exportação em PDF e Excel com filtros dinâmicos.",
    default: "Baseado no conhecimento da BR Partners, encontrei algumas informações relacionadas à sua pergunta. Para detalhes mais específicos, recomendo consultar a documentação no Backstage ou contatar o time responsável."
  };
  
  const questionLower = question.toLowerCase();
  let answer = responses.default;
  
  if (questionLower.includes('auth') || questionLower.includes('login') || questionLower.includes('oauth')) {
    answer = responses.auth;
  } else if (questionLower.includes('portal') || questionLower.includes('cliente')) {
    answer = responses.portal;
  } else if (questionLower.includes('api') || questionLower.includes('gateway')) {
    answer = responses.api;
  } else if (questionLower.includes('crm') || questionLower.includes('relatório')) {
    answer = responses.crm;
  }
  
  return {
    answer,
    sources: [
      { type: 'backstage', name: 'auth-service', url: '/services/auth-service' },
      { type: 'jira', name: 'BRP-1001', url: '/jira/BRP-1001' },
      { type: 'document', name: 'PRD Portal Cliente v3.0', url: '/docs/doc-1' }
    ],
    confidence: 0.85,
    timestamp: new Date()
  };
};