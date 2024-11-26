import React, { useState } from 'react';
import { Search } from 'lucide-react';

import { ModuleCard } from '../components/Reports/ModuleCard';
import { ActivityChart } from '../components/Reports/ActivityChart';
import { TaskStatus } from '../components/Reports/TaskStatus';
import Trivia from '../components/Reports/Trivia';

const modules = [
  { id: 1, title: 'Módulo General', icon: '💡' },
  { id: 2, title: 'Módulo 1', icon: '📘' },
  { id: 3, title: 'Módulo 2', icon: '📙' },
];

// Preguntas de trivia
// Preguntas de trivia
const triviaGeneral = [
  { question: '¿Qué es la metodología ágil?', options: ['Un conjunto de prácticas', 'Una herramienta de programación'], correctAnswer: 'Un conjunto de prácticas' },
  { question: '¿Qué significa la agilidad en los negocios?', options: ['Adaptabilidad rápida', 'Trabajar más rápido'], correctAnswer: 'Adaptabilidad rápida' },
  { question: '¿Cuál es uno de los principios clave de la metodología ágil?', options: ['Documentación exhaustiva', 'Entrega continua de valor'], correctAnswer: 'Entrega continua de valor' },
  { question: '¿Qué es un sprint?', options: ['Un ciclo corto de trabajo', 'Un equipo de desarrollo'], correctAnswer: 'Un ciclo corto de trabajo' },
  { question: '¿Qué es la retrospectiva?', options: ['Una reunión para revisar el progreso', 'Una técnica de programación'], correctAnswer: 'Una reunión para revisar el progreso' },
  { question: '¿Qué es un Product Owner?', options: ['El dueño de la empresa', 'Responsable del producto en un equipo ágil'], correctAnswer: 'Responsable del producto en un equipo ágil' },
  { question: '¿Qué se busca con la metodología ágil?', options: ['Mejorar la productividad sin compromiso', 'Adaptación al cambio y entrega continua de valor'], correctAnswer: 'Adaptación al cambio y entrega continua de valor' },
  { question: '¿Qué es un backlog?', options: ['Una lista de tareas pendientes', 'Un documento de requisitos'], correctAnswer: 'Una lista de tareas pendientes' },
  { question: '¿Cuál es la importancia de la iteración en la metodología ágil?', options: ['Es irrelevante', 'Permite mejorar constantemente'], correctAnswer: 'Permite mejorar constantemente' },
  { question: '¿Qué significa el manifiesto ágil?', options: ['Un conjunto de valores y principios para el desarrollo ágil', 'Un libro de gestión'], correctAnswer: 'Un conjunto de valores y principios para el desarrollo ágil' }
];

const triviaModule1 = [
  { question: '¿Qué es Scrum?', options: ['Un marco ágil', 'Un idioma'], correctAnswer: 'Un marco ágil' },
  { question: '¿Cuáles son los roles principales en Scrum?', options: ['Product Owner, Scrum Master, Equipo de desarrollo', 'Gerente, Subgerente, Asistente'], correctAnswer: 'Product Owner, Scrum Master, Equipo de desarrollo' },
  { question: '¿Qué es el Scrum Master?', options: ['El facilitador del equipo Scrum', 'El jefe del equipo'], correctAnswer: 'El facilitador del equipo Scrum' },
  { question: '¿Qué se realiza durante la reunión diaria (Daily Standup)?', options: ['Se revisan tareas pendientes', 'Se habla sobre el progreso y obstáculos del día'], correctAnswer: 'Se habla sobre el progreso y obstáculos del día' },
  { question: '¿Qué es un artefacto en Scrum?', options: ['Una pieza de software', 'Un componente del marco Scrum, como el backlog'], correctAnswer: 'Un componente del marco Scrum, como el backlog' },
  { question: '¿Qué es el sprint planning?', options: ['Una reunión para planificar el trabajo del sprint', 'Una técnica de estimación'], correctAnswer: 'Una reunión para planificar el trabajo del sprint' },
  { question: '¿Qué se revisa en la revisión del sprint (Sprint Review)?', options: ['El producto desarrollado hasta el momento', 'Los problemas personales del equipo'], correctAnswer: 'El producto desarrollado hasta el momento' },
  { question: '¿Cuál es el objetivo principal del Product Owner?', options: ['Maximizar el valor del producto', 'Controlar el equipo'], correctAnswer: 'Maximizar el valor del producto' },
  { question: '¿Qué se espera lograr al final de cada sprint?', options: ['Un incremento de producto potencialmente entregable', 'Un plan detallado para el próximo sprint'], correctAnswer: 'Un incremento de producto potencialmente entregable' },
  { question: '¿Qué es un sprint backlog?', options: ['Una lista de objetivos para el sprint actual', 'El plan de marketing'], correctAnswer: 'Una lista de objetivos para el sprint actual' }
];

const triviaModule2 = [
  { question: '¿Qué es Design Thinking?', options: ['Una herramienta', 'Un enfoque para resolver problemas creativamente'], correctAnswer: 'Un enfoque para resolver problemas creativamente' },
  { question: '¿Cuál es la primera etapa del Design Thinking?', options: ['Ideación', 'Empatizar'], correctAnswer: 'Empatizar' },
  { question: '¿Qué se busca en la etapa de Empatizar?', options: ['Entender a los usuarios y sus necesidades', 'Crear prototipos'], correctAnswer: 'Entender a los usuarios y sus necesidades' },
  { question: '¿Qué es la etapa de Definir en Design Thinking?', options: ['Identificar los problemas', 'Generar muchas ideas'], correctAnswer: 'Identificar los problemas' },
  { question: '¿Qué es la ideación en Design Thinking?', options: ['Crear prototipos', 'Generar la mayor cantidad de ideas posibles'], correctAnswer: 'Generar la mayor cantidad de ideas posibles' },
  { question: '¿Qué sucede en la etapa de Prototipar?', options: ['Se construyen soluciones tangibles', 'Se entrevistan usuarios'], correctAnswer: 'Se construyen soluciones tangibles' },
  { question: '¿Qué se hace en la fase de Pruebas en Design Thinking?', options: ['Evaluar prototipos con los usuarios', 'Definir el problema'], correctAnswer: 'Evaluar prototipos con los usuarios' },
  { question: '¿Qué es la mentalidad de crecimiento en el contexto del Design Thinking?', options: ['Una actitud para recibir feedback y mejorar', 'Una forma de evitar errores'], correctAnswer: 'Una actitud para recibir feedback y mejorar' },
  { question: '¿Cómo ayuda Design Thinking a los equipos?', options: ['Promueve el pensamiento creativo y enfocado en el usuario', 'Establece reglas estrictas para evitar errores'], correctAnswer: 'Promueve el pensamiento creativo y enfocado en el usuario' },
  { question: '¿Cuál es el objetivo principal del Design Thinking?', options: ['Desarrollar soluciones innovadoras centradas en las personas', 'Hacer más rápida la producción'], correctAnswer: 'Desarrollar soluciones innovadoras centradas en las personas' }
];

