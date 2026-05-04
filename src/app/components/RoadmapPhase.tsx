import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle2, Circle } from 'lucide-react';

interface PhaseItem {
  title: string;
  description: string;
  completed?: boolean;
}

interface RoadmapPhaseProps {
  phaseNumber: number;
  title: string;
  description: string;
  items: PhaseItem[];
  color: string;
  borderColor: string;
  isCompleted?: boolean;
  onToggleItem: (phaseIndex: number, itemIndex: number) => void;
}

export function RoadmapPhase({
  phaseNumber,
  title,
  description,
  items,
  color,
  borderColor,
  isCompleted = false,
  onToggleItem,
}: RoadmapPhaseProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const allCompleted = completedCount === totalCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: phaseNumber * 0.1 }}
      className="relative"
    >
      {/* Phase Header */}
      <div
        className={`rounded-2xl border-2 ${borderColor} ${color} p-6 cursor-pointer transition-all hover:shadow-lg`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 rounded-full border-2 ${borderColor} bg-white flex items-center justify-center text-xl`}>
                {allCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <span className="font-semibold">{phaseNumber}</span>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-semibold">{title}</h3>
                {completedCount > 0 && (
                  <span className="text-xs bg-white/60 px-2 py-1 rounded-full">
                    {completedCount}/{totalCount}
                  </span>
                )}
              </div>
              <p className="text-sm opacity-80">{description}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>
      </div>

      {/* Phase Items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-16 pr-6 pt-4 pb-2 space-y-3">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 cursor-pointer hover:bg-white/70 transition-colors ${
                    item.completed ? 'opacity-75' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItem(phaseNumber - 1, index);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-gray-900 mb-1 ${item.completed ? 'line-through' : ''}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm text-gray-600 ${item.completed ? 'line-through' : ''}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connector Line */}
      {phaseNumber < 4 && (
        <div className="absolute left-[3.5rem] top-full h-8 w-0.5 bg-gray-300 -z-10"></div>
      )}
    </motion.div>
  );
}