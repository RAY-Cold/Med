import { create } from 'zustand';

export type Medium = 'interactive' | 'hybrid' | 'print';
export type Foundation = 'blueprint' | 'direct';
export type NodeHierarchy = 'reusable-template' | 'fresh-tool';

interface InitializeState {
  step: 1 | 2 | 3;
  medium: Medium | null;
  foundation: Foundation | null;
  nodeHierarchy: NodeHierarchy | null;
  identity: {
    name: string;
    label: string;
    domain: string;
    subdomain: string;
  };
  setMedium: (medium: Medium) => void;
  setFoundation: (foundation: Foundation) => void;
  setNodeHierarchy: (hierarchy: NodeHierarchy) => void;
  setIdentityField: (field: keyof InitializeState['identity'], value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useInitializeStore = create<InitializeState>((set) => ({
  step: 1,
  medium: null,
  foundation: null,
  nodeHierarchy: null,
  identity: {
    name: '',
    label: '',
    domain: '',
    subdomain: '',
  },
  setMedium: (medium) => set({ medium }),
  setFoundation: (foundation) => set({ foundation }),
  setNodeHierarchy: (nodeHierarchy) => set({ nodeHierarchy }),
  setIdentityField: (field, value) =>
    set((state) => ({
      identity: { ...state.identity, [field]: value },
    })),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) as 1 | 2 | 3 })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) as 1 | 2 | 3 })),
  reset: () =>
    set({
      step: 1,
      medium: null,
      foundation: null,
      nodeHierarchy: null,
      identity: { name: '', label: '', domain: '', subdomain: '' },
    }),
}));