const activityData = [
  { name: 'Enero', estudio: 30, examenes: 20 },
  { name: 'Febrero', estudio: 25, examenes: 15 },
];
export default function Reports() {
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModule, setActiveModule] = useState(modules[0].title);

  const filteredModules = modules.filter((module) =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-purple-600">Curso: Introducción al usuario</h1>
        <h2 className="text-2xl font-semibold mb-4">Hola, María</h2>
        <div className="flex gap-4 border-b">
          {['General', 'Temas', 'Progreso', 'Encuesta'].map((tab) => (
            <button
              key={tab.toLowerCase()}
              className={`px-4 py-2 focus:outline-none ${
                activeTab === tab.toLowerCase() ? 'border-b-2 border-purple-600 text-purple-600 font-semibold' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido dependiendo de la pestaña activa */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          {/* Caja de bienvenida */}
          <div className="bg-purple-100 p-6 rounded-lg">
            <p className="text-gray-800">
              Bienvenida a tu espacio personal de crecimiento. Aquí podrás visualizar tu progreso en la plataforma,
              destacando los logros alcanzados y las áreas en las que puedes seguir mejorando.
            </p>
          </div>

          {/* Tareas del día */}
          <div className="bg-purple-600 text-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Tareas del día</h2>
            <ul className="list-disc list-inside">
              <li>Completar el módulo 1</li>
              <li>Revisar el material complementario</li>
              <li>Participar en el foro</li>
            </ul>
          </div>

          {/* Progreso General */}
          <div className="bg-purple-100 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold">Progreso</p>
                <p className="text-2xl font-bold text-purple-600">100%</p>
                <div className="flex space-x-4 text-gray-700 mt-2">
                  <p>Módulos completados: 3</p>
                  <p>Pendientes: 0</p>
                </div>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Descargar certificado</button>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div className="bg-purple-600 h-4 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Busca tu módulo aquí"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Lista de módulos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {filteredModules.map((module) => (
              <div
                key={module.id}
                className={`p-4 rounded-lg border cursor-pointer ${
                  activeModule === module.title ? 'bg-purple-100 border-purple-600' : 'bg-gray-100'
                }`}
                onClick={() => setActiveModule(module.title)}
              >
                <div className="flex items-center">
                  <div
                    className={`h-10 w-10 mr-3 flex items-center justify-center rounded-full text-xl ${
                      activeModule === module.title
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-600 border border-purple-600'
                    }`}
                  >
                    {module.icon}
                  </div>
                  <h3 className="font-semibold">{module.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Renderizar trivia del módulo activo */}
          <div className="mt-6">
            {activeModule === 'Módulo General' && <Trivia questions={triviaGeneral} />}
            {activeModule === 'Módulo 1' && <Trivia questions={triviaModule1} />}
            {activeModule === 'Módulo 2' && <Trivia questions={triviaModule2} />}

            {/* Felicidades Section */}
            <div
              className="mt-6 p-6 rounded-lg flex items-center"
              style={{ background: 'linear-gradient(to right, #FDEFF9, #EC38BC)' }}
            >
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 text-purple-800">¡Felicidades!</h2>
                <p className="text-gray-800">
                  No olvides descargar tu certificado y adjuntarlo en tu avance profesional.
                </p>
              </div>
              <div className="w-32 h-32">
                <img src="/path/to/rocket.png" alt="Cohete" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pestaña Temas */}
      {activeTab === 'temas' && (
        <div className="space-y-4">
          <ModuleCard title="Propuesta de valor" description="Analizar a fondo las necesidades y expectativas del público objetivo." status="PENDIENTE" />
          <ModuleCard title="Conociendo al usuario" description="Empieza a entender mejor quién es tu usuario, sus intereses y desafíos." progress={40} />
          <ModuleCard title="Conociendo la problemática" description="Cada emprendimiento enfrenta desafíos únicos." status="COMPLETADO" />
        </div>
      )}

      {/* Pestaña Progreso */}
      {activeTab === 'progreso' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Horas de Estudio</h2>
            <ActivityChart data={activityData} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskStatus title="PENDIENTES" count={5} bgColor="bg-purple-100" />
            <TaskStatus title="EN PROGRESO" count={3} bgColor="bg-pink-100" />
            <TaskStatus title="COMPLETADAS" count={12} bgColor="bg-blue-100" />
          </div>
        </div>
      )}

      {/* Pestaña Encuesta */}
      {activeTab === 'encuesta' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Encuesta de Satisfacción</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué te pareció el curso?</label>
              <textarea className="w-full p-2 border rounded-md" rows={4} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Califica del 1 al 5</label>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button key={rating} type="button" className="w-10 h-10 rounded-full border-2 border-purple-600 flex items-center justify-center">
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Enviar Encuesta</button>
          </form>
        </div>
      )}
    </div>
  );
}
