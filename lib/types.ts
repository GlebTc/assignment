export interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: 'Hot' | 'Active' | 'Passed' | 'Cold' | 'Closed' | null | string;
  markets: string[];
  lastUpdated: string;
}