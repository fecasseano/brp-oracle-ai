'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  Brain,
  User,
  Copy,
  RotateCcw,
  Loader2,
  Sparkles,
  Plus
} from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: {
    type: string;
    name: string;
    url: string;
  }[];
  confidence?: number;
}

const suggestedQuestions = [
  'Como implementar autenticação OAuth 2.0?',
  'Qual a arquitetura do sistema CRM?',
  'Como fazer deploy em produção?',
  'Quais são os padrões de código do Frontend?',
];

const quickActions = [
  { text: 'Gerar PRD', prompt: 'Me ajude a criar um PRD para uma nova funcionalidade' },
  { text: 'User Story', prompt: 'Como escrever uma user story seguindo nossos padrões?' },
  { text: 'Documentação', prompt: 'Preciso criar documentação técnica para uma API' },
  { text: 'Onboarding', prompt: 'Explique o processo de onboarding para novos devs' },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      content: messageToSend,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            content: msg.content,
            role: msg.role,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erro na resposta da API');
      }

      const assistantMessage: ChatMessage = {
        id: result.data.message.id,
        content: result.data.message.content,
        role: 'assistant',
        timestamp: new Date(result.data.message.timestamp),
        sources: result.data.message.sources,
        confidence: result.data.message.confidence,
      };

      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        role: 'assistant',
        timestamp: new Date(),
        confidence: 0,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      alert('Mensagem copiada!');
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Oracle AI</h3>
              <p className="text-sm text-slate-600 font-normal">
                Assistente especializado em BR Partners
              </p>
            </div>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearChat}
                className="text-slate-600"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Olá! Sou o Oracle AI
                </h3>
                <p className="text-slate-600 mb-6 max-w-md">
                  Posso ajudar com produtos BRP, sistemas internos, documentação e processos de desenvolvimento.
                </p>
                
                <div className="w-full max-w-2xl">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">
                    💡 Perguntas sugeridas:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left h-auto p-3 justify-start text-sm"
                        onClick={() => handleSendMessage(question)}
                        disabled={isLoading}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="w-full max-w-2xl mt-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">
                    🚀 Ações rápidas:
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSendMessage(action.prompt)}
                        disabled={isLoading}
                        className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {action.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-blue-600'
                        : 'bg-slate-100'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Brain className="w-4 h-4 text-slate-600" />
                      )}
                    </div>

                    <div className={`flex-1 max-w-2xl ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`inline-block p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        <div className="whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                        
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="text-xs text-slate-500 mb-2">📚 Fontes:</p>
                            <div className="space-y-1">
                              {message.sources.map((source, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs">
                                  <Badge variant="outline" className="text-xs">
                                    {source.type}
                                  </Badge>
                                  <span className="text-slate-600">{source.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex items-center gap-2 mt-2 text-xs text-slate-500 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{formatTimestamp(message.timestamp)}</span>
                        {message.confidence !== undefined && (
                          <>
                            <span>•</span>
                            <span>{Math.round(message.confidence * 100)}%</span>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyMessage(message.content)}
                          className="h-5 w-5 p-0 hover:bg-slate-200"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-slate-100 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Oracle está pensando...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t bg-slate-50">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Digite sua pergunta sobre produtos BRP, sistemas, documentação..."
                disabled={isLoading}
                className="flex-1 bg-white"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <p className="text-xs text-slate-500 mt-2 text-center">
              O Oracle pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}