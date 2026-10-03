export interface Pharmacy {
  id: string;
  name: string;
  distance: string;
  status: string;
  mapsQuery: string;
}

export const demoPharmacies: Pharmacy[] = [
  {
    id: 'medplus-bengaluru',
    name: 'MedPlus Pharmacy',
    distance: '0.8 km',
    status: 'Open now',
    mapsQuery: 'MedPlus Pharmacy Bengaluru',
  },
  {
    id: 'apollo-bengaluru',
    name: 'Apollo Pharmacy',
    distance: '1.4 km',
    status: 'Open now',
    mapsQuery: 'Apollo Pharmacy Bengaluru',
  },
];
