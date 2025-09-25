'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Search,
  FileText,
  GitBranch,
  Server,
  Clock,
  User,
  Tag,
  ExternalLink,
  Filter,
  X
} from 'lucide-react';
import { searchMockContent } from '@/lib/mock-data';
import type { SearchFilters } from '@/types';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'document' | 'epic' | 'service';
  url: string;
  lastUpdated: Date;
  team: string;
  tags: string[];
  author?: string;
  status?: string;
}

const typeIcons = {
  document: FileText,
  epic: GitBranch,
  service: Server,
};

const typeLabels = {
  document: 'Documento',
  epic: 'Épico',
  service: 'Serviço',
};

export function SearchInterface() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState<SearchFilters>({});

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    try {
      const response = await searchMockContent(searchQuery, filters);
      
      // Transformar dados do mock para o formato esperado
      const transformedResults: SearchResult[] = [
        ...response.documents.map(doc => ({
          id: doc.id,
          title: doc.title,
          content: doc.content,
          type: 'document' as const,
          url: `/documents/${doc.id}`,
          lastUpdated: doc.lastModified,
          team: doc.team,
          tags: doc.tags,
          author: doc.author.name,
          status: doc.status,
        })),
        ...response.epics.map(epic => ({
          id: epic.id,
          title: epic.summary,
          content: epic.description,
          type: 'epic' as const,
          url: `/jira/${epic.key}`,
          lastUpdated: epic.updated,
          team: epic.assignee.team,
          tags: epic.labels,
          author: epic.assignee.name,
          status: epic.status,
        })),
        ...response.services.map(service => ({
          id: service.name,
          title: service.name,
          content: service.description,
          type: 'service' as const,
          url: `/backstage/${service.name}`,
          lastUpdated: service.metadata.lastUpdated,
          team: service.team,
          tags: service.tags,
          author: service.owner,
          status: service.lifecycle,
        })),
      ];

      setResults(transformedResults);
      setTotalResults(response.total);
      
      if (response.total === 0) {
        toast('Nenhum resultado encontrado', {
          description: 'Tente usar termos diferentes ou remover filtros.'
        });
      } else {
        toast(`${response.total} resultado${response.total > 1 ? 's' : ''} encontrado${response.total > 1 ? 's' : ''}`, {
          description: `Busca por "${searchQuery}" concluída em ${Math.random() * 1000 + 500 | 0}ms`
        });
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      toast('Erro na busca', {
        description: 'Ocorreu um erro ao realizar a busca. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, filters]);

  const filteredResults = results.filter(result => {
    if (activeTab === 'all') return true;
    return result.type === activeTab;
  });

  const getResultsByType = (type: string) => {
    return results.filter(r => r.type === type).length;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch(query);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar em épicos, documentos, serviços..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-4 py-6 text-lg"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2"
                onClick={() => setQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick filters */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Filtros rápidos:</span>
          {['Frontend', 'Backend', 'QA', 'Product'].map((team) => (
            <Badge
              key={team}
              variant={filters.team === team ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => 
                setFilters(prev => ({ 
                  ...prev, 
                  team: prev.team === team ? undefined : team 
                }))
              }
            >
              {team}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {query && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Buscando...' : `${totalResults} resultado${totalResults !== 1 ? 's' : ''} para "${query}"`}
            </p>
            {totalResults > 0 && (
              <p className="text-xs text-muted-foreground">
                Tempo de resposta: ~{Math.random() * 500 + 200 | 0}ms
              </p>
            )}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <span>Todos</span>
              {totalResults > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {totalResults}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="document" className="flex items-center space-x-2">
              <FileText className="h-3 w-3" />
              <span>Docs</span>
              {getResultsByType('document') > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getResultsByType('document')}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="epic" className="flex items-center space-x-2">
              <GitBranch className="h-3 w-3" />
              <span>Épicos</span>
              {getResultsByType('epic') > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getResultsByType('epic')}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="service" className="flex items-center space-x-2">
              <Server className="h-3 w-3" />
              <span>Serviços</span>
              {getResultsByType('service') > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getResultsByType('service')}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {loading ? (
              // Loading skeleton
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              // Results
              <div className="space-y-4">
                {filteredResults.map((result) => {
                  const Icon = typeIcons[result.type];
                  return (
                    <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="outline">
                              {typeLabels[result.type]}
                            </Badge>
                            <Badge variant="secondary">
                              {result.team}
                            </Badge>
                            {result.status && (
                              <Badge variant={result.status === 'Done' ? 'default' : 'secondary'}>
                                {result.status}
                              </Badge>
                            )}
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                        <CardTitle className="text-lg hover:text-primary">
                          {result.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2 mb-4">
                          {result.content}
                        </CardDescription>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            {result.author && (
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{result.author}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{result.lastUpdated.toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                          
                          {result.tags.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Tag className="h-3 w-3" />
                              <div className="flex space-x-1">
                                {result.tags.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {result.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{result.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : query ? (
              // No results
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Não encontramos resultados para "{query}".
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Sugestões:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Verifique a ortografia</li>
                    <li>Use termos mais gerais</li>
                    <li>Remova filtros ativos</li>
                  </ul>
                </div>
              </div>
            ) : (
              // Empty state
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Buscar no conhecimento da BRP</h3>
                <p className="text-muted-foreground">
                  Digite acima para buscar em épicos, documentos, serviços e muito mais.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}