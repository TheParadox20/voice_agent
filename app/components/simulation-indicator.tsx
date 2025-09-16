import { isSimulationMode } from '@/lib/queryClient';
import { Badge } from '@/components/ui/badge';

export function SimulationIndicator() {
  if (!isSimulationMode) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
        🔄 Simulation Mode
      </Badge>
    </div>
  );
}