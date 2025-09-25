// BRP Oracle AI - Definições de Tipos TypeScript

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'qa' | 'pm' | 'tech-lead' | 'admin';
  team: string;
  avatar?: string;
  permissions?: string[];
  lastLogin?: Date;
  isActive: boolean;
}

// Search types
export interface SearchFilters {
  type?: 'epic' | 'story' | 'task' | 'document' | 'service' | 'api';
  team?: string;
  product?: string;
  status?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
}

export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'epic' | 'story' | 'document' | 'service';
  url: string;
  relevance: number;
  lastUpdated: Date;
  team: string;
  tags: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  filters: SearchFilters;
  took: number; // tempo em ms
}

// Chat types
export interface ChatMessage {
  id: string;
  message: string;
  timestamp: Date;
  type: 'user' | 'assistant';
  sources?: ChatSource[];
}

export interface ChatSource {
  type: 'jira' | 'backstage' | 'document' | 'api';
  name: string;
  url: string;
  relevance?: number;
}

export interface ChatResponse {
  id: string;
  answer: string;
  sources: ChatSource[];
  confidence: number;
  timestamp: Date;
  conversationId: string;
  tokens?: {
    input: number;
    output: number;
  };
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Jira types
export interface JiraEpic {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done' | 'Cancelled';
  assignee: User;
  reporter: User;
  priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  labels: string[];
  fixVersions: string[];
  created: Date;
  updated: Date;
  stories?: JiraStory[];
}

export interface JiraStory {
  id: string;
  key: string;
  summary: string;
  description: string;
  acceptanceCriteria: string;
  status: 'To Do' | 'In Progress' | 'Code Review' | 'Testing' | 'Done';
  assignee: User;
  storyPoints: number;
  epic: string; // Epic key
  sprint: string;
  created: Date;
  updated: Date;
  tasks?: JiraTask[];
}

export interface JiraTask {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee: User;
  parent: string; // Story key
  timeSpent: number; // hours
  created: Date;
  updated: Date;
}

// Backstage types
export interface BackstageService {
  name: string;
  description: string;
  type: 'service' | 'website' | 'library' | 'documentation';
  lifecycle: 'production' | 'development' | 'deprecated' | 'experimental';
  owner: string;
  team: string;
  system: string;
  tags: string[];
  apis?: BackstageAPI[];
  dependencies: string[];
  links: BackstageLink[];
  metadata: {
    lastUpdated: Date;
    version: string;
    language?: string;
    framework?: string;
  };
}

export interface BackstageAPI {
  name: string;
  type: 'openapi' | 'graphql' | 'grpc' | 'rest';
  lifecycle: 'production' | 'development' | 'deprecated';
  owner: string;
  description: string;
  definition: string;
  endpoints?: APIEndpoint[];
}

export interface APIEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  summary: string;
  description: string;
  parameters: APIParameter[];
  responses: APIResponse[];
}

export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface APIResponse {
  status: number;
  description: string;
  example?: any;
}

export interface BackstageLink {
  type: string;
  url: string;
  title: string;
}

// Document types
export interface Document {
  id: string;
  title: string;
  content: string;
  type: 'prd' | 'technical' | 'user-story' | 'api-doc' | 'onboarding' | 'process';
  tags: string[];
  product: string;
  team: string;
  author: User;
  lastModified: Date;
  version: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

// Document generation types
export interface GenerateDocumentRequest {
  type: 'prd' | 'user-story' | 'technical-doc' | 'api-doc';
  title: string;
  description: string;
  context?: {
    product?: string;
    team?: string;
    relatedEpics?: string[];
    relatedServices?: string[];
    targetAudience?: 'developers' | 'qa' | 'product' | 'stakeholders';
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
  template?: string;
}

export interface GeneratedDocument {
  content: string;
  metadata: {
    type: string;
    generatedAt: Date;
    template: string;
    confidence: number;
  };
  suggestions?: string[];
}

// API response types
export interface APISuccessResponse<T = any> {
  success: true;
  data: T;
  timestamp: Date;
  requestId: string;
}

export interface APIErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Date;
  requestId: string;
}

export type APIResponse<T = any> = APISuccessResponse<T> | APIErrorResponse;

// Analytics types
export interface AnalyticsEvent {
  eventType: 'search_performed' | 'chat_message_sent' | 'document_generated' | 'page_viewed' | 'feature_used' | 'error_occurred';
  userId: string;
  sessionId: string;
  timestamp: Date;
  properties?: Record<string, string | number | boolean | string[]>;
  metadata?: {
    userAgent?: string;
    ip?: string;
    page?: string;
    referrer?: string;
  };
}

export interface UsageMetrics {
  totalSearches: number;
  totalChatMessages: number;
  totalDocumentsGenerated: number;
  averageResponseTime: number;
  topQueries: Array<{ query: string; count: number }>;
  activeUsers: number;
  errorRate: number;
}

// UI component types
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Configuration types
export interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
    baseUrl: string;
  };
  ai: {
    openai?: {
      apiKey: string;
      model: string;
      maxTokens: number;
      temperature: number;
    };
    anthropic?: {
      apiKey: string;
      model: string;
      maxTokens: number;
    };
  };
  integrations: {
    jira?: {
      baseUrl: string;
      username: string;
      apiToken: string;
      projectKeys?: string[];
    };
    backstage?: {
      baseUrl: string;
      apiToken: string;
    };
  };
  security: {
    sessionSecret: string;
    encryptionKey: string;
    corsOrigins: string[];
    rateLimits: {
      search: number;
      chat: number;
      docGen: number;
    };
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  details?: any;
  isOperational: boolean;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Generic pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Feature flags
export interface FeatureFlags {
  enableAIChat: boolean;
  enableDocumentGeneration: boolean;
  enableJiraIntegration: boolean;
  enableBackstageIntegration: boolean;
  enableAnalytics: boolean;
  enableMockData: boolean;
}

// Dashboard types
export interface DashboardStats {
  totalSearches: number;
  totalDocuments: number;
  totalServices: number;
  averageResponseTime: number;
  popularQueries: Array<{ query: string; count: number }>;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: Date;
    user: string;
  }>;
}

export interface TeamMetrics {
  team: string;
  searches: number;
  documents: number;
  aiQueries: number;
  avgResponseTime: number;
}

// Export all types for easy importing
export type * from './index';