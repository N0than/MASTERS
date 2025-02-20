import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { History, Target, TrendingUp } from 'lucide-react';

export function Predictions() {
  const predictions = [
    {
      id: '1',
      show: 'The Voice',
      channel: 'TF1',
      prediction: 4800000,
      actual: 5200000,
      date: '2025-03-15',
      accuracy: 92,
    },
    {
      id: '2',
      show: 'Koh-Lanta',
      channel: 'TF1',
      prediction: 3900000,
      actual: 3800000,
      date: '2025-03-14',
      accuracy: 97,
    },
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Mes Pronostics</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Target className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Précision moyenne</h3>
            </div>
            <p className="text-3xl font-bold">94.5%</p>
            <p className="text-sm text-green-400 mt-2">+2.3% cette semaine</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <History className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Total pronostics</h3>
            </div>
            <p className="text-3xl font-bold">47</p>
            <p className="text-sm text-gray-400 mt-2">Depuis le début</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Points gagnés</h3>
            </div>
            <p className="text-3xl font-bold">1,250</p>
            <p className="text-sm text-green-400 mt-2">+350 cette semaine</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Historique des pronostics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6">Émission</th>
                  <th className="text-left py-4 px-6">Chaîne</th>
                  <th className="text-left py-4 px-6">Date</th>
                  <th className="text-right py-4 px-6">Pronostic</th>
                  <th className="text-right py-4 px-6">Réel</th>
                  <th className="text-right py-4 px-6">Précision</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((prediction) => (
                  <tr key={prediction.id} className="border-b border-gray-700">
                    <td className="py-4 px-6">{prediction.show}</td>
                    <td className="py-4 px-6">{prediction.channel}</td>
                    <td className="py-4 px-6">
                      {new Date(prediction.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="text-right py-4 px-6">
                      {(prediction.prediction / 1000000).toFixed(1)}M
                    </td>
                    <td className="text-right py-4 px-6">
                      {(prediction.actual / 1000000).toFixed(1)}M
                    </td>
                    <td className="text-right py-4 px-6">
                      <span className={prediction.accuracy >= 95 ? 'text-green-400' : 'text-yellow-400'}>
                        {prediction.accuracy}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
