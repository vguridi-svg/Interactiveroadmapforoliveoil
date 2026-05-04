import { motion } from 'motion/react';
import { Info } from 'lucide-react';

export function KeyRuleBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mt-8"
    >
      <div className="flex items-start gap-3">
        <Info className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-red-900 mb-1">Regla clave:</h4>
          <p className="text-red-800">
            Importadora = solo logística. Tú = dueño de marca, contacto con proveedor, decisiones comerciales.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
