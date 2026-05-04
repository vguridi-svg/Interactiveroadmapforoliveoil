import { useState } from 'react';
import { Link } from 'react-router';
import { RoadmapPhase } from '../components/RoadmapPhase';
import { KeyRuleBanner } from '../components/KeyRuleBanner';
import { ArrowRight } from 'lucide-react';

export default function Roadmap() {
  const [phases, setPhases] = useState([
    {
      phaseNumber: 1,
      title: 'Fase 1 — Cerrar el acuerdo (ahora)',
      description: 'Firma el contrato de exclusividad antes de que cualquier otra cosa se mueva',
      color: 'bg-orange-50',
      borderColor: 'border-orange-300',
      items: [
        {
          title: 'Firmar contrato de exclusividad',
          description: 'Derechos exclusivos en RD, sin ventas directas, sin otros distribuidores — TÚ eres el representante, no un importador',
          completed: false,
        },
        {
          title: 'Registro de marca ONAPI',
          description: 'Presiona a Enriqueta para financiarlo',
          completed: false,
        },
        {
          title: 'NDA firmado',
          description: 'Cubre contacto, precios, identidad del proveedor',
          completed: false,
        },
      ],
    },
    {
      phaseNumber: 2,
      title: 'Fase 2 — Encontrar y asegurar importadora (1–3 meses)',
      description: 'Ellos manejan la logística. Tú mantienes la relación de marca y el control comercial.',
      color: 'bg-amber-50',
      borderColor: 'border-amber-300',
      items: [
        {
          title: 'Evaluar importadoras',
          description: 'Experiencia en alimentos, canales existentes, reputación',
          completed: false,
        },
        {
          title: 'No revelar el proveedor todavía',
          description: 'Primero firma el NDA — luego comparte detalles',
          completed: false,
        },
        {
          title: 'Acuerdo de servicio con importadora',
          description: 'Trabajan para ti, no con Enriqueta — no se permite contacto directo con el proveedor',
          completed: false,
        },
        {
          title: 'Tú posees el contacto del proveedor',
          description: 'Todos los correos y llamadas pasan por ti',
          completed: false,
        },
        {
          title: 'Registro en Banco Central',
          description: 'Aún es necesario — hazlo bajo tu nombre',
          completed: false,
        },
      ],
    },
    {
      phaseNumber: 3,
      title: 'Fase 3 — Lanzamiento al mercado (3–6 meses)',
      description: 'Construye presencia de marca y primer canal de ventas en RD',
      color: 'bg-teal-50',
      borderColor: 'border-teal-300',
      items: [
        {
          title: 'Primer canal de ventas',
          description: 'Tiendas gourmet, restaurantes, hoteles',
          completed: false,
        },
        {
          title: 'Precios y posicionamiento',
          description: 'Premium, define tus márgenes claramente',
          completed: false,
        },
        {
          title: 'Usa tu sitio de catálogo',
          description: 'Tu catálogo en github.io ya está en vivo — úsalo para presentar a compradores y construir credibilidad',
          completed: false,
        },
      ],
    },
    {
      phaseNumber: 4,
      title: 'Fase 4 — Escalar (6–12 meses)',
      description: 'Crece canales, prueba ventas, renueva con mejores términos',
      color: 'bg-purple-50',
      borderColor: 'border-purple-300',
      items: [
        {
          title: 'Expandir distribución',
          description: 'Supermercados, online, eventos',
          completed: false,
        },
        {
          title: 'Renovar con mejores términos',
          description: 'Usa tus datos de ventas como palanca',
          completed: false,
        },
      ],
    },
  ]);

  const handleToggleItem = (phaseIndex: number, itemIndex: number) => {
    setPhases(prevPhases => {
      const newPhases = [...prevPhases];
      newPhases[phaseIndex].items[itemIndex].completed = !newPhases[phaseIndex].items[itemIndex].completed;
      return newPhases;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/10 via-orange-900/10 to-yellow-900/15" style={{ backgroundColor: '#f5f0e8' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1757149908579-474cb1da27bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMGdyb3ZlJTIwc3BhaW4lMjBhbmRhbHVzaWF8ZW58MXx8fHwxNzc2MzU2NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl mb-4 text-gray-900">
              Doña Enriqueta - Oil Luxury
            </h1>
            <p className="text-xl text-gray-700 mb-2">Roadmap de Entrada al Mercado</p>
            <p className="text-lg text-gray-600">Estrategia de Distribución en República Dominicana</p>
          </div>

          <Link
            to="/market-launch"
            className="mx-auto flex items-center justify-center gap-2 w-fit bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            Ver Estrategia de Lanzamiento al Mercado
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Roadmap */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="space-y-8">
          {phases.map((phase) => (
            <RoadmapPhase key={phase.phaseNumber} {...phase} onToggleItem={handleToggleItem} />
          ))}
        </div>

        <KeyRuleBanner />
      </div>
    </div>
  );
}
