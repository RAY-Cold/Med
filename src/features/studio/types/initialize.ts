export type Medium = 'interactive' | 'hybrid' | 'print';
export type Foundation = 'blueprint' | 'direct';

export interface Blueprint {
  id: string;
  name: string;
  domain: string;
  subdomain: string;
  verified: boolean;
}

export interface InitializeIdentity {
  name: string;
  label: string;
  domain: string;
  subdomain: string;
}
