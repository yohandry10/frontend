  import React from 'react';
  import { Rocket, BookOpen, Trophy, Star, Sparkles, Target, Award, Users } from 'lucide-react';

  export default function DashboardContent() {
    const calculateCircleProperties = (percentage: number, size = 150, strokeWidth = 4) => {
      const radius = (size - strokeWidth) / 2;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (percentage / 100) * circumference;
      return { radius, circumference, offset, size, strokeWidth };
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Animated Welcome Header */}
          <header className="mb-16 text-center relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),rgba(255,255,255,0))]" />
            </div>
            <div className="inline-flex items-center justify-center space-x-4 mb-6 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
              <Sparkles className="w-10 h-10 text-purple-600 animate-pulse" />
              <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                ¡Hola Emprendedor!
              </h1>
            </div>
            <p className="text-gray-600 text-lg animate-fade-in">Tu camino al éxito está en marcha</p>
          </header>

          {/* Interactive Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {/* Progreso del Curso Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 transform hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  {(() => {
                    const { radius, circumference, offset, size } = calculateCircleProperties(80);
                    return (
                      <div className="relative">
                        <svg className="transform -rotate-90 w-36 h-36">
                          <circle
                            className="text-purple-100"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx={size/2}
                            cy={size/2}
                          />
                          <circle
                            className="text-purple-600 transition-all duration-1000 ease-out"
                            strokeWidth="8"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx={size/2}
                            cy={size/2}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-purple-600">80%</span>
                          <span className="text-sm text-gray-500">Completado</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Progreso del Curso</h3>
                <p className="text-gray-500">13 de 16 clases completadas</p>
              </div>
            </div>

            {/* Tareas Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 transform hover:-translate-y-1">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Tareas Pendientes</h3>
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex-grow">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full" />
                        <span className="text-gray-700">Plan de Negocios</span>
                      </div>
                      <span className="text-sm text-purple-600 font-medium">Pendiente</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span className="text-gray-700">Análisis de Mercado</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Completado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proyecto Final Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 transform hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <div className="mb-6 relative">
                  <div className="absolute -inset-4 bg-purple-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity" />
                  <Trophy className="w-12 h-12 text-purple-600 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Proyecto Final</h3>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }} />
                </div>
                <p className="text-gray-500">30% Completado</p>
              </div>
            </div>

            {/* Logros Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 transform hover:-translate-y-1">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Logros</h3>
                  <Award className="w-6 h-6 text-purple-500" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
                    { icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
                    { icon: Target, color: 'text-green-500', bg: 'bg-green-100' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`${item.bg} p-4 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <item.icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recursos Destacados Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Recursos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Masterclass: Presentaciones Efectivas",
                  description: "Aprende a crear presentaciones que impacten",
                  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
                  icon: BookOpen,
                },
                {
                  title: "Workshop: Marketing Digital",
                  description: "Estrategias actuales de marketing digital",
                  image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800",
                  icon: Target,
                },
                {
                  title: "Guía: Finanzas para Emprendedores",
                  description: "Gestiona tus finanzas efectivamente",
                  image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
                  icon: Award,
                },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <resource.icon className="w-6 h-6 mb-2" />
                      <h3 className="text-lg font-semibold">{resource.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{resource.description}</p>
                    <button className="mt-4 text-purple-600 font-medium hover:text-purple-700 transition-colors">
                      Explorar →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonios Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Testimonios de Éxito
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "María Pérez",
                  role: "Fundadora de EcoStyle",
                  quote: "Este programa transformó mi visión del emprendimiento.",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
                },
                {
                  name: "Carlos Ruiz",
                  role: "CEO de TechStart",
                  quote: "Las herramientas aprendidas fueron clave para mi éxito.",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
                },
                {
                  name: "Ana Martínez",
                  role: "Directora de Innovation Hub",
                  quote: "La mentoría y el networking son excepcionales.",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-full object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 rounded-full ring-4 ring-purple-500 ring-offset-4" />
                    </div>
                    <blockquote className="text-gray-600 italic mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <cite className="not-italic">
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-purple-600 text-sm">{testimonial.role}</div>
                    </cite>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
        </div>
      </div>
    );
  }