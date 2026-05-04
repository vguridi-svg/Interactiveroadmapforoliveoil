import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { MarketLaunchNetwork } from '../components/MarketLaunchNetwork';

export default function MarketLaunch() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/10 via-orange-900/10 to-yellow-900/15" style={{ backgroundColor: '#f5f0e8' }}>
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-amber-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Roadmap
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">
              Estrategia de Lanzamiento al Mercado
            </h1>
            <p className="text-xl text-gray-700 mb-3">Entrada al Mercado de República Dominicana</p>
            <p className="text-gray-600">Haz clic en cada paso para marcarlo como completado. Los pasos se desbloquean progresivamente.</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <MarketLaunchNetwork />

        {/* Bottom Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 bg-amber-50 border-2 border-amber-300 rounded-2xl p-6"
        >
          <h4 className="font-semibold text-amber-900 mb-3 text-lg">Consejos Profesionales para el Éxito:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                <strong>Calidad Primero:</strong> Enfatiza el origen español premium y la producción artesanal
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                <strong>Educación:</strong> Enseña a los clientes cómo identificar aceite de oliva de calidad y su uso adecuado
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                <strong>Storytelling:</strong> Comparte la historia del productor español y los olivares
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                <strong>Asociaciones:</strong> Construye relaciones con chefs e influencers gastronómicos en RD
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
