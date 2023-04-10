export interface CakeFlavourAttributes {
  id: number;
  name: string;
  value: string;
  accessible: boolean;
}

export interface AddTypeInput {
  name: string;
  value: string;
  accessible: boolean;
}

export interface UpdateTypeProps {
  name?: string;
  accessible?: boolean;
}
