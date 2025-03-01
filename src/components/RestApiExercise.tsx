import React, { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Guilherme N. Barreto', email: 'guilhermenbarreto.gnb@gmail.com' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@example.com' },
  { id: 3, name: 'Pedro Santos', email: 'pedro@example.com' },
];

interface User {
  id: number;
  name: string;
  email: string;
}

const RestApiExercise: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [activeTab, setActiveTab] = useState('list');
  const [apiResponse, setApiResponse] = useState<{ status: number; data: any } | null>(null);

  // Simular chamadas de API
  const simulateApiCall = (method: string, endpoint: string, data?: any): { status: number; data: any } => {
    let response = { status: 200, data: {} };
    
    switch (method) {
      case 'GET':
        if (endpoint === '/users') {
          response.data = { users };
        } else if (endpoint.startsWith('/users/')) {
          const id = parseInt(endpoint.split('/')[2], 10);
          const user = users.find(u => u.id === id);
          if (user) {
            response.data = { user };
          } else {
            response.status = 404;
            response.data = { error: 'User not found' };
          }
        }
        break;
        
      case 'POST':
        if (endpoint === '/users') {
          const newId = Math.max(...users.map(u => u.id), 0) + 1;
          const newUser = { id: newId, ...data };
          setUsers(prev => [...prev, newUser]);
          response.status = 201;
          response.data = { user: newUser };
        }
        break;
        
      case 'PUT':
        if (endpoint.startsWith('/users/')) {
          const id = parseInt(endpoint.split('/')[2], 10);
          const index = users.findIndex(u => u.id === id);
          
          if (index !== -1) {
            const updatedUser = { ...users[index], ...data };
            const updatedUsers = [...users];
            updatedUsers[index] = updatedUser;
            setUsers(updatedUsers);
            response.data = { user: updatedUser };
          } else {
            response.status = 404;
            response.data = { error: 'User not found' };
          }
        }
        break;
        
      case 'DELETE':
        if (endpoint.startsWith('/users/')) {
          const id = parseInt(endpoint.split('/')[2], 10);
          const index = users.findIndex(u => u.id === id);
          
          if (index !== -1) {
            const deletedUser = users[index];
            setUsers(users.filter(u => u.id !== id));
            response.data = { user: deletedUser };
          } else {
            response.status = 404;
            response.data = { error: 'User not found' };
          }
        }
        break;
        
      default:
        response.status = 405;
        response.data = { error: 'Method not allowed' };
    }
    
    return response;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const response = simulateApiCall('POST', '/users', formData);
    setApiResponse(response);
    setFormData({ name: '', email: '' });
    setActiveTab('list');
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      const response = simulateApiCall('PUT', `/users/${selectedUser.id}`, formData);
      setApiResponse(response);
      setSelectedUser(null);
      setFormData({ name: '', email: '' });
      setActiveTab('list');
    }
  };

  const handleDeleteUser = (id: number) => {
    const response = simulateApiCall('DELETE', `/users/${id}`);
    setApiResponse(response);
  };

  const handleGetUser = (id: number) => {
    const response = simulateApiCall('GET', `/users/${id}`);
    setApiResponse(response);
    
    if (response.status === 200) {
      setSelectedUser(response.data.user);
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email
      });
      setActiveTab('edit');
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Exercício 4: API RESTful com PHP</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Implementação de uma API RESTful para gerenciamento de usuários com operações CRUD.
        </p>
      </div>
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('list')}
            className={`${
              activeTab === 'list'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Listar Usuários
          </button>
          <button
            onClick={() => {
              setActiveTab('create');
              setSelectedUser(null);
              setFormData({ name: '', email: '' });
            }}
            className={`${
              activeTab === 'create'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Criar Usuário
          </button>
          {selectedUser && (
            <button
              onClick={() => setActiveTab('edit')}
              className={`${
                activeTab === 'edit'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Editar Usuário
            </button>
          )}
        </nav>
      </div>
      
      {activeTab === 'list' && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Lista de Usuários</h3>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-sm text-gray-500 mb-2">Endpoint: <code>GET /users</code></p>
            <button
              onClick={() => setApiResponse(simulateApiCall('GET', '/users'))}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Executar GET /users
            </button>
          </div>
          
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nome</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{user.id}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleGetUser(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'create' && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Criar Novo Usuário</h3>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-sm text-gray-500">Endpoint: <code>POST /users</code></p>
          </div>
          
          <form onSubmit={handleCreateUser} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Criar Usuário
              </button>
            </div>
          </form>
        </div>
      )}
      
      {activeTab === 'edit' && selectedUser && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Usuário</h3>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-sm text-gray-500">Endpoint: <code>PUT /users/{selectedUser.id}</code></p>
          </div>
          
          <form onSubmit={handleUpdateUser} className="space-y-6">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="edit-name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="edit-email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Atualizar Usuário
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedUser(null);
                  setFormData({ name: '', email: '' });
                  setActiveTab('list');
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
      
      {apiResponse && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Resposta da API</h3>
          <div className={`p-4 rounded-md ${
            apiResponse.status >= 200 && apiResponse.status < 300
              ? 'bg-green-50'
              : 'bg-red-50'
          }`}>
            <p className="text-sm font-medium mb-2">
              Status: <span className={`${
                apiResponse.status >= 200 && apiResponse.status < 300
                  ? 'text-green-800'
                  : 'text-red-800'
              }`}>{apiResponse.status}</span>
            </p>
            <pre className="bg-white p-3 rounded border text-sm overflow-auto max-h-60">
              {JSON.stringify(apiResponse.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Implementação em PHP (Laravel)</h3>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium text-gray-900 mb-2">Modelo de Usuário</h4>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm">
            <pre>{`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class User extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'email'];
}`}</pre>
          </div>
          
          <h4 className="font-medium text-gray-900 mt-4 mb-2">Controller</h4>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm">
            <pre>{`<?php

namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }
    
    public function show($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        return response()->json($user);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
        ]);
        
        $user = User::create($validated);
        
        return response()->json($user, 201);
    }
    
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $id,
        ]);
        
        $user->update($validated);
        
        return response()->json($user);
    }
    
    public function destroy($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        $user->delete();
        
        return response()->json(['message' => 'User deleted successfully']);
    }
}`}</pre>
          </div>
          
          <h4 className="font-medium text-gray-900 mt-4 mb-2">Rotas</h4>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm">
            <pre>{`<?php

use App\\Http\\Controllers\\UserController;
use Illuminate\\Support\\Facades\\Route;

Route::prefix('api')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});`}</pre>
          </div>
          
          <h4 className="font-medium text-gray-900 mt-4 mb-2">Migração</h4>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm">
            <pre>{`<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('users');
    }
};`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestApiExercise;