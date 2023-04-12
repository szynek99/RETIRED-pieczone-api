export interface CakeFlavourAttributes {
  id: number;
  name: string;
  value: string;
  accessible: boolean;
}

export interface AddFlavourInput {
  name: string;
  value: string;
  accessible: boolean;
}

export interface UpdateFlavourProps {
  name?: string;
  accessible?: boolean;
}
