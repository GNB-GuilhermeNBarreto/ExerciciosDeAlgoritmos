import React, { useState } from 'react';

const LongestStringsExercise: React.FC = () => {
  const [input, setInput] = useState<string>('aba, aa, ad, vcd, aba');
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  // Implementação JavaScript da função PHP
  const findLongestStrings = (inputArray: string[]): string[] => {
    if (inputArray.length === 0) {
      throw new Error('A matriz deve conter pelo menos um elemento');
    }

    // Encontrar o comprimento máximo usando programação funcional
    const maxLength = Math.max(...inputArray.map(str => str.length));
    
    // Filtrar strings com o comprimento máximo
    return inputArray.filter(str => str.length === maxLength);
  };

  const handleCalculate = () => {
    try {
      setError('');
      const inputArray = input.split(',').map(str => str.trim());
      
      if (inputArray.length === 0) {
        throw new Error('Por favor insira pelo menos uma string');
      }
      
      const longestStrings = findLongestStrings(inputArray);
      setResult(longestStrings);
    } catch (err) {
      setError((err as Error).message);
      setResult([]);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Exercício 2: Todas as Strings Mais Longas</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Dado um array de strings, verifique o tamanho da maior string e retorne outro array contendo todas strings com esse tamanho.
        </p>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-mono text-sm">
            Exemplo: Para ["aba", "aa", "ad", "vcd", "aba"], a saída deverá ser ["aba", "vcd", "aba"].
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          Array de Strings (separadas por vírgula):
        </label>
        <div className="flex">
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            placeholder="Ex: aba, aa, ad, vcd, aba"
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
      
      {result.length > 0 && (
        <div className="mb-6 bg-green-50 p-4 rounded-md">
          <p className="text-green-700 font-semibold mb-2">Resultado:</p>
          <div className="bg-white p-3 rounded border border-green-200">
            <code className="text-sm">
              ["{result.join('", "')}"]
            </code>
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Implementação em PHP e Docker</h3>
        <div className="prose prose-sm text-gray-500">
          <p>A implementação em PHP desta função seria:</p>
          
          <div className="bg-gray-50 p-3 rounded font-mono text-sm mt-2 mb-4">
            <pre>
              {
                `function todasStringsMaisLongas(array $inputArray) : array {
                    $maxLength = max(array_map('mb_strlen', $inputArray));
                    return array_values(
                        array_filter($inputArray, function($str) use ($maxLength) {
                            return mb_strlen($str) === $maxLength;
                        })
                    );
                }`
              }
            </pre>
          </div>
          
          <h4 className="font-medium text-gray-900 mt-4 mb-2">Configuração Docker</h4>
          <p>
            Para executar esta função em um ambiente Docker, criaríamos:
          </p>
          
          <div className="bg-gray-50 p-3 rounded font-mono text-sm mt-2 mb-4">
            <pre>{
                `# Dockerfile
                  FROM php:8.2-cli
                  WORKDIR /app
                  COPY . .
                # Instalar dependências para PHPUnit
                  RUN apt-get update && apt-get install -y \\
                    git \\
                    unzip \\
                    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \\
                    && composer require --dev phpunit/phpunit

                # Comando padrão
                CMD ["php", "index.php"]`
              }
            </pre>
          </div>
          
          <p className="mt-4">Para construir e executar o contêiner:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Construir a imagem: <code>docker build -t php-longest-strings .</code></li>
            <li>Executar o contêiner: <code>docker run php-longest-strings</code></li>
          </ol>
          
          <h4 className="font-medium text-gray-900 mt-4 mb-2">Testes com PHPUnit</h4>
          <div className="bg-gray-50 p-3 rounded font-mono text-sm mt-2">
            <pre>{
              `<?php
                use PHPUnit\\Framework\\TestCase;

                class LongestStringsTest extends TestCase
                {
                  public function testExampleCase()
                  {
                    $input = ["aba", "aa", "ad", "vcd", "aba"];
                    $expected = ["aba", "vcd", "aba"];
                    $this->assertEquals($expected, todasStringsMaisLongas($input));
                  }
                  
                  public function testEmptyArray()
                  {
                    $this->expectException(InvalidArgumentException::class);
                    todasStringsMaisLongas([]);
                  }
                  
                  public function testAllSameLength()
                  {
                    $input = ["a", "b", "c"];
                    $this->assertEquals($input, todasStringsMaisLongas($input));
                  }
                }`
              }
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongestStringsExercise;