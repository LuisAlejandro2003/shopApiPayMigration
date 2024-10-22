module.exports = {
    // Indica que debe usar ts-jest como preprocesador de TypeScript
    preset: 'ts-jest',
    // Configuración para ignorar el directorio dist si es que existe
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    // Indica dónde buscar los archivos de prueba
    testMatch: ['**/*.e2e-spec.ts'],
    // Mapeo de rutas para resolver módulos, como los de 'src'
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    // Configura el entorno de prueba para Node.js
    testEnvironment: 'node',
  };
  