import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Bell, Lock, User, Globe, Eye, Moon } from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState({
    newPredictions: true,
    friendActivity: true,
    results: true,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showPredictions: true,
    showStats: true,
  });

  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Paramètres</h1>

        <div className="grid grid-cols-1 gap-8">
          <section className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <User className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-bold">Profil</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photo de profil
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                    Modifier
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  defaultValue="JohnDoe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  defaultValue="john@example.com"
                />
              </div>
            </div>
          </section>

          <section className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <Bell className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-300">
                    {key === 'newPredictions' && 'Nouvelles prédictions disponibles'}
                    {key === 'friendActivity' && 'Activité des amis'}
                    {key === 'results' && 'Résultats des pronostics'}
                  </span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <Lock className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-bold">Confidentialité</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-300">
                    {key === 'publicProfile' && 'Profil public'}
                    {key === 'showPredictions' && 'Afficher mes pronostics'}
                    {key === 'showStats' && 'Afficher mes statistiques'}
                  </span>
                  <button
                    onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
