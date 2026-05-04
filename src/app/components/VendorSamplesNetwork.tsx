import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Lock, Building2, Package, FileText, Phone } from 'lucide-react';

interface NetworkStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  details?: string;
  image?: string;
  position: { x: number; y: number };
  unlocks: number[];
}

export function VendorSamplesNetwork() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps: NetworkStep[] = [
    {
      id: 1,
      title: 'Identificar tiendas gourmet y restaurantes objetivo',
      description: 'Lugares encontrados: La Bodega, BLT Market, Specias Market, El Catador',
      icon: Building2,
      details: 'Investiga y crea una lista de establecimientos premium que valoren productos artesanales de alta calidad.',
      position: { x: 20, y: 20 },
      unlocks: [2],
    },
    {
      id: 2,
      title: 'Preparar paquetes de muestras profesionales',
      description: 'Botellas de cerámica mini con presentación premium',
      icon: Package,
      details: 'Incluye botellas de cerámica mini elegantes con etiquetado profesional y presentación de marca.',
      image: 'https://images.unsplash.com/photo-1699476261674-09eea4d9df5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pJTIwY2VyYW1pYyUyMG9saXZlJTIwb2lsJTIwYm90dGxlcyUyMGdpZnR8ZW58MXx8fHwxNzc3ODg3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      position: { x: 50, y: 15 },
      unlocks: [3],
    },
    {
      id: 3,
      title: 'Incluir información del producto y precios',
      description: 'Material informativo profesional',
      icon: FileText,
      details: 'Crea hojas de especificaciones, fichas técnicas, y lista de precios en formato premium.',
      position: { x: 80, y: 25 },
      unlocks: [4],
    },
    {
      id: 4,
      title: 'Hacer seguimiento en 1 semana',
      description: 'Contacto de seguimiento con cada establecimiento',
      icon: Phone,
      details: 'Llamada o visita de seguimiento para recoger feedback y cerrar primeros pedidos.',
      position: { x: 60, y: 55 },
      unlocks: [],
    },
  ];

  const isStepUnlocked = (stepId: number): boolean => {
    if (stepId === 1) return true;
    const prerequisiteSteps = steps.filter(s => s.unlocks.includes(stepId));
    return prerequisiteSteps.every(s => completedSteps.has(s.id));
  };

  const toggleStepComplete = (stepId: number) => {
    if (!isStepUnlocked(stepId)) return;

    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const getConnectionPath = (from: NetworkStep, to: NetworkStep) => {
    const startX = from.position.x + 8;
    const startY = from.position.y + 8;
    const endX = to.position.x + 8;
    const endY = to.position.y + 8;

    const midX = (startX + endX) / 2;

    return `M ${startX} ${startY} Q ${midX} ${startY} ${midX} ${(startY + endY) / 2} T ${endX} ${endY}`;
  };

  const selectedStepData = selectedStep ? steps.find(s => s.id === selectedStep) : null;

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-amber-300 p-8 shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Enviar Muestras a Vendedores</h3>
        <p className="text-gray-600">Haz clic en cada paso para completarlo. Los pasos se desbloquean secuencialmente.</p>
        <div className="mt-2 text-sm text-amber-700">
          {completedSteps.size} de {steps.length} pasos completados
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Network Visualization */}
        <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200" style={{ minHeight: '500px' }}>
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {steps.map(step =>
              step.unlocks.map(targetId => {
                const targetStep = steps.find(s => s.id === targetId);
                if (!targetStep) return null;

                const isActive = completedSteps.has(step.id);

                return (
                  <motion.path
                    key={`${step.id}-${targetId}`}
                    d={getConnectionPath(step, targetStep)}
                    fill="none"
                    stroke={isActive ? '#059669' : '#d97706'}
                    strokeWidth="2"
                    strokeDasharray={isActive ? '0' : '5,5'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                );
              })
            )}
          </svg>

          {/* Network Nodes */}
          {steps.map((step) => {
            const isUnlocked = isStepUnlocked(step.id);
            const isCompleted = completedSteps.has(step.id);
            const isSelected = selectedStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: step.id * 0.15 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${step.position.x}%`,
                  top: `${step.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 20 : 10,
                }}
                onClick={() => {
                  setSelectedStep(step.id);
                  if (isUnlocked) {
                    toggleStepComplete(step.id);
                  }
                }}
              >
                <motion.div
                  whileHover={{ scale: isUnlocked ? 1.1 : 1 }}
                  whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
                  className={`relative ${isUnlocked ? '' : 'opacity-50'}`}
                >
                  {/* Node Circle */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all shadow-lg ${
                      isCompleted
                        ? 'bg-green-500 border-green-600'
                        : isUnlocked
                        ? 'bg-amber-500 border-amber-600'
                        : 'bg-gray-300 border-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    ) : isUnlocked ? (
                      <step.icon className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-gray-500" />
                    )}
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-gray-800 flex items-center justify-center text-xs font-bold">
                    {step.id}
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white border-2 border-amber-300 rounded-lg shadow-xl p-3 text-xs pointer-events-none"
                      >
                        <div className="font-semibold text-gray-900 mb-1">{step.title}</div>
                        <div className="text-gray-600">{step.description}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          {steps.map((step) => {
            const isUnlocked = isStepUnlocked(step.id);
            const isCompleted = completedSteps.has(step.id);

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: step.id * 0.1 }}
                className={`rounded-xl border-2 p-4 transition-all ${
                  isCompleted
                    ? 'bg-green-50 border-green-300'
                    : isUnlocked
                    ? 'bg-white border-amber-300 hover:shadow-md cursor-pointer'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedStep(step.id);
                    toggleStepComplete(step.id);
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    isCompleted ? 'bg-green-100' : isUnlocked ? 'bg-amber-100' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : isUnlocked ? (
                      <step.icon className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500">PASO {step.id}</span>
                      {isCompleted && (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                          Completado
                        </span>
                      )}
                      {!isUnlocked && (
                        <span className="text-xs bg-gray-400 text-white px-2 py-0.5 rounded-full">
                          Bloqueado
                        </span>
                      )}
                    </div>
                    <h4 className={`font-semibold text-gray-900 mb-1 ${isCompleted ? 'line-through' : ''}`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    {step.details && (
                      <p className="text-xs text-gray-500 italic">{step.details}</p>
                    )}
                    {step.image && isUnlocked && (
                      <div className="mt-3">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="rounded-lg w-full h-32 object-cover border border-amber-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
