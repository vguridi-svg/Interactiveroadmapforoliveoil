import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Lock, Building2, Package, FileText, Phone, PartyPopper, Users, Utensils, Store, ShoppingBag, Croissant } from 'lucide-react';

interface NetworkStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  details?: string;
  image?: string;
  position: { x: number; y: number };
  unlocks: number[];
  category: 'samples' | 'tasting' | 'stands';
}

const categoryColors = {
  samples: {
    bg: 'bg-blue-500',
    border: 'border-blue-600',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    stroke: '#2563eb'
  },
  tasting: {
    bg: 'bg-purple-500',
    border: 'border-purple-600',
    light: 'bg-purple-50',
    text: 'text-purple-600',
    stroke: '#9333ea'
  },
  stands: {
    bg: 'bg-amber-500',
    border: 'border-amber-600',
    light: 'bg-amber-50',
    text: 'text-amber-600',
    stroke: '#d97706'
  }
};

export function MarketLaunchNetwork() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps: NetworkStep[] = [
    // Phase 1: Vendor Samples (Top Left)
    {
      id: 1,
      title: 'Identificar tiendas gourmet y restaurantes',
      description: 'La Bodega, BLT Market, Specias Market, El Catador',
      icon: Building2,
      details: 'Investiga y crea una lista de establecimientos premium que valoren productos artesanales.',
      position: { x: 15, y: 10 },
      unlocks: [2],
      category: 'samples'
    },
    {
      id: 2,
      title: 'Preparar paquetes de muestras',
      description: 'Botellas de cerámica mini',
      icon: Package,
      details: 'Botellas de cerámica mini elegantes con etiquetado profesional.',
      image: 'https://images.unsplash.com/photo-1699476261674-09eea4d9df5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pJTIwY2VyYW1pYyUyMG9saXZlJTIwb2lsJTIwYm90dGxlcyUyMGdpZnR8ZW58MXx8fHwxNzc3ODg3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      position: { x: 35, y: 5 },
      unlocks: [3],
      category: 'samples'
    },
    {
      id: 3,
      title: 'Incluir información y precios',
      description: 'Material profesional',
      icon: FileText,
      details: 'Fichas técnicas y lista de precios premium.',
      position: { x: 55, y: 10 },
      unlocks: [4],
      category: 'samples'
    },
    {
      id: 4,
      title: 'Seguimiento en 1 semana',
      description: 'Contacto de seguimiento',
      icon: Phone,
      details: 'Llamada o visita para recoger feedback.',
      position: { x: 70, y: 20 },
      unlocks: [5, 7],
      category: 'samples'
    },

    // Phase 2: Tasting Events (Middle)
    {
      id: 5,
      title: 'Planificar Cata de Aceite',
      description: 'Organizar evento de degustación',
      icon: PartyPopper,
      details: 'Planifica eventos de "Cata de Aceite de Oliva" profesionales.',
      position: { x: 85, y: 35 },
      unlocks: [6],
      category: 'tasting'
    },
    {
      id: 6,
      title: 'Asociarse con restaurantes',
      description: 'Colaboraciones locales',
      icon: Utensils,
      details: 'Establece asociaciones con restaurantes y venues locales.',
      position: { x: 75, y: 50 },
      unlocks: [8],
      category: 'tasting'
    },
    {
      id: 7,
      title: 'Educar sobre calidad',
      description: 'Formar consumidores',
      icon: Users,
      details: 'Enseña diferencias de calidad y uso adecuado del aceite.',
      position: { x: 60, y: 45 },
      unlocks: [8],
      category: 'tasting'
    },
    {
      id: 8,
      title: 'Construir conocimiento de marca',
      description: 'Generar emoción',
      icon: CheckCircle2,
      details: 'Crea buzz y reconocimiento de Doña Enriqueta.',
      position: { x: 65, y: 65 },
      unlocks: [9],
      category: 'tasting'
    },

    // Phase 3: Product Stands (Bottom)
    {
      id: 9,
      title: 'Stands en mercados gourmet',
      description: 'Presencia en mercados premium',
      icon: Store,
      details: 'Establece presencia en mercados gourmet selectos.',
      position: { x: 50, y: 80 },
      unlocks: [10, 11],
      category: 'stands'
    },
    {
      id: 10,
      title: 'Participar en mercadillos',
      description: 'Mercados locales',
      icon: ShoppingBag,
      details: 'Presencia en mercadillos y ferias locales.',
      position: { x: 30, y: 85 },
      unlocks: [12],
      category: 'stands'
    },
    {
      id: 11,
      title: 'Asociarse con panaderías',
      description: 'Panaderías artesanales',
      icon: Croissant,
      details: 'Colabora con panaderías artesanales para cross-selling.',
      position: { x: 15, y: 75 },
      unlocks: [12],
      category: 'stands'
    },
    {
      id: 12,
      title: 'Compromiso directo con consumidores',
      description: 'Ventas y relaciones',
      icon: Users,
      details: 'Engagement directo, feedback y ventas iniciales.',
      position: { x: 20, y: 60 },
      unlocks: [],
      category: 'stands'
    }
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
    const startX = from.position.x;
    const startY = from.position.y;
    const endX = to.position.x;
    const endY = to.position.y;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    return `M ${startX} ${startY} Q ${midX} ${startY} ${midX} ${midY} T ${endX} ${endY}`;
  };

  const categoryProgress = {
    samples: steps.filter(s => s.category === 'samples' && completedSteps.has(s.id)).length,
    tasting: steps.filter(s => s.category === 'tasting' && completedSteps.has(s.id)).length,
    stands: steps.filter(s => s.category === 'stands' && completedSteps.has(s.id)).length,
  };

  const categoryTotals = {
    samples: steps.filter(s => s.category === 'samples').length,
    tasting: steps.filter(s => s.category === 'tasting').length,
    stands: steps.filter(s => s.category === 'stands').length,
  };

  return (
    <div className="w-full">
      {/* Header Stats */}
      <div className="mb-8 grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-1">Fase 1: Muestras</h4>
          <div className="text-2xl font-bold text-blue-600">{categoryProgress.samples}/{categoryTotals.samples}</div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${(categoryProgress.samples / categoryTotals.samples) * 100}%` }}></div>
          </div>
        </div>
        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-purple-900 mb-1">Fase 2: Catas</h4>
          <div className="text-2xl font-bold text-purple-600">{categoryProgress.tasting}/{categoryTotals.tasting}</div>
          <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
            <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${(categoryProgress.tasting / categoryTotals.tasting) * 100}%` }}></div>
          </div>
        </div>
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-amber-900 mb-1">Fase 3: Stands</h4>
          <div className="text-2xl font-bold text-amber-600">{categoryProgress.stands}/{categoryTotals.stands}</div>
          <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
            <div className="bg-amber-600 h-2 rounded-full transition-all" style={{ width: `${(categoryProgress.stands / categoryTotals.stands) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border-2 border-gray-300 p-8 shadow-lg">
        <div className="relative" style={{ minHeight: '700px' }}>
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {steps.map(step =>
              step.unlocks.map(targetId => {
                const targetStep = steps.find(s => s.id === targetId);
                if (!targetStep) return null;

                const isActive = completedSteps.has(step.id);
                const colors = categoryColors[step.category];

                return (
                  <motion.path
                    key={`${step.id}-${targetId}`}
                    d={getConnectionPath(step, targetStep)}
                    fill="none"
                    stroke={isActive ? '#059669' : colors.stroke}
                    strokeWidth="3"
                    strokeDasharray={isActive ? '0' : '8,4'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
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
            const colors = categoryColors[step.category];

            return (
              <motion.div
                key={step.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: step.id * 0.08 }}
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
                  whileHover={{ scale: isUnlocked ? 1.15 : 1 }}
                  whileTap={{ scale: isUnlocked ? 0.9 : 1 }}
                  className={`relative ${isUnlocked ? '' : 'opacity-40'}`}
                >
                  {/* Glow Effect */}
                  {isCompleted && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-400 blur-xl"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Node Circle */}
                  <div
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all shadow-xl ${
                      isCompleted
                        ? 'bg-green-500 border-green-600'
                        : isUnlocked
                        ? `${colors.bg} ${colors.border}`
                        : 'bg-gray-300 border-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    ) : isUnlocked ? (
                      <step.icon className="w-10 h-10 text-white" />
                    ) : (
                      <Lock className="w-10 h-10 text-gray-500" />
                    )}
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {step.id}
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-white border-3 ${colors.border} rounded-xl shadow-2xl p-4 pointer-events-none`}
                      >
                        <div className="font-bold text-gray-900 mb-2">{step.title}</div>
                        <div className="text-sm text-gray-600 mb-2">{step.description}</div>
                        {step.details && (
                          <div className="text-xs text-gray-500 italic">{step.details}</div>
                        )}
                        {step.image && isUnlocked && (
                          <img
                            src={step.image}
                            alt={step.title}
                            className="rounded-lg w-full h-24 object-cover border border-gray-200 mt-2"
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-700">Muestras a Vendedores</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
          <span className="text-sm text-gray-700">Eventos de Cata</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-sm text-gray-700">Stands de Producto</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-700">Completado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <span className="text-sm text-gray-700">Bloqueado</span>
        </div>
      </div>
    </div>
  );
}
