export interface Filter {
  distance?: number;
  time?: { lower: number, upper: number };
  showSold?: boolean;
}
