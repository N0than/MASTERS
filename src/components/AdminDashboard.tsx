import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { PlusCircle, Trash2, Edit, BarChart2, Users, Download } from 'lucide-react';
import type { Show, AdminStats } from '../types';

const mockStats: AdminStats = {
  totalUsers: 1250,
  totalPredictions: 45678,
  averageAccuracy: 0.76,
  activePredictions: 890
};

const mockShows: Show[] = [
  {
    id: '1',
    title: 'The Voice - La finale',
    channel: 'TF1',
    datetime: '2025-03-15T20:50:00',
    description: 'La grande finale de The Voice 2025 !',
    host: 'Nikos Aliagas',
    genre: 'Divertissement',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81'
  }
];

export function AdminDashboard() {
  const [shows, setShows] = useState<Show[]>(mockShows);
  const [stats] = useState<AdminStats>(mockStats);
  const [showForm, setShowForm] = useState(false);
  const [newShow, setNewShow] = useState<Show>({
    id: '',
    title: '',
    channel: '',
    datetime: '',
    description: '',
    host: '',
    genre: '',
    imageUrl: ''
  });

  const handleAddShow = () => {
    if (newShow.title && newShow.channel && newShow.datetime && newShow.description && newShow.host && newShow.genre && newShow.imageUrl) {
      const newId = String(shows.length + 1);
      setShows([...shows, { ...newShow, id: newId }]);
      setNewShow({
        id: '',
        title: '',
        channel: '',
        datetime: '',
        description: '',
        host: '',
        genre: '',
        imageUrl: ''
      });
      setShowForm(false);
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  const handleDownload = () => {
    const data = JSON.stringify({ stats, shows }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audiencemasters-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Users className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Utilisateurs</h3>
            </div>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <BarChart2 className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Prédictions</h3>
            </div>
            <p className="text-3xl font-bold">{stats.totalPredictions}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <BarChart2 className="w-8 h-8 text-green-500" />
              <h3 className="text-lg font-medium">Précision moyenne</h3>
            </div>
            <p className="text-3xl font-bold">{(stats.averageAccuracy * 100).toFixed(1)}%</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <BarChart2 className="w-8 h-8 text-blue-500" />
              <h3 className="text-lg font-medium">Prédictions actives</h3>
            </div>
            <p className="text-3xl font-bold">{stats.activePredictions}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Programmes TV</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 dark:border-gray-300">
                  <th className="text-left py-4 px-6">Titre</th>
                  <th className="text-left py-4 px-6">Chaîne</th>
                  <th className="text-left py-4 px-6">Date</th>
                  <th className="text-left py-4 px-6">Genre</th>
                  <th className="text-right py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shows.map((show) => (
                  <tr key={show.id} className="border-b border-gray-700 dark:border-gray-300">
                    <td className="py-4 px-6">{show.title}</td>
                    <td className="py-4 px-6">{show.channel}</td>
                    <td className="py-4 px-6">
                      {new Date(show.datetime).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-6">{show.genre}</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg transition-colors">
                          <Edit className="w-5 h-5 text-white dark:text-gray-900" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5 text-red-500 dark:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Ajouter un nouveau programme</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 dark:text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  id="title"
                  value={newShow.title}
                  onChange={(e) => setNewShow({ ...newShow, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="channel" className="block text-sm font-medium text-gray-300 dark:text-gray-700">
                  Chaîne
                </label>
                <input
                  type="text"
                  id="channel"
                  value={newShow.channel}
                  onChange={(e) => setNewShow({ ...newShow, channel: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="datetime" className="block text-sm font-medium text-gray-300 dark:text-gray-700">
                  Date et Heure
                </label>
                <input
                  type="datetime-local"
                  id="datetime"
                  value={newShow.datetime}
                  onChange={(e) => setNewShow({ ...newShow, datetime: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 dark:text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newShow.description}
                  onChange={(e) => setNewShow({ ...newShow, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="host" className="block text-sm font-medium text-gray-300 dark:text-gray-700">
                  Hôte
                </label>
                <input
                  type="text"
                  id="host"
                  value={newShow.host}
                  onChange={(e) => setNewShow({ ...newShow, host: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-300 dark:text-gray-700">
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  value={newShow.genre}
                  onChange={(e) => setNewShow({ ...newShow, genre: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 dark:text-gray-700">
                  URL de l'image
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={newShow.imageUrl}
                  onChange={(e) => setNewShow({ ...newShow, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleAddShow}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors"
              >
                Ajouter le programme
              </button>
            </form>
          </div>
        )}

        {!showForm && (
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Nouveau programme
            </button>
          </div>
        )}

        <div className="flex items-center justify-center mt-8">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
          >
            <Download className="w-5 h-5" />
            Exporter les données
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
