import React, { useState, useCallback, useRef } from 'react';

// Implementação do cache
class ProductCache {
  private cache: Map<string, number>;
  private mutex: Map<string, boolean>;

  constructor() {
    this.cache = new Map();
    this.mutex = new Map();
  }

  getKey(arr: number[]): string {
    return JSON.stringify(arr);
  }

  has(arr: number[]): boolean {
    return this.cache.has(this.getKey(arr));
  }

  get(arr: number[]): number | undefined {
    return this.cache.get(this.getKey(arr));
  }

  set(arr: number[], value: number): void {
    const key = this.getKey(arr);
    
    // Implementação thread-safe (simulada em JS)
    if (!this.mutex.get(key)) {
      this.mutex.set(key, true);
      try {
        this.cache.set(key, value);
      } finally {
        this.mutex.set(key, false);
      }
    }
  }

  clear(): void {
    this.cache.clear();
    this.mutex.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

const AdjacentProductExercise: React.FC = () => {
  const [input, setInput] = useState<string>('3, 6, -2, -5, 7, 3');
  const [result, setResult] = useState<number | null>(null);
  const [cacheHit, setCacheHit] = useState<boolean>(false);
  const [cacheSize, setCacheSize] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const cacheRef = useRef(new ProductCache());

  const calculateLargestProduct = useCallback((arr: number[]): number => {
    if (arr.length < 2) {
      throw new Error('Array must contain at least 2 elements');
    }

    // Verificar cache primeiro
    const cache = cacheRef.current;
    if (cache.has(arr)) {
      setCacheHit(true);
      return cache.get(arr) as number;
    }

    setCacheHit(false);
    let maxProduct = arr[0] * arr[1];

    for (let i = 1; i < arr.length - 1; i++) {
      const product = arr[i] * arr[i + 1];
      maxProduct = Math.max(maxProduct, product);
    }

    // Armazenar no cache
    cache.set(arr, maxProduct);
    setCacheSize(cache.size());
    
    return maxProduct;
  }, []);

  const handleCalculate = () => {
    try {
      setError('');
      const inputArray = input.split(',').map(num => parseInt(num.trim(), 10));
      
      // Validar entrada
      if (inputArray.some(isNaN)) {
        throw new Error('A entrada contém números inválidos');
      }
      
      if (inputArray.length < 2) {
        throw new Error('A matriz deve conter pelo menos 2 elementos');
      }
      
      const product = calculateLargestProduct(inputArray);
      setResult(product);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  };

  const clearCache = () => {
    cacheRef.current.clear();
    setCacheSize(0);
    setCacheHit(false);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Exercício 1: Maior Produto de Elementos Adjacentes</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Dado um array de integers, encontre o par de elementos adjacentes (lado a lado) que tem o maior produto entre eles e retorne esse produto.
        </p>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-mono text-sm">
            Exemplo: Para [3, 6, -2, -5, 7, 3], a saída deverá ser 21 (7 * 3).
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          Array de Entrada (números separados por vírgula):
        </label>
        <div className="flex">
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            placeholder="Ex: 3, 6, -2, -5, 7, 3"
          />
          <button
            onClick={handleCalculate}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calcular
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {result !== null && (
        <div className="mb-6 bg-green-50 p-4 rounded-md">
          <p className="text-green-700 font-semibold">Resultado: {result}</p>
          <p className="text-sm text-gray-600 mt-1">
            {cacheHit ? 'Resultado obtido do cache ✓' : 'Resultado calculado e armazenado no cache'}
          </p>
        </div>
      )}
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Tamanho atual do cache: {cacheSize} entradas</p>
          <button
            onClick={clearCache}
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Limpar Cache
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Explicação do Sistema de Cache</h3>
        <div className="prose prose-sm text-gray-500">
          <p>O sistema de cache implementado utiliza uma estrutura Map para armazenar os resultados de cálculos anteriores:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>A chave do cache é a representação JSON do array de entrada</li>
            <li>O valor armazenado é o resultado do cálculo (maior produto)</li>
            <li>Antes de calcular, verificamos se o resultado já existe no cache</li>
            <li>Para garantir thread-safety, implementamos um sistema de mutex simulado</li>
            <li>O mutex previne que múltiplas operações modifiquem o cache simultaneamente</li>
          </ul>
          
          <h4 className="font-medium text-gray-900 mt-4 mb-2">Thread-Safety</h4>
          <p>
            Em um ambiente real de PHP, a thread-safety seria implementada usando:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Semáforos ou locks para controlar o acesso ao cache</li>
            <li>Em ambientes distribuídos, um serviço como Redis com operações atômicas</li>
            <li>Transações para garantir consistência durante leituras/escritas</li>
          </ul>
          
          <h4 className="font-medium text-gray-900 mt-4 mb-2">Testes</h4>
          <p>
            Para testar esta função, criaríamos:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Testes unitários para casos básicos, extremos e de borda</li>
            <li>Testes de concorrência para verificar thread-safety</li>
            <li>Testes de performance para arrays grandes</li>
            <li>Testes de integração em ambientes distribuídos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdjacentProductExercise;