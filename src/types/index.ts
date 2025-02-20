export interface Show {
  id: string;
  title: string;
  channel: string;
  datetime: string;
  description: string;
  host: string;
  genre: string;
  imageUrl: string;
  expectedAudience?: number;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  score: number;
  predictions: number;
  accuracy: number;
  isOnline: boolean;
  currentPrediction?: {
    showId: string;
    prediction: number;
  };
  role?: 'user' | 'admin';
}

export interface Prediction {
  id: string;
  userId: string;
  showId: string;
  prediction: number;
  timestamp: string;
  accuracy?: number;
}

export interface AdminStats {
  totalUsers: number;
  totalPredictions: number;
  averageAccuracy: number;
  activePredictions: number;
}
