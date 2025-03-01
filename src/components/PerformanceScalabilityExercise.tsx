import React from 'react';

const PerformanceScalabilityExercise: React.FC = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Exercício 3: Performance e Escalabilidade em Aplicações PHP</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Estratégias para identificar e resolver problemas de performance e escalabilidade em uma aplicação de e-commerce de alta performance usando PHP.
        </p>
      </div>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Identificação de Gargalos de Performance</h3>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">Ferramentas de Monitoramento</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>New Relic:</strong> Monitoramento de aplicações em tempo real, identificando transações lentas e erros.</li>
              <li><strong>Blackfire.io:</strong> Profiling detalhado de código PHP para identificar funções e métodos que consomem mais recursos.</li>
              <li><strong>Prometheus + Grafana:</strong> Coleta e visualização de métricas personalizadas.</li>
              <li><strong>XDebug:</strong> Para profiling local durante o desenvolvimento.</li>
            </ul>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Métricas Importantes</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Tempo de resposta:</strong> Média, percentil 95 e percentil 99 dos tempos de resposta.</li>
              <li><strong>Throughput:</strong> Requisições por segundo que o sistema consegue processar.</li>
              <li><strong>Utilização de recursos:</strong> CPU, memória, I/O de disco e rede.</li>
              <li><strong>Tempo de execução de queries:</strong> Identificar queries lentas no banco de dados.</li>
              <li><strong>Taxa de erros:</strong> Percentual de requisições que resultam em erro.</li>
            </ul>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Otimização de Código</h3>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">Técnicas de Otimização</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Lazy Loading:</strong> Carregar recursos apenas quando necessário.</li>
              <li><strong>Eager Loading:</strong> Em ORMs como Eloquent, usar eager loading para evitar o problema N+1.</li>
              <li><strong>Otimização de loops:</strong> Evitar operações custosas dentro de loops.</li>
              <li><strong>Uso de generators:</strong> Para processar grandes conjuntos de dados com baixo consumo de memória.</li>
              <li><strong>Compilação JIT:</strong> Habilitar o JIT do PHP 8 para código computacionalmente intensivo.</li>
            </ul>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Estratégias de Cache</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>OpCache:</strong> Otimizar a compilação de bytecode PHP.</li>
              <li><strong>Redis:</strong> Cache de objetos, resultados de queries e sessões.</li>
              <li><strong>Memcached:</strong> Cache distribuído para dados frequentemente acessados.</li>
              <li><strong>Varnish:</strong> Cache HTTP para páginas completas ou fragmentos.</li>
              <li><strong>Cache em múltiplas camadas:</strong> Combinar cache de aplicação, objeto e página.</li>
            </ul>
            
            <div className="bg-white p-3 rounded border border-gray-200 mt-3 font-mono text-sm">
              <pre>
                {
                  `// Exemplo de implementação de cache com Redis
                    function getProdutoDetalhes($id) {
                      $cacheKey = "produto:{$id}:detalhes";
                      
                      // Tentar obter do cache primeiro
                      if ($cache = Redis::get($cacheKey)) {
                          return unserialize($cache);
                      }
                      
                      // Se não estiver em cache, buscar do banco
                      $produto = Produto::with(['categorias', 'imagens'])->find($id);
                      
                      // Armazenar no cache por 1 hora
                      Redis::setex($cacheKey, 3600, serialize($produto));
                      
                      return $produto;
                    }`
                }
              </pre>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Arquitetura e Infraestrutura</h3>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">Escalabilidade Horizontal e Vertical</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Escalabilidade Vertical:</strong> Aumentar recursos (CPU, RAM) dos servidores existentes.</li>
              <li><strong>Escalabilidade Horizontal:</strong> Adicionar mais servidores ao cluster.</li>
              <li><strong>Arquitetura de Microserviços:</strong> Dividir a aplicação em serviços menores e independentes.</li>
              <li><strong>Containers e Kubernetes:</strong> Para orquestração e auto-scaling de serviços.</li>
              <li><strong>Serverless:</strong> Para funções específicas com carga variável.</li>
            </ul>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Balanceamento de Carga</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Nginx/HAProxy:</strong> Como load balancers na camada de aplicação.</li>
              <li><strong>AWS ELB/ALB:</strong> Balanceadores de carga gerenciados.</li>
              <li><strong>Estratégias:</strong> Round-robin, least connections, IP hash para sessões.</li>
              <li><strong>Health checks:</strong> Remover automaticamente servidores não saudáveis.</li>
            </ul>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Filas e Processamento Assíncrono</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>RabbitMQ/Amazon SQS:</strong> Para processamento assíncrono de tarefas.</li>
              <li><strong>Laravel Horizon:</strong> Para gerenciar filas no Redis.</li>
              <li><strong>Casos de uso:</strong> Processamento de pedidos, envio de emails, geração de relatórios.</li>
            </ul>
            
            <div className="bg-white p-3 rounded border border-gray-200 mt-3 font-mono text-sm">
              <pre>
                {
                  `// Exemplo de uso de filas no Laravel
                  class PedidoController extends Controller
                  {
                    public function finalizar(Request $request)
                    {
                      // Processar pedido de forma síncrona
                      $pedido = Pedido::create($request->all());
                      
                      // Enviar tarefas para processamento assíncrono
                      ProcessarPagamentoJob::dispatch($pedido);
                      EnviarEmailConfirmacaoJob::dispatch($ pedido);
                      AtualizarEstoqueJob::dispatch($pedido->itens);
                      
                      return response()->json(['pedido_id' => $pedido->id]);
                    }
                  }`
                }           
            </pre>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Otimização de Banco de Dados</h3>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">Otimização de Queries</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Indexação:</strong> Criar índices apropriados para consultas frequentes.</li>
              <li><strong>Query Optimization:</strong> Usar EXPLAIN para analisar e otimizar queries.</li>
              <li><strong>Paginação:</strong> Limitar resultados em grandes conjuntos de dados.</li>
              <li><strong>Joins eficientes:</strong> Otimizar joins e evitar subconsultas quando possível.</li>
            </ul>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Particionamento e Replicação</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Sharding:</strong> Dividir dados em múltiplos bancos baseado em critérios como região ou ID.</li>
              <li><strong>Replicação Master-Slave:</strong> Leituras distribuídas em réplicas, escritas no master.</li>
              <li><strong>CQRS:</strong> Separar bancos de leitura e escrita para otimizar cada caso.</li>
            </ul>
            
            <div className="bg-white p-3 rounded border border-gray-200 mt-3 font-mono text-sm">
              <pre>
                {
                  `// Configuração de múltiplas conexões no Laravel
                  // config/database.php
                  'mysql' => [
                    'read' => [
                      'host' => [
                        'replica1.mysql.example.com',
                        'replica2.mysql.example.com',
                      ],
                    ],
                    'write' => [
                      'host' => 'master.mysql.example.com',
                    ],
                  ],`
                }      
              </pre>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Experiência Prática</h3>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">Caso de Estudo: E-commerce com Picos de Tráfego</h4>
            <p className="text-gray-700 mb-3">
              Em um projeto anterior de e-commerce, enfrentamos problemas de performance durante campanhas promocionais que geravam picos de tráfego 10x maiores que o normal.
            </p>
            
            <h4 className="font-medium text-gray-900 mb-2">Desafios Enfrentados:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Tempos de resposta elevados durante picos de tráfego</li>
              <li>Sobrecarga do banco de dados com consultas repetitivas</li>
              <li>Timeout em processos de checkout</li>
              <li>Inconsistências de estoque durante compras simultâneas</li>
            </ul>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Soluções Implementadas:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>
                <strong>Cache de Catálogo:</strong> Implementação de cache Redis para produtos, categorias e preços com invalidação seletiva.
              </li>
              <li>
                <strong>Auto-scaling:</strong> Configuração de auto-scaling na AWS baseado em métricas de CPU e número de requisições.
              </li>
              <li>
                <strong>Filas para Processamento de Pedidos:</strong> Migração do processamento de pedidos para um sistema de filas com RabbitMQ.
              </li>
              <li>
                <strong>Read Replicas:</strong> Separação de conexões de leitura e escrita, direcionando consultas para réplicas.
              </li>
              <li>
                <strong>CDN:</strong> Utilização de CDN para assets estáticos e páginas de catálogo com cache.
              </li>
            </ol>
            
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Resultados:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Redução de 80% no tempo médio de resposta</li>
              <li>Capacidade de suportar 5x mais usuários simultâneos</li>
              <li>Eliminação de timeouts durante checkout</li>
              <li>Redução de 70% na carga do banco de dados</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerformanceScalabilityExercise;