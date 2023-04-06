export interface CakeTypeAttributes {
  id: number;
  name: string;
  value: string;
  accessible: boolean;
  customizable: boolean;
  description?: string;
}

export interface AddTypeInput {
  name: string;
  value: string;
  accessible: boolean;
  customizable: boolean;
  description?: string;
}

export interface UpdateTypeProps {
  name?: string;
  accessible?: boolean;
  customizable?: boolean;
  description?: string;
}
