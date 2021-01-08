export enum Paths {
  Home = '/',
  NewGame = '/games/new',
  Games = '/games/:id'
}

export const ApiBasePath = 'https://dice-game-service.herokuapp.com';

export enum GameStatus {
  New = 'new',
  Rolling = 'rolling',
  Moving = 'moving',
  Complete = 'complete'
}

export enum DieStatus {
  Used = 'used',
  Active = 'active',
  Unused = 'unused'
}

export enum DieColor {
  Blue = 'blue',
  Red = 'red',
  Purple = 'purple',
  Yellow = 'yellow',
  Green = 'green',
  Orange = 'orange',
  Wild = 'wild'
}

export enum USMapNodeId {
  AK = 'AK',
  AL = 'AL',
  AR = 'AR',
  AZ = 'AZ',
  CA = 'CA',
  CO = 'CO',
  CT = 'CT',
  DE = 'DE',
  FL = 'FL',
  GA = 'GA',
  HI = 'HI',
  IA = 'IA',
  ID = 'ID',
  IL = 'IL',
  IN = 'IN',
  KS = 'KS',
  KY = 'KY',
  LA = 'LA',
  MA = 'MA',
  MD = 'MD',
  ME = 'ME',
  MI = 'MI',
  MN = 'MN',
  MO = 'MO',
  MS = 'MS',
  MT = 'MT',
  NC = 'NC',
  ND = 'ND',
  NE = 'NE',
  NH = 'NH',
  NJ = 'NJ',
  NM = 'NM',
  NV = 'NV',
  NY = 'NY',
  OH = 'OH',
  OK = 'OK',
  OR = 'OR',
  PA = 'PA',
  RI = 'RI',
  SC = 'SC',
  SD = 'SD',
  TN = 'TN',
  TX = 'TX',
  UT = 'UT',
  VA = 'VA',
  VT = 'VT',
  WA = 'WA',
  WI = 'WI',
  WV = 'WV',
  WY = 'WY',
}
