import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;
    
    // Simular delay da IA
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Resposta mock simples
    const responses = [
      "Entendi sua pergunta sobre produtos BRP. Com base na documentação técnica, posso te ajudar com informações sobre Can-Am, Sea-Doo, Ski-Doo e Lynx.",
      "Excelente pergunta! Vou consultar nossa base de conhecimento sobre sistemas internos e processos de desenvolvimento.",
      "Com base nos padrões da BR Partners, aqui está uma resposta contextualizada para sua consulta técnica.",
      "Consultei os documentos do Jira e Backstage. Aqui estão as informações mais relevantes para seu caso.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return NextResponse.json({
      success: true,
      data: {
        message: {
          id: `msg_${Date.now()}`,
          content: randomResponse,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          confidence: 0.85 + Math.random() * 0.1,
          sources: [
            {
              type: 'Jira',
              name: 'BRP-123: Documentação Técnica',
              url: '#'
            },
            {
              type: 'Backstage',
              name: 'Sistema CRM - Arquitetura',
              url: '#'
            }
          ]
        }
      }
    });
    
  } catch (error) {
    console.error('[CHAT API] Error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}