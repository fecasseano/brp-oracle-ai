import { Metadata } from 'next';
import { ChatInterface } from '@/components/features/chat/ChatInterface';
import { Brain, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Oracle Chat | BR Partners AI',
  description: 'Converse com o Oracle AI para obter respostas sobre produtos, sistemas e documentação da BR Partners',
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header personalizado sem PageHeader */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Oracle Chat</h1>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  IA Powered
                </Badge>
              </div>
              <p className="text-slate-600 mt-1">
                Converse com nossa IA especializada em produtos BRP, sistemas e documentação técnica
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Área principal do chat */}
            <div className="lg:col-span-3">
              <ChatInterface />
            </div>
            
            {/* Sidebar com informações */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Info do Oracle */}
                <div className="bg-white rounded-lg border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Oracle AI</h3>
                      <p className="text-sm text-slate-500">Assistente Especializado</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      <span>Online e pronto para ajudar</span>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Especialista em:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Produtos BRP (Can-Am, Sea-Doo, Ski-Doo)</li>
                        <li>• Sistemas e APIs internas</li>
                        <li>• Documentação técnica</li>
                        <li>• Processos de desenvolvimento</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dicas de uso */}
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">💡 Dicas de Uso</h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div>
                      <p className="font-medium text-slate-700">Seja específico</p>
                      <p>Forneça contexto sobre qual produto ou sistema você está perguntando</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Use termos técnicos</p>
                      <p>O Oracle entende nossa terminologia interna e siglas</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Peça exemplos</p>
                      <p>Solicite código, configurações ou exemplos práticos</p>
                    </div>
                  </div>
                </div>

                {/* Estatísticas rápidas */}
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">📊 Estatísticas</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Respostas hoje</span>
                      <span className="font-semibold text-slate-800">247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Precisão média</span>
                      <span className="font-semibold text-green-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Tempo resposta</span>
                      <span className="font-semibold text-blue-600">1.2s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}