backend_msa
TL;DR
API backend construido con NestJS (TypeScript). Implementa microservicios / endpoints REST para la aplicación principal. Ideal para mostrar diseño de API, autenticación JWT, y pruebas.

Demo

(Agregar aquí URL de demo / Postman collection / screenshots si tienes)
Características principales

API REST con NestJS
Autenticación JWT
ORM TypeORM (MySQL)
Validaciones con class-validator
Pruebas unitarias con Jest
Scripts para desarrollo, pruebas y build
Stack técnico

Node.js + TypeScript
NestJS
TypeORM + MySQL
Jest, Supertest
eslint + prettier
Instalación (en <10 min)

git clone https://github.com/PatoV16/backend_msa.git
cd backend_msa
npm install
cp .env.example .env (ajusta los valores)
npm run start:dev
Scripts útiles

npm run start — arranca la app (Nest)
npm run start:dev — desarrollo con watch
npm run build — compila TypeScript (dist/)
npm run test — corre tests unitarios
npm run test:e2e — integra tests e2e
Variables de entorno (ejemplo)

ver .env.example
Buenas prácticas incluidas

Lint y format (eslint + prettier)
Estructura modular de NestJS
Tests básicos con Jest
Cómo probar endpoints localmente

Levanta la DB (MySQL) y configura .env
Ejecuta npm run start:dev
Usa Postman o curl para probar /health y endpoints principales
Próximos pasos / mejoras sugeridas

Añadir documentación OpenAPI (Swagger)
Añadir CI que ejecute build + lint + test (archivo propuesto)
Añadir Docker Compose para levantar DB + app
Contacto

Autor: PatoV16

Licencia: MIT
