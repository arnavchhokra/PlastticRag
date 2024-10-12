
export interface FacialFeatures {
    nose: number;
    lips: number;
    eyes: number;
    cheekbones: number;
    jawline: number;
  }

export interface ApiResponse {
    status: number;
    facialFeatures: FacialFeatures;
    improvementTips: string[];
    doctorImprovements: string[];
  }


export interface FeatureCardProps {
  feature: string;
  value: number;
}

