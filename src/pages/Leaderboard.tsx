import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { Trophy, Target, Medal } from 'lucide-react';

export function Leaderboard() {
  const users = [
    {
      rank: 1,
      username: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      score: 1250,
      accuracy: 94.5,
      predictions: 47,
    },
    {
      rank: 2,
      username: 'Thomas Dubois',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      score: 1180,
      accuracy: 92.8,
      predictions: 45,
    },
    {
      rank: 3,
      username: 'Marie Lambert',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      score: 1150,
      accuracy: 91.2,
      predictions: 42,
    },
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Classement des joueurs</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h3 className="text-lg font-medium">Meilleur score</h3>
            </div>
            <p className="text-3xl font-bold">1,250</p>
            <p className="text-sm text-gray-400 mt-2">Sophie Martin</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Target className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Meilleure précision</h3>
            </div>
            <p className="text-3xl font-bold">94.5%</p>
            <p className="text-sm text-gray-400 mt-2">Sophie Martin</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Medal className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Plus de pronostics</h3>
            </div>
            <p className="text-3xl font-bold">47</p>
            <p className="text-sm text-gray-400 mt-2">Sophie Martin</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Top joueurs</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-xl font-bold ${
                    user.rank === 1 ? 'text-yellow-500' :
                    user.rank === 2 ? 'text-gray-400' :
                    user.rank === 3 ? 'text-amber-600' :
                    'text-gray-500'
                  }`}>
                    #{user.rank}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.username}</span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-bold">{user.score}</p>
                    <p className="text-sm text-gray-400">points</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{user.accuracy}%</p>
                    <p className="text-sm text-gray-400">précision</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{user.predictions}</p>
                    <p className="text-sm text-gray-400">pronostics</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
