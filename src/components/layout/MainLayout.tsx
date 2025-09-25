'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  MessageSquare,
  FileText,
  Settings,
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  Activity,
  Brain
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Busca', href: '/search', icon: Search },
  { name: 'Oracle Chat', href: '/chat', icon: MessageSquare },
  { name: 'Documentos', href: '/documents', icon: FileText },
  { name: 'Conhecimento', href: '/knowledge', icon: BookOpen },
  { name: 'Times', href: '/teams', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: Activity },
];

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold">BRP Oracle AI</h1>
                <p className="text-xs text-muted-foreground">Knowledge Base</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={active ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-3 h-10"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                    {item.name === 'Oracle Chat' && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        IA
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <Separator />

          {/* User section */}
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>FC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Fernando Casseano</p>
                <p className="text-xs text-muted-foreground">Product Manager</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-lg font-semibold">
                  {navigation.find(item => isActive(item.href))?.name || 'BRP Oracle AI'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sistema inteligente de gestão de conhecimento
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick search */}
              <div className="hidden md:flex">
                <Button variant="outline" className="w-64 justify-start text-muted-foreground">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar conhecimento...
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Ctrl+K
                  </Badge>
                </Button>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}