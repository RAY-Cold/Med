import { Blueprint } from '../types/initialize';

export const mockBlueprints: Blueprint[] = [
  {
    id: 'bp-1',
    name: 'Cognitive Behavioral Therapy (CBT) Framework',
    domain: 'Clinical Psychology',
    subdomain: 'Anxiety Disorders',
    verified: true,
  },
  {
    id: 'bp-2',
    name: 'Dialectical Behavior Therapy (DBT) Skills',
    domain: 'Clinical Psychology',
    subdomain: 'Emotional Regulation',
    verified: true,
  },
  {
    id: 'bp-3',
    name: 'Mindfulness-Based Stress Reduction',
    domain: 'Wellness',
    subdomain: 'Stress Management',
    verified: false,
  },
  {
    id: 'bp-4',
    name: 'Exposure and Response Prevention (ERP)',
    domain: 'Clinical Psychology',
    subdomain: 'OCD',
    verified: true,
  },
  {
    id: 'bp-5',
    name: 'Acceptance and Commitment Therapy (ACT)',
    domain: 'Clinical Psychology',
    subdomain: 'General',
    verified: false,
  },
];
