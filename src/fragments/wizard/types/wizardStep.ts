export type WizardStep = {
  key: string;
  title: string;
  helper: string;
  canContinue: boolean;
  content: React.ReactNode;
  nextLabel?: string;
  onNext?: () => void | Promise<void>;
  onStep?: (from: number, to: number) => void;
};
