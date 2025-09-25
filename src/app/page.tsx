'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  MessageSquare,
  FileText,
  GitBranch,
  Server,
  Clock,
  TrendingUp,
  Users,
  Brain,
  Activity,
  ChevronRight,
  Zap,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    title: 'Documentos',
    value: '1,234',
    change: '+12%',
    icon: FileText,
    description: 'PRDs, guias e documentação técnica'
  },
  {
    title: 'Épicos Ativos',
    value: '23',
    change: '+3',
    icon: GitBranch,
    description: 'Em desenvolvimento ou revisão'
  },
  {
    title: 'Serviços',
    value: '67',
    change: '+5',
    icon: Server,
    description: 'Microserviços em produção'
  },
  {
    title: 'Consultas IA',
    value: '892',
    change: '+45%',
    icon: Brain,
    description: 'Este mês'
  },
];

const recentActivity = [
  {
    type: 'document',
    title: 'PRD - Portal do Cliente v3.0',
    action: 'atualizado',
    user: 'Carlos Oliveira',
    time: '2 horas atrás',
    team: 'Product'
  },
  {
    type: 'epic',
    title: 'BRP-1001 - Autenticação OAuth 2.0',
    action: 'movido para Done',
    user: 'João Silva',
    time: '4 horas atrás',
    team: 'Frontend'
  },
  {
    type: 'service',
    title: 'customer-api',
    action: 'deploy v1.8.2',
    user: 'Ana Costa',
    time: '6 horas atrás',
    team: 'Backend'
  },
  {
    type: 'chat',
    title: 'Consulta sobre arquitetura CRM',
    action: 'pergunta ao Oracle AI',
    user: 'Maria Santos',
    time: '1 dia atrás',
    team: 'QA'
  },
];

const quickActions = [
  {
    title: 'Busca Inteligente',
    description: 'Encontre qualquer informação rapidamente',
    icon: Search,
    href: '/search',
    color: 'bg-blue-500',
  },
  {
    title: 'Oracle Chat',
    description: 'Converse com a IA sobre seus projetos',
    icon: MessageSquare,
    href: '/chat',
    color: 'bg-green-500',
  },
  {
    title: 'Gerar Documento',
    description: 'Crie PRDs e documentação com IA',
    icon: FileText,
    href: '/documents/generate',
    color: 'bg-purple-500',
  },
  {
    title: 'Base de Conhecimento',
    description: 'Explore todos os recursos disponíveis',
    icon: BookOpen,
    href: '/knowledge',
    color: 'bg-orange-500',
  },
];

const popularQueries = [
  'Como implementar OAuth 2.0?',
  'Arquitetura do sistema CRM',
  'Processo de deploy em produção',
  'Padrões de código Frontend',
  'Integração com API Gateway',
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">Bem-vindo ao BRP Oracle AI</h1>
            <p className="text-lg text-muted-foreground">
              Sua central de conhecimento inteligente da BR Partners
            </p>
          </div>
          
          {/* Status bar */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Todos os sistemas operacionais</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Última sincronização: agora</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-muted-foreground">IA disponível</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">{stat.change}</span>
                    <span>vs. mês anterior</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Ações Rápidas</span>
                </CardTitle>
                <CardDescription>
                  Acesso rápido às funcionalidades principais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.title} href={action.href}>
                        <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-105">
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className={`${action.color} p-3 rounded-lg`}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{action.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {action.description}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Queries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Consultas Populares</span>
              </CardTitle>
              <CardDescription>
                Perguntas mais feitas ao Oracle AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularQueries.map((query, index) => (
                  <Link key={index} href={`/chat?q=${encodeURIComponent(query)}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                      <span className="text-sm">{query}</span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
                
                <Link href="/chat">
                  <Button variant="outline" className="w-full mt-4">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Fazer Nova Pergunta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Atividade Recente</span>
            </CardTitle>
            <CardDescription>
              Últimas atualizações em documentos, épicos e serviços
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border">
                  <div className="flex-shrink-0">
                    {activity.type === 'document' && <FileText className="h-5 w-5 text-blue-500" />}
                    {activity.type === 'epic' && <GitBranch className="h-5 w-5 text-green-500" />}
                    {activity.type === 'service' && <Server className="h-5 w-5 text-purple-500" />}
                    {activity.type === 'chat' && <Brain className="h-5 w-5 text-orange-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{activity.action} por {activity.user}</span>
                      <Separator orientation="vertical" className="h-3" />
                      <Badge variant="outline" className="text-xs">
                        {activity.team}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Link href="/activity">
                <Button variant="outline" className="w-full">
                  Ver Todas as Atividades
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}