import React, { useState } from 'react';
import type { Show } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ShowCardProps {
  show: Show;
  theme: 'dark' | 'light';
}

export function ShowCard({ show, theme }: ShowCardProps) {
  const [prediction, setPrediction] = useState<number>(0);
  const [isPredicted, setIsPredicted] = useState<boolean>(false);

  const handlePredictionChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setPrediction(value * 250000);
    }
  };

  const handleValidatePrediction = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Vous devez être connecté pour faire un pronostic');
        return;
      }

      const { error } = await supabase
        .from('predictions')
        .insert([
          {
            user_id: user.id,
            show_id: show.id,
            prediction_value: prediction,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setIsPredicted(true);
      toast.success('Pronostic enregistré avec succès !');
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement du pronostic');
      console.error('Error:', error);
    }
  };

  const cardBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const sliderTrackColor = theme === 'dark' ? '#4B5563' : '#E5E7EB';
  const sliderHandleColor = theme === 'dark' ? '#8B5CF6' : '#6D28D9';

  return (
    <div className={`${cardBgColor} rounded-xl overflow-hidden shadow-lg transition-all duration-200`}>
      <img
        src={show.imageUrl}
        alt={show.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-purple-500">{show.channel}</span>
          <div className="flex items-center text-gray-400 text-sm">
            <span>
              {new Date(show.datetime).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
        <h3 className={`text-lg font-semibold ${textColor} mb-3`}>{show.title}</h3>
        <p className="text-sm text-gray-400 mb-6">{show.description}</p>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className={`text-sm font-medium ${textColor}`}>Audience prédite</span>
              <span className="text-sm text-purple-500 font-medium">
                {(prediction / 1000000).toFixed(2)}M
              </span>
            </div>
            
            <div className="px-2">
              <Slider
                min={0}
                max={40}
                step={0.1}
                value={prediction / 250000}
                onChange={handlePredictionChange}
                disabled={isPredicted}
                railStyle={{ backgroundColor: sliderTrackColor }}
                trackStyle={{ backgroundColor: sliderHandleColor }}
                handleStyle={{
                  borderColor: sliderHandleColor,
                  backgroundColor: sliderHandleColor
                }}
              />
              
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>0M</span>
                <span>2.5M</span>
                <span>5M</span>
                <span>7.5M</span>
                <span>10M</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleValidatePrediction}
            disabled={isPredicted}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              isPredicted
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isPredicted ? 'Pronostic validé ✓' : 'Valider mon pronostic'}
          </button>
        </div>
      </div>
    </div>
  );
}
