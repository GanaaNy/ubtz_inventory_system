# УБТЗ — Материалын нөөцийн удирдлагын систем

Улаанбаатар төмөр замын (УБТЗ) материалын нөөц, агуулах, орлого-зарлагын гүйлгээг удирдах full-stack монорепо төсөл.

## Төслийн бүтэц

```
ubtz_inventory_system/
├── ubtaz-backend/          # Spring Boot 3 + PostgreSQL + JWT
│   ├── pom.xml
│   └── src/main/
│       ├── java/mn/ubtaz/inventory/
│       │   ├── config/         # Security, JWT, CORS
│       │   ├── controller/     # REST API
│       │   ├── service/        # Бизнес логик
│       │   ├── repository/     # JPA
│       │   ├── entity/         # Өгөгдлийн загвар
│       │   ├── dto/            # Request / Response
│       │   ├── exception/      # Алдааны боловсруулалт
│       │   └── security/       # JWT шүүлтүүр
│       └── resources/
│           ├── application.yml
│           └── db/migration/   # Flyway SQL
├── ubtaz-frontend/         # React 18 + Vite + Tailwind + Zustand
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml      # PostgreSQL + pgAdmin
└── README.md
```

## Шаардлага

- **Java 17+** болон **Maven 3.9+**
- **Node.js 18+** болон **npm**
- **Docker** болон **Docker Compose**

## Суулгах заавар

### 1. Өгөгдлийн сан (Docker)

Төслийн үндсэн хавтаснаас:

```bash
docker compose up -d
```

| Үйлчилгээ   | Хаяг                         | Нэвтрэх мэдээлэл              |
|-------------|------------------------------|-------------------------------|
| PostgreSQL  | `localhost:5432`             | DB: `ubtaz_inventory`, хэрэглэгч: `ubtaz`, нууц: `ubtaz_secret` |
| pgAdmin     | http://localhost:5050        | И-мэйл: `admin@ubtaz.mn`, нууц: `admin` |

pgAdmin-д сервер нэмэхдээ host нь `postgres` (Docker сүлжээнд) эсвэл `host.docker.internal` (локал хөгжүүлэлтэд) байж болно.

### 2. Backend

```bash
cd ubtaz-backend

# Орчны хувьсагч (сонголттой)
set DB_HOST=localhost
set DB_PORT=5432
set DB_NAME=ubtaz_inventory
set DB_USER=ubtaz
set DB_PASSWORD=ubtaz_secret
set JWT_SECRET=your-256-bit-secret-key-change-in-production

mvn spring-boot:run
```

API: http://localhost:8080/api

Flyway автоматаар `V1__init_schema.sql` болон `V2__seed_data.sql` файлуудыг ажиллуулна.

**Туршилтын нэвтрэх мэдээлэл:**

| Хэрэглэгч | Нууц үг  | Эрх               |
|-----------|----------|-------------------|
| admin     | password | ADMIN             |
| manager   | password | WAREHOUSE_MANAGER |

### 3. Frontend

```bash
cd ubtaz-frontend
cp .env.example .env
npm install
npm run dev
```

Вэб: http://localhost:5173

`.env` файлд:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## API endpoint-ууд

| Метод | Зам                              | Тайлбар              |
|-------|----------------------------------|----------------------|
| POST  | `/api/auth/login`                | Нэвтрэх              |
| GET   | `/api/materials`                 | Материалын жагсаалт  |
| POST  | `/api/materials`               | Материал нэмэх       |
| GET   | `/api/inventory`                 | Гүйлгээний жагсаалт  |
| POST  | `/api/inventory/transactions`    | Орлого / зарлага     |
| GET   | `/api/reports/dashboard`         | Хяналтын самбар      |

## Хөгжүүлэлт

### Backend build

```bash
cd ubtaz-backend
mvn clean package
```

### Frontend build

```bash
cd ubtaz-frontend
npm run build
```

### Docker зогсоох

```bash
docker compose down
```

Өгөгдөл хадгалах: `docker compose down` (volume устгахгүй)

Бүрэн цэвэрлэх: `docker compose down -v`

## Технологи

| Давхарга  | Технологи                                      |
|-----------|------------------------------------------------|
| Backend   | Spring Boot 3.2, Spring Security, JWT, JPA, Flyway |
| Frontend  | React 18, Vite 5, Tailwind CSS 3, Zustand, Recharts |
| Өгөгдөл  | PostgreSQL 16                                  |
| DevOps    | Docker Compose, pgAdmin 4                      |

## Лиценз

Дотоод хэрэглээний төсөл — УБТЗ.
