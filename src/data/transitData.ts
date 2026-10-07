import { BusStop, BusService, MrtLine, ServiceAlert } from '../types/transit';

export const MRT_LINES: MrtLine[] = [
  {
    code: 'NEL',
    name: 'North East Line',
    hexColor: '#7B1FA2',
    textColor: '#FFFFFF',
    terminusA: 'HarbourFront',
    terminusB: 'Punggol',
    stations: [
      {
        code: 'NE1',
        name: 'HarbourFront',
        transfers: [{ lineCode: 'CCL', code: 'CC29' }],
        platformA: { destination: 'Punggol', intervalMin: 3 },
        platformB: { destination: 'Terminating Train', intervalMin: 0 },
        exits: ['Exit A (Telok Blangah Rd)', 'Exit B (HarbourFront Centre)', 'Exit C (VivoCity / Sentosa)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'HarbourFront Bus Interchange'
      },
      {
        code: 'NE3',
        name: 'Outram Park',
        transfers: [{ lineCode: 'EWL', code: 'EW16' }, { lineCode: 'TEL', code: 'TE17' }],
        platformA: { destination: 'Punggol', intervalMin: 3 },
        platformB: { destination: 'HarbourFront', intervalMin: 3 },
        exits: ['Exit 1 (SGH Complex)', 'Exit 3 (Pearl Bank)', 'Exit 7 (Cantonment Rd)'],
        wheelchairAccessible: true
      },
      {
        code: 'NE4',
        name: 'Chinatown',
        transfers: [{ lineCode: 'DTL', code: 'DT19' }],
        platformA: { destination: 'Punggol', intervalMin: 3 },
        platformB: { destination: 'HarbourFront', intervalMin: 3 },
        exits: ['Exit A (Pagoda St)', 'Exit C (People\'s Park Complex)', 'Exit E (Chinatown Point)'],
        wheelchairAccessible: true
      },
      {
        code: 'NE5',
        name: 'Clarke Quay',
        transfers: [],
        platformA: { destination: 'Punggol', intervalMin: 3 },
        platformB: { destination: 'HarbourFront', intervalMin: 3 },
        exits: ['Exit A (The Central)', 'Exit C (Eu Tong Sen St)'],
        wheelchairAccessible: true
      },
      {
        code: 'NE6',
        name: 'Dhoby Ghaut',
        transfers: [{ lineCode: 'NSL', code: 'NS24' }, { lineCode: 'CCL', code: 'CC1' }],
        platformA: { destination: 'Punggol', intervalMin: 2 },
        platformB: { destination: 'HarbourFront', intervalMin: 2 },
        exits: ['Exit A (Plaza Singapura)', 'Exit B (Penang Rd)', 'Exit C (The Cathay)'],
        wheelchairAccessible: true
      },
      {
        code: 'NE7',
        name: 'Little India',
        transfers: [{ lineCode: 'DTL', code: 'DT12' }],
        platformA: { destination: 'Punggol', intervalMin: 3 },
        platformB: { destination: 'HarbourFront', intervalMin: 3 },
        exits: ['Exit A (Tekka Market)', 'Exit B (Bukit Timah Rd)', 'Exit C (Race Course Rd)'],
        wheelchairAccessible: true
      },
      {
        code: 'NE8',
        name: 'Farrer Park',
        transfers: [],
        platformA: { destination: 'Punggol', intervalMin: 3 },
        platformB: { destination: 'HarbourFront', intervalMin: 3 },
        exits: ['Exit A (Connexion)', 'Exit I (City Square Mall)'],
        wheelchairAccessible: true
      },
      {
        code: 'NE12',
        name: 'Serangoon',
        transfers: [{ lineCode: 'CCL', code: 'CC13' }],
        platformA: { destination: 'Punggol', intervalMin: 3 },
        platformB: { destination: 'HarbourFront', intervalMin: 3 },
        exits: ['Exit A (NEX Mall)', 'Exit B (Upper Serangoon Rd)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Serangoon Bus Interchange'
      },
      {
        code: 'NE14',
        name: 'Hougang',
        transfers: [],
        platformA: { destination: 'Punggol', intervalMin: 3 },
        platformB: { destination: 'HarbourFront', intervalMin: 3 },
        exits: ['Exit A (Hougang Mall)', 'Exit B (Hougang Central)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Hougang Central Bus Interchange'
      },
      {
        code: 'NE17',
        name: 'Punggol',
        transfers: [],
        platformA: { destination: 'Terminating Train', intervalMin: 0 },
        platformB: { destination: 'HarbourFront', intervalMin: 3 },
        exits: ['Exit A (Waterway Point)', 'Exit C (Punggol Central)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Punggol Bus Interchange'
      }
    ]
  },
  {
    code: 'DTL',
    name: 'Downtown Line',
    hexColor: '#005BAA',
    textColor: '#FFFFFF',
    terminusA: 'Bukit Panjang',
    terminusB: 'Expo',
    stations: [
      {
        code: 'DT1',
        name: 'Bukit Panjang',
        transfers: [],
        platformA: { destination: 'Expo', intervalMin: 3 },
        platformB: { destination: 'Terminating Train', intervalMin: 0 },
        exits: ['Exit A (Hillion Mall)', 'Exit B (Bukit Panjang Plaza)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Bukit Panjang Integrated Transport Hub'
      },
      {
        code: 'DT9',
        name: 'Botanic Gardens',
        transfers: [{ lineCode: 'CCL', code: 'CC19' }],
        platformA: { destination: 'Expo', intervalMin: 3 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 3 },
        exits: ['Exit A (Eco Lake / UNESCO Gardens)', 'Exit B (Bukit Timah Rd)'],
        wheelchairAccessible: true
      },
      {
        code: 'DT12',
        name: 'Little India',
        transfers: [{ lineCode: 'NEL', code: 'NE7' }],
        platformA: { destination: 'Expo', intervalMin: 3 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 3 },
        exits: ['Exit A (Tekka Centre)', 'Exit E (Buffalo Rd)'],
        wheelchairAccessible: true
      },
      {
        code: 'DT14',
        name: 'Bugis',
        transfers: [{ lineCode: 'EWL', code: 'EW12' }],
        platformA: { destination: 'Expo', intervalMin: 2.5 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 2.5 },
        exits: ['Exit B (Bugis Junction)', 'Exit D (DUO Tower / Victoria St)'],
        wheelchairAccessible: true
      },
      {
        code: 'DT16',
        name: 'Bayfront',
        transfers: [{ lineCode: 'CCL', code: 'CE1' }],
        platformA: { destination: 'Expo', intervalMin: 3 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 3 },
        exits: ['Exit B (Gardens by the Bay)', 'Exit D (Marina Bay Sands Expo)'],
        wheelchairAccessible: true
      },
      {
        code: 'DT17',
        name: 'Downtown',
        transfers: [],
        platformA: { destination: 'Expo', intervalMin: 3 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 3 },
        exits: ['Exit A (Marina Bay Financial Centre)', 'Exit C (Central Blvd)'],
        wheelchairAccessible: true
      },
      {
        code: 'DT19',
        name: 'Chinatown',
        transfers: [{ lineCode: 'NEL', code: 'NE4' }],
        platformA: { destination: 'Expo', intervalMin: 3 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 3 },
        exits: ['Exit E (Chinatown Point)', 'Exit F (Hong Lim Complex)'],
        wheelchairAccessible: true
      },
      {
        code: 'DT21',
        name: 'Bencoolen',
        transfers: [],
        platformA: { destination: 'Expo', intervalMin: 3 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 3 },
        exits: ['Exit A (NAFA Campus)', 'Exit B (Hotel Rendezvous / Bras Basah)'],
        wheelchairAccessible: true
      },
      {
        code: 'DT32',
        name: 'Tampines',
        transfers: [{ lineCode: 'EWL', code: 'EW2' }],
        platformA: { destination: 'Expo', intervalMin: 3 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 3 },
        exits: ['Exit A (Tampines Mall)', 'Exit D (Our Tampines Hub)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Tampines Bus Interchange'
      },
      {
        code: 'DT35',
        name: 'Expo',
        transfers: [{ lineCode: 'EWL', code: 'CG1' }],
        platformA: { destination: 'Terminating Train', intervalMin: 0 },
        platformB: { destination: 'Bukit Panjang', intervalMin: 3 },
        exits: ['Exit A (Singapore EXPO Halls)', 'Exit B (Changi City Point)'],
        wheelchairAccessible: true
      }
    ]
  },
  {
    code: 'EWL',
    name: 'East West Line',
    hexColor: '#009640',
    textColor: '#FFFFFF',
    terminusA: 'Pasir Ris',
    terminusB: 'Tuas Link',
    stations: [
      {
        code: 'EW1',
        name: 'Pasir Ris',
        transfers: [],
        platformA: { destination: 'Tuas Link', intervalMin: 2.5 },
        platformB: { destination: 'Terminating Train', intervalMin: 0 },
        exits: ['Exit A (White Sands)', 'Exit B (Pasir Ris Central)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Pasir Ris Bus Interchange'
      },
      {
        code: 'EW2',
        name: 'Tampines',
        transfers: [{ lineCode: 'DTL', code: 'DT32' }],
        platformA: { destination: 'Tuas Link', intervalMin: 2.5 },
        platformB: { destination: 'Pasir Ris', intervalMin: 2.5 },
        exits: ['Exit A (Tampines 1)', 'Exit B (Tampines Bus Int)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Tampines Bus Interchange'
      },
      {
        code: 'EW12',
        name: 'Bugis',
        transfers: [{ lineCode: 'DTL', code: 'DT14' }],
        platformA: { destination: 'Tuas Link', intervalMin: 2 },
        platformB: { destination: 'Pasir Ris', intervalMin: 2 },
        exits: ['Exit A (Victoria St)', 'Exit C (Bugis Street Market)'],
        wheelchairAccessible: true
      },
      {
        code: 'EW13',
        name: 'City Hall',
        transfers: [{ lineCode: 'NSL', code: 'NS25' }],
        platformA: { destination: 'Tuas Link', intervalMin: 2 },
        platformB: { destination: 'Pasir Ris', intervalMin: 2 },
        exits: ['Exit A (Raffles City)', 'Exit B (St Andrew\'s Cathedral)'],
        wheelchairAccessible: true
      },
      {
        code: 'EW14',
        name: 'Raffles Place',
        transfers: [{ lineCode: 'NSL', code: 'NS26' }],
        platformA: { destination: 'Tuas Link', intervalMin: 2 },
        platformB: { destination: 'Pasir Ris', intervalMin: 2 },
        exits: ['Exit A (Battery Rd)', 'Exit B (Republic Plaza)', 'Exit H (Fullerton Sq)'],
        wheelchairAccessible: true
      },
      {
        code: 'EW16',
        name: 'Outram Park',
        transfers: [{ lineCode: 'NEL', code: 'NE3' }, { lineCode: 'TEL', code: 'TE17' }],
        platformA: { destination: 'Tuas Link', intervalMin: 2.5 },
        platformB: { destination: 'Pasir Ris', intervalMin: 2.5 },
        exits: ['Exit A (Outram Rd)', 'Exit H (Singapore General Hospital)'],
        wheelchairAccessible: true
      },
      {
        code: 'EW21',
        name: 'Buona Vista',
        transfers: [{ lineCode: 'CCL', code: 'CC22' }],
        platformA: { destination: 'Tuas Link', intervalMin: 2.5 },
        platformB: { destination: 'Pasir Ris', intervalMin: 2.5 },
        exits: ['Exit A (The Star Vista)', 'Exit B (Metropolis One-North)'],
        wheelchairAccessible: true
      },
      {
        code: 'EW24',
        name: 'Jurong East',
        transfers: [{ lineCode: 'NSL', code: 'NS1' }],
        platformA: { destination: 'Tuas Link', intervalMin: 2.5 },
        platformB: { destination: 'Pasir Ris', intervalMin: 2.5 },
        exits: ['Exit A (JEM / Westgate)', 'Exit D (Jurong East Bus Int)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Jurong East Bus Interchange'
      }
    ]
  },
  {
    code: 'NSL',
    name: 'North South Line',
    hexColor: '#D42E12',
    textColor: '#FFFFFF',
    terminusA: 'Jurong East',
    terminusB: 'Marina South Pier',
    stations: [
      {
        code: 'NS1',
        name: 'Jurong East',
        transfers: [{ lineCode: 'EWL', code: 'EW24' }],
        platformA: { destination: 'Marina South Pier', intervalMin: 2.5 },
        platformB: { destination: 'Terminating Train', intervalMin: 0 },
        exits: ['Exit A (Westgate)', 'Exit C (IMM Mall Connector)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Jurong East Bus Interchange'
      },
      {
        code: 'NS9',
        name: 'Woodlands',
        transfers: [{ lineCode: 'TEL', code: 'TE2' }],
        platformA: { destination: 'Marina South Pier', intervalMin: 2.5 },
        platformB: { destination: 'Jurong East', intervalMin: 2.5 },
        exits: ['Exit 1 (Causeway Point)', 'Exit 3 (Woodlands Civic Centre)'],
        wheelchairAccessible: true,
        busInterchangeNearby: 'Woodlands Integrated Transport Hub'
      },
      {
        code: 'NS22',
        name: 'Orchard',
        transfers: [{ lineCode: 'TEL', code: 'TE14' }],
        platformA: { destination: 'Marina South Pier', intervalMin: 2 },
        platformB: { destination: 'Jurong East', intervalMin: 2 },
        exits: ['Exit A (ION Orchard)', 'Exit B (Wisma Atria)', 'Exit D (Lucky Plaza)'],
        wheelchairAccessible: true
      },
      {
        code: 'NS24',
        name: 'Dhoby Ghaut',
        transfers: [{ lineCode: 'NEL', code: 'NE6' }, { lineCode: 'CCL', code: 'CC1' }],
        platformA: { destination: 'Marina South Pier', intervalMin: 2 },
        platformB: { destination: 'Jurong East', intervalMin: 2 },
        exits: ['Exit A (Plaza Singapura)', 'Exit C (Istana Park)'],
        wheelchairAccessible: true
      },
      {
        code: 'NS25',
        name: 'City Hall',
        transfers: [{ lineCode: 'EWL', code: 'EW13' }],
        platformA: { destination: 'Marina South Pier', intervalMin: 2 },
        platformB: { destination: 'Jurong East', intervalMin: 2 },
        exits: ['Exit A (Capitol Piazza)', 'Exit B (National Gallery)'],
        wheelchairAccessible: true
      },
      {
        code: 'NS26',
        name: 'Raffles Place',
        transfers: [{ lineCode: 'EWL', code: 'EW14' }],
        platformA: { destination: 'Marina South Pier', intervalMin: 2 },
        platformB: { destination: 'Jurong East', intervalMin: 2 },
        exits: ['Exit A (Chevron House)', 'Exit D (Ocean Financial Centre)'],
        wheelchairAccessible: true
      },
      {
        code: 'NS27',
        name: 'Marina Bay',
        transfers: [{ lineCode: 'TEL', code: 'TE20' }, { lineCode: 'CCL', code: 'CE2' }],
        platformA: { destination: 'Marina South Pier', intervalMin: 3 },
        platformB: { destination: 'Jurong East', intervalMin: 3 },
        exits: ['Exit A (Marina Bay Residences)', 'Exit B (Marina One)'],
        wheelchairAccessible: true
      }
    ]
  },
  {
    code: 'TEL',
    name: 'Thomson-East Coast Line',
    hexColor: '#9D5B25',
    textColor: '#FFFFFF',
    terminusA: 'Woodlands North',
    terminusB: 'Bayshore',
    stations: [
      {
        code: 'TE2',
        name: 'Woodlands',
        transfers: [{ lineCode: 'NSL', code: 'NS9' }],
        platformA: { destination: 'Bayshore', intervalMin: 3.5 },
        platformB: { destination: 'Woodlands North', intervalMin: 4 },
        exits: ['Exit 4 (Woodlands Square)', 'Exit 7 (Causeway Point)'],
        wheelchairAccessible: true
      },
      {
        code: 'TE9',
        name: 'Caldecott',
        transfers: [{ lineCode: 'CCL', code: 'CC17' }],
        platformA: { destination: 'Bayshore', intervalMin: 3.5 },
        platformB: { destination: 'Woodlands North', intervalMin: 3.5 },
        exits: ['Exit 1 (Toa Payoh Rise)', 'Exit 4 (Lions Home)'],
        wheelchairAccessible: true
      },
      {
        code: 'TE14',
        name: 'Orchard',
        transfers: [{ lineCode: 'NSL', code: 'NS22' }],
        platformA: { destination: 'Bayshore', intervalMin: 3.5 },
        platformB: { destination: 'Woodlands North', intervalMin: 3.5 },
        exits: ['Exit 11 (Wheelock Place)', 'Exit 13 (Orchard Blvd)'],
        wheelchairAccessible: true
      },
      {
        code: 'TE17',
        name: 'Outram Park',
        transfers: [{ lineCode: 'NEL', code: 'NE3' }, { lineCode: 'EWL', code: 'EW16' }],
        platformA: { destination: 'Bayshore', intervalMin: 3.5 },
        platformB: { destination: 'Woodlands North', intervalMin: 3.5 },
        exits: ['Exit 9 (Police Cantonment Complex)', 'Exit 11 (Teo Hong Rd)'],
        wheelchairAccessible: true
      },
      {
        code: 'TE20',
        name: 'Marina South Pier',
        transfers: [{ lineCode: 'NSL', code: 'NS28' }],
        platformA: { destination: 'Bayshore', intervalMin: 4 },
        platformB: { destination: 'Woodlands North', intervalMin: 4 },
        exits: ['Exit 1 (Marina South Ferry Terminal)'],
        wheelchairAccessible: true
      },
      {
        code: 'TE26',
        name: 'Marine Parade',
        transfers: [],
        platformA: { destination: 'Bayshore', intervalMin: 4 },
        platformB: { destination: 'Woodlands North', intervalMin: 4 },
        exits: ['Exit 1 (Marine Parade Central)', 'Exit 2 (Parkway Parade Mall)'],
        wheelchairAccessible: true
      }
    ]
  },
  {
    code: 'CCL',
    name: 'Circle Line',
    hexColor: '#FF9E1B',
    textColor: '#FFFFFF',
    terminusA: 'Dhoby Ghaut / Marina Bay',
    terminusB: 'HarbourFront',
    stations: [
      {
        code: 'CC1',
        name: 'Dhoby Ghaut',
        transfers: [{ lineCode: 'NSL', code: 'NS24' }, { lineCode: 'NEL', code: 'NE6' }],
        platformA: { destination: 'HarbourFront', intervalMin: 3.5 },
        platformB: { destination: 'Terminating Train', intervalMin: 0 },
        exits: ['Exit A (Plaza Singapura)', 'Exit F (Handy Rd)'],
        wheelchairAccessible: true
      },
      {
        code: 'CC2',
        name: 'Bras Basah',
        transfers: [],
        platformA: { destination: 'HarbourFront', intervalMin: 3.5 },
        platformB: { destination: 'Dhoby Ghaut', intervalMin: 3.5 },
        exits: ['Exit A (Singapore Art Museum)', 'Exit B (SMU Campus)'],
        wheelchairAccessible: true
      },
      {
        code: 'CC13',
        name: 'Serangoon',
        transfers: [{ lineCode: 'NEL', code: 'NE12' }],
        platformA: { destination: 'HarbourFront', intervalMin: 3.5 },
        platformB: { destination: 'Dhoby Ghaut', intervalMin: 3.5 },
        exits: ['Exit B (NEX)', 'Exit C (Serangoon Central)'],
        wheelchairAccessible: true
      },
      {
        code: 'CC22',
        name: 'Buona Vista',
        transfers: [{ lineCode: 'EWL', code: 'EW21' }],
        platformA: { destination: 'HarbourFront', intervalMin: 3.5 },
        platformB: { destination: 'Dhoby Ghaut', intervalMin: 3.5 },
        exits: ['Exit C (Ministry of Education)', 'Exit D (Star Performing Arts)'],
        wheelchairAccessible: true
      },
      {
        code: 'CC29',
        name: 'HarbourFront',
        transfers: [{ lineCode: 'NEL', code: 'NE1' }],
        platformA: { destination: 'Terminating Train', intervalMin: 0 },
        platformB: { destination: 'Dhoby Ghaut', intervalMin: 3.5 },
        exits: ['Exit B (HarbourFront Tower)', 'Exit D (VivoCity Level 1)'],
        wheelchairAccessible: true
      }
    ]
  }
];

export const BUS_STOPS: BusStop[] = [
  {
    code: '04121',
    description: 'Old Hill St Police Stn',
    roadName: 'Hill St',
    mrtConnections: [
      { lineCode: 'NEL', stationCode: 'NE5', stationName: 'Clarke Quay' },
      { lineCode: 'DTL', stationCode: 'DT20', stationName: 'Fort Canning' }
    ],
    services: ['7', '124', '147', '166', '174', '175', '190'],
    lat: 1.2907,
    lng: 103.8488,
    isInterchange: false
  },
  {
    code: '03223',
    description: 'Opp Hong Lim Cplx',
    roadName: 'Upper Cross St',
    mrtConnections: [
      { lineCode: 'NEL', stationCode: 'NE4', stationName: 'Chinatown' },
      { lineCode: 'DTL', stationCode: 'DT19', stationName: 'Chinatown' }
    ],
    services: ['147', '190', '65', '857', '12e', 'CT8'],
    lat: 1.2854,
    lng: 103.8465,
    isInterchange: false
  },
  {
    code: '01012',
    description: 'Hotel Rendezvous',
    roadName: 'Bras Basah Rd',
    mrtConnections: [
      { lineCode: 'DTL', stationCode: 'DT21', stationName: 'Bencoolen' },
      { lineCode: 'CCL', stationCode: 'CC2', stationName: 'Bras Basah' },
      { lineCode: 'NSL', stationCode: 'NS24', stationName: 'Dhoby Ghaut' }
    ],
    services: ['65', '147', '857', '174'],
    lat: 1.2978,
    lng: 103.8504,
    isInterchange: false
  },
  {
    code: '08057',
    description: 'Dhoby Ghaut Stn',
    roadName: 'Orchard Rd',
    mrtConnections: [
      { lineCode: 'NSL', stationCode: 'NS24', stationName: 'Dhoby Ghaut' },
      { lineCode: 'NEL', stationCode: 'NE6', stationName: 'Dhoby Ghaut' },
      { lineCode: 'CCL', stationCode: 'CC1', stationName: 'Dhoby Ghaut' }
    ],
    services: ['190', '65', '174', '502'],
    lat: 1.2994,
    lng: 103.8458,
    isInterchange: false
  },
  {
    code: '04179',
    description: 'Raffles Place Stn Exit F',
    roadName: 'Battery Rd',
    mrtConnections: [
      { lineCode: 'NSL', stationCode: 'NS26', stationName: 'Raffles Place' },
      { lineCode: 'EWL', stationCode: 'EW14', stationName: 'Raffles Place' }
    ],
    services: ['10', '190', '502', '12e'],
    lat: 1.2848,
    lng: 103.8519,
    isInterchange: false
  },
  {
    code: '09048',
    description: 'Orchard Stn / Lucky Plaza',
    roadName: 'Orchard Rd',
    mrtConnections: [
      { lineCode: 'NSL', stationCode: 'NS22', stationName: 'Orchard' },
      { lineCode: 'TEL', stationCode: 'TE14', stationName: 'Orchard' }
    ],
    services: ['190', '65', '174', '502', 'CT8'],
    lat: 1.3043,
    lng: 103.8344,
    isInterchange: false
  },
  {
    code: '14119',
    description: 'HarbourFront Stn / VivoCity',
    roadName: 'Telok Blangah Rd',
    mrtConnections: [
      { lineCode: 'NEL', stationCode: 'NE1', stationName: 'HarbourFront' },
      { lineCode: 'CCL', stationCode: 'CC29', stationName: 'HarbourFront' }
    ],
    services: ['10', '65', '147', '61'],
    lat: 1.2652,
    lng: 103.8219,
    isInterchange: true
  },
  {
    code: '03071',
    description: 'Clarke Quay Stn',
    roadName: 'Eu Tong Sen St',
    mrtConnections: [
      { lineCode: 'NEL', stationCode: 'NE5', stationName: 'Clarke Quay' }
    ],
    services: ['147', '190', '61', '174', 'CT8'],
    lat: 1.2885,
    lng: 103.8471,
    isInterchange: false
  },
  {
    code: '03539',
    description: 'Marina Bay Sands MICE',
    roadName: 'Bayfront Ave',
    mrtConnections: [
      { lineCode: 'DTL', stationCode: 'DT16', stationName: 'Bayfront' },
      { lineCode: 'CCL', stationCode: 'CE1', stationName: 'Bayfront' }
    ],
    services: ['857', '502', '10'],
    lat: 1.2831,
    lng: 103.8588,
    isInterchange: false
  },
  {
    code: '65009',
    description: 'Tampines Interchange',
    roadName: 'Tampines Ave 4',
    mrtConnections: [
      { lineCode: 'EWL', stationCode: 'EW2', stationName: 'Tampines' },
      { lineCode: 'DTL', stationCode: 'DT32', stationName: 'Tampines' }
    ],
    services: ['65', '10', '12e'],
    lat: 1.3533,
    lng: 103.9438,
    isInterchange: true
  },
  {
    code: '28009',
    description: 'Jurong East Interchange',
    roadName: 'Jurong Gateway Rd',
    mrtConnections: [
      { lineCode: 'NSL', stationCode: 'NS1', stationName: 'Jurong East' },
      { lineCode: 'EWL', stationCode: 'EW24', stationName: 'Jurong East' }
    ],
    services: ['502', '190', '61'],
    lat: 1.3331,
    lng: 103.7423,
    isInterchange: true
  }
];

export const BUS_SERVICES: BusService[] = [
  {
    serviceNo: '147',
    operator: 'SBST',
    category: 'Normal',
    originCode: '64009',
    originName: 'Hougang Central Int',
    destinationCode: '17009',
    destinationName: 'Clementi Int',
    frequencyRange: '5 - 8 mins',
    firstBus: '05:30',
    lastBus: '23:45',
    stops: [
      { stopCode: '64009', stopDescription: 'Hougang Central Int', roadName: 'Hougang Central', distanceKm: 0.0, seq: 1 },
      { stopCode: '64109', stopDescription: 'Blk 831', roadName: 'Hougang Ave 2', distanceKm: 1.8, seq: 2 },
      { stopCode: '66019', stopDescription: 'Serangoon Stn Exit C', roadName: 'Upper Serangoon Rd', distanceKm: 4.2, seq: 3, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE12', stationName: 'Serangoon' }] },
      { stopCode: '60121', stopDescription: 'Potong Pasir Stn', roadName: 'Upper Serangoon Rd', distanceKm: 6.8, seq: 4, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE10', stationName: 'Potong Pasir' }] },
      { stopCode: '01012', stopDescription: 'Hotel Rendezvous', roadName: 'Bras Basah Rd', distanceKm: 11.2, seq: 5, mrtConnections: [{ lineCode: 'DTL', stationCode: 'DT21', stationName: 'Bencoolen' }] },
      { stopCode: '03071', stopDescription: 'Clarke Quay Stn', roadName: 'Eu Tong Sen St', distanceKm: 12.6, seq: 6, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE5', stationName: 'Clarke Quay' }] },
      { stopCode: '03223', stopDescription: 'Opp Hong Lim Cplx', roadName: 'Upper Cross St', distanceKm: 13.4, seq: 7, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE4', stationName: 'Chinatown' }] },
      { stopCode: '05019', stopDescription: 'Outram Park Stn', roadName: 'Outram Rd', distanceKm: 14.8, seq: 8, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE3', stationName: 'Outram Park' }] },
      { stopCode: '10018', stopDescription: 'Opp Queensway Shop Ctr', roadName: 'Jln Bukit Merah', distanceKm: 17.5, seq: 9 },
      { stopCode: '14119', stopDescription: 'HarbourFront Stn / VivoCity', roadName: 'Telok Blangah Rd', distanceKm: 19.3, seq: 10, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE1', stationName: 'HarbourFront' }] },
      { stopCode: '17009', stopDescription: 'Clementi Int', roadName: 'Clementi Ave 3', distanceKm: 25.1, seq: 11, mrtConnections: [{ lineCode: 'EWL', stationCode: 'EW23', stationName: 'Clementi' }] }
    ]
  },
  {
    serviceNo: '190',
    operator: 'SMRT',
    category: 'Normal',
    originCode: '44009',
    originName: 'Choa Chu Kang Int',
    destinationCode: '05999',
    destinationName: 'Kampong Bahru Ter',
    frequencyRange: '4 - 7 mins',
    firstBus: '05:40',
    lastBus: '23:30',
    stops: [
      { stopCode: '44009', stopDescription: 'Choa Chu Kang Int', roadName: 'Choa Chu Kang Loop', distanceKm: 0.0, seq: 1, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS4', stationName: 'Choa Chu Kang' }] },
      { stopCode: '44129', stopDescription: 'Blk 210', roadName: 'Teck Whye Ave', distanceKm: 2.1, seq: 2 },
      { stopCode: '43009', stopDescription: 'Bukit Panjang Plaza', roadName: 'Petir Rd', distanceKm: 4.8, seq: 3, mrtConnections: [{ lineCode: 'DTL', stationCode: 'DT1', stationName: 'Bukit Panjang' }] },
      { stopCode: '09048', stopDescription: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 16.4, seq: 4, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS22', stationName: 'Orchard' }] },
      { stopCode: '08057', stopDescription: 'Dhoby Ghaut Stn', roadName: 'Orchard Rd', distanceKm: 18.2, seq: 5, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS24', stationName: 'Dhoby Ghaut' }] },
      { stopCode: '03071', stopDescription: 'Clarke Quay Stn', roadName: 'Eu Tong Sen St', distanceKm: 19.7, seq: 6, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE5', stationName: 'Clarke Quay' }] },
      { stopCode: '03223', stopDescription: 'Opp Hong Lim Cplx', roadName: 'Upper Cross St', distanceKm: 20.4, seq: 7, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE4', stationName: 'Chinatown' }] },
      { stopCode: '04179', stopDescription: 'Raffles Place Stn Exit F', roadName: 'Battery Rd', distanceKm: 21.6, seq: 8, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS26', stationName: 'Raffles Place' }] },
      { stopCode: '05999', stopDescription: 'Kampong Bahru Ter', roadName: 'Spooner Rd', distanceKm: 23.8, seq: 9 }
    ]
  },
  {
    serviceNo: '65',
    operator: 'SBST',
    category: 'Normal',
    originCode: '65009',
    originName: 'Tampines Int',
    destinationCode: '14119',
    destinationName: 'HarbourFront Int',
    frequencyRange: '6 - 10 mins',
    firstBus: '05:25',
    lastBus: '23:35',
    stops: [
      { stopCode: '65009', stopDescription: 'Tampines Interchange', roadName: 'Tampines Ave 4', distanceKm: 0.0, seq: 1, mrtConnections: [{ lineCode: 'EWL', stationCode: 'EW2', stationName: 'Tampines' }] },
      { stopCode: '71009', stopDescription: 'Bedok Reservoir Stn', roadName: 'Bedok Reservoir Rd', distanceKm: 3.8, seq: 2, mrtConnections: [{ lineCode: 'DTL', stationCode: 'DT30', stationName: 'Bedok Reservoir' }] },
      { stopCode: '62009', stopDescription: 'MacPherson Stn Exit A', roadName: 'Paya Lebar Rd', distanceKm: 8.7, seq: 3, mrtConnections: [{ lineCode: 'CCL', stationCode: 'CC10', stationName: 'MacPherson' }] },
      { stopCode: '01012', stopDescription: 'Hotel Rendezvous', roadName: 'Bras Basah Rd', distanceKm: 15.3, seq: 4, mrtConnections: [{ lineCode: 'DTL', stationCode: 'DT21', stationName: 'Bencoolen' }] },
      { stopCode: '08057', stopDescription: 'Dhoby Ghaut Stn', roadName: 'Orchard Rd', distanceKm: 16.1, seq: 5, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS24', stationName: 'Dhoby Ghaut' }] },
      { stopCode: '09048', stopDescription: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 17.8, seq: 6, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS22', stationName: 'Orchard' }] },
      { stopCode: '03223', stopDescription: 'Opp Hong Lim Cplx', roadName: 'Upper Cross St', distanceKm: 20.2, seq: 7, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE4', stationName: 'Chinatown' }] },
      { stopCode: '14119', stopDescription: 'HarbourFront Stn / VivoCity', roadName: 'Telok Blangah Rd', distanceKm: 24.5, seq: 8, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE1', stationName: 'HarbourFront' }] }
    ]
  },
  {
    serviceNo: '857',
    operator: 'TTS',
    category: 'Normal',
    originCode: '59009',
    originName: 'Yishun Int',
    destinationCode: '02009',
    destinationName: 'Suntec City (Loop)',
    frequencyRange: '6 - 9 mins',
    firstBus: '05:30',
    lastBus: '23:30',
    stops: [
      { stopCode: '59009', stopDescription: 'Yishun Int', roadName: 'Yishun Ave 2', distanceKm: 0.0, seq: 1, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS13', stationName: 'Yishun' }] },
      { stopCode: '58009', stopDescription: 'Khatib Stn', roadName: 'Yishun Ave 2', distanceKm: 2.1, seq: 2, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS14', stationName: 'Khatib' }] },
      { stopCode: '01012', stopDescription: 'Hotel Rendezvous', roadName: 'Bras Basah Rd', distanceKm: 16.5, seq: 3, mrtConnections: [{ lineCode: 'DTL', stationCode: 'DT21', stationName: 'Bencoolen' }] },
      { stopCode: '03223', stopDescription: 'Opp Hong Lim Cplx', roadName: 'Upper Cross St', distanceKm: 18.2, seq: 4, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE4', stationName: 'Chinatown' }] },
      { stopCode: '03539', stopDescription: 'Marina Bay Sands MICE', roadName: 'Bayfront Ave', distanceKm: 20.1, seq: 5, mrtConnections: [{ lineCode: 'DTL', stationCode: 'DT16', stationName: 'Bayfront' }] }
    ]
  },
  {
    serviceNo: '12e',
    operator: 'GAS',
    category: 'Express',
    originCode: '77009',
    originName: 'Pasir Ris Int',
    destinationCode: '05999',
    destinationName: 'Kampong Bahru Ter (Express)',
    frequencyRange: '10 - 15 mins',
    firstBus: '06:00',
    lastBus: '22:30',
    stops: [
      { stopCode: '77009', stopDescription: 'Pasir Ris Int', roadName: 'Pasir Ris Dr 3', distanceKm: 0.0, seq: 1, mrtConnections: [{ lineCode: 'EWL', stationCode: 'EW1', stationName: 'Pasir Ris' }] },
      { stopCode: '65009', stopDescription: 'Tampines Interchange', roadName: 'Tampines Ave 4', distanceKm: 3.5, seq: 2, mrtConnections: [{ lineCode: 'EWL', stationCode: 'EW2', stationName: 'Tampines' }] },
      { stopCode: '04179', stopDescription: 'Raffles Place Stn Exit F', roadName: 'Battery Rd', distanceKm: 19.8, seq: 3, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS26', stationName: 'Raffles Place' }] },
      { stopCode: '03223', stopDescription: 'Opp Hong Lim Cplx', roadName: 'Upper Cross St', distanceKm: 21.2, seq: 4, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE4', stationName: 'Chinatown' }] }
    ]
  },
  {
    serviceNo: 'CT8',
    operator: 'SBST',
    category: 'Direct',
    originCode: '54009',
    originName: 'Ang Mo Kio Ave 9',
    destinationCode: '03223',
    destinationName: 'Chinatown Direct Express',
    frequencyRange: '12 - 18 mins',
    firstBus: '07:00',
    lastBus: '21:30',
    stops: [
      { stopCode: '54009', stopDescription: 'Ang Mo Kio Int', roadName: 'Ang Mo Kio Ave 3', distanceKm: 0.0, seq: 1, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS16', stationName: 'Ang Mo Kio' }] },
      { stopCode: '09048', stopDescription: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 11.2, seq: 2, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS22', stationName: 'Orchard' }] },
      { stopCode: '03071', stopDescription: 'Clarke Quay Stn', roadName: 'Eu Tong Sen St', distanceKm: 13.9, seq: 3, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE5', stationName: 'Clarke Quay' }] },
      { stopCode: '03223', stopDescription: 'Opp Hong Lim Cplx', roadName: 'Upper Cross St', distanceKm: 14.6, seq: 4, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE4', stationName: 'Chinatown' }] }
    ]
  },
  {
    serviceNo: '502',
    operator: 'SBST',
    category: 'Express',
    originCode: '28009',
    originName: 'Jurong East Int',
    destinationCode: '03539',
    destinationName: 'Bayfront / Marina Bay Sands',
    frequencyRange: '8 - 14 mins',
    firstBus: '05:45',
    lastBus: '23:15',
    stops: [
      { stopCode: '28009', stopDescription: 'Jurong East Interchange', roadName: 'Jurong Gateway Rd', distanceKm: 0.0, seq: 1, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS1', stationName: 'Jurong East' }] },
      { stopCode: '09048', stopDescription: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', distanceKm: 16.5, seq: 2, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS22', stationName: 'Orchard' }] },
      { stopCode: '08057', stopDescription: 'Dhoby Ghaut Stn', roadName: 'Orchard Rd', distanceKm: 18.0, seq: 3, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS24', stationName: 'Dhoby Ghaut' }] },
      { stopCode: '04179', stopDescription: 'Raffles Place Stn Exit F', roadName: 'Battery Rd', distanceKm: 20.3, seq: 4, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS26', stationName: 'Raffles Place' }] },
      { stopCode: '03539', stopDescription: 'Marina Bay Sands MICE', roadName: 'Bayfront Ave', distanceKm: 22.4, seq: 5, mrtConnections: [{ lineCode: 'DTL', stationCode: 'DT16', stationName: 'Bayfront' }] }
    ]
  },
  {
    serviceNo: '10',
    operator: 'SBST',
    category: 'Normal',
    originCode: '65009',
    originName: 'Tampines Int',
    destinationCode: '16009',
    destinationName: 'Kent Ridge Ter',
    frequencyRange: '7 - 11 mins',
    firstBus: '05:30',
    lastBus: '23:40',
    stops: [
      { stopCode: '65009', stopDescription: 'Tampines Interchange', roadName: 'Tampines Ave 4', distanceKm: 0.0, seq: 1, mrtConnections: [{ lineCode: 'EWL', stationCode: 'EW2', stationName: 'Tampines' }] },
      { stopCode: '04179', stopDescription: 'Raffles Place Stn Exit F', roadName: 'Battery Rd', distanceKm: 18.4, seq: 2, mrtConnections: [{ lineCode: 'NSL', stationCode: 'NS26', stationName: 'Raffles Place' }] },
      { stopCode: '03539', stopDescription: 'Marina Bay Sands MICE', roadName: 'Bayfront Ave', distanceKm: 20.0, seq: 3, mrtConnections: [{ lineCode: 'DTL', stationCode: 'DT16', stationName: 'Bayfront' }] },
      { stopCode: '14119', stopDescription: 'HarbourFront Stn / VivoCity', roadName: 'Telok Blangah Rd', distanceKm: 24.2, seq: 4, mrtConnections: [{ lineCode: 'NEL', stationCode: 'NE1', stationName: 'HarbourFront' }] }
    ]
  }
];

export const SERVICE_ALERTS: ServiceAlert[] = [
  {
    id: 'alert-1',
    type: 'NORMAL',
    title: 'All MRT Lines Operating Normally',
    message: 'Train intervals operating on peak frequency. North East, Downtown, East West, North South, Thomson-East Coast, and Circle lines are clear.',
    affectedLines: ['NEL', 'DTL', 'EWL', 'NSL', 'TEL', 'CCL'],
    timestamp: 'Just now'
  },
  {
    id: 'alert-2',
    type: 'ADVISORY',
    title: 'Scheduled Track Maintenance (Sunday Night)',
    message: 'EWL services between Tampines and Pasir Ris will end 30 mins earlier on Sunday for power rail renewal. Shuttle Bus 7 will operate.',
    affectedLines: ['EWL'],
    timestamp: '2 hours ago'
  },
  {
    id: 'alert-3',
    type: 'INFO',
    title: 'Marina Bay Waterfront Event Diversion',
    message: 'Bus services 857 and 502 will skip Bayfront Ave stop between 18:00 and 22:00 due to community marathon event.',
    affectedLines: ['Bus 857', 'Bus 502'],
    timestamp: 'Today, 14:00'
  }
];

// Helper to simulate realistic next arrivals for any bus stop & service
export function generateLiveArrivals(stopCode: string): import('../types/transit').BusArrivalInfo[] {
  const stop = BUS_STOPS.find(s => s.code === stopCode) || BUS_STOPS[0];
  const servicesAtStop = stop.services;

  return servicesAtStop.map((serviceNo, index) => {
    const serviceDef = BUS_SERVICES.find(s => s.serviceNo === serviceNo);
    const op = serviceDef?.operator || 'SBST';
    const cat = serviceDef?.category || 'Normal';
    const dest = serviceDef?.destinationName || 'Central Terminal';

    // Seeded arrival timings based on service number and current minutes
    const baseOffset = (parseInt(serviceNo.replace(/\D/g, '') || '10', 10) * 3 + index * 5) % 11;
    const arrival1Sec = Math.max(25, (baseOffset * 70 + 45) % 480); // between 25s and 8 min
    const arrival2Sec = arrival1Sec + 360 + (index * 90) % 300; // 6 - 11 mins later
    const arrival3Sec = arrival2Sec + 480 + (index * 60) % 360; // 8 - 14 mins later

    const loads: ('SEA' | 'SDA' | 'LSD')[] = ['SEA', 'SDA', 'SEA', 'LSD', 'SEA', 'SDA'];
    const types: ('DD' | 'SD' | 'BD')[] = ['DD', 'SD', 'DD', 'DD', 'BD', 'SD'];

    return {
      serviceNo,
      operator: op,
      category: cat,
      destinationName: dest,
      destinationCode: serviceDef?.destinationCode || '99999',
      nextBus: {
        estimatedArrivalSeconds: arrival1Sec,
        load: loads[(index + 1) % loads.length],
        feature: 'WAB',
        type: types[index % types.length]
      },
      nextBus2: {
        estimatedArrivalSeconds: arrival2Sec,
        load: loads[(index + 2) % loads.length],
        feature: 'WAB',
        type: types[(index + 1) % types.length]
      },
      nextBus3: {
        estimatedArrivalSeconds: arrival3Sec,
        load: loads[(index + 3) % loads.length],
        feature: 'WAB',
        type: types[(index + 2) % types.length]
      }
    };
  });
}
