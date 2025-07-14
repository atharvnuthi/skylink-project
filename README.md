# SkyLink - Full-Stack Web Page

**SkyLink** is a fictional startup offering satellite internet connectivity for remote areas. This is a project for a website, developed using **React**, **Bootstrap**, **Spring Boot**, and **PostgreSQL**, focusing on responsive design and smooth animations.

## Technologies Used

### Frontend

- **React** with **TypeScript**
- **Vite** for build tooling
- **TanStack Query** for API state management
- **Bootstrap** for responsive design
- **AOS (Animate On Scroll)** for animations

### Backend

- **Spring Boot** with **Java**
- **PostgreSQL** database
- **REST APIs** for data communication
- **JPA/Hibernate** for data persistence

### Additional

- **Google Maps Embed API** for location services
- **Axios** for HTTP requests

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Java** (JDK 11 or higher)
- **PostgreSQL** (v12 or higher)
- **Git**

## Database Setup

1. **Install PostgreSQL** if you haven't already
2. **Create a new database**:
   ```sql
   CREATE DATABASE skylink_db;
   ```
3. **Create a user** (optional but recommended):
   ```sql
   CREATE USER skylink_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE skylink_db TO skylink_user;
   ```

## Environment Variables

### Backend (Spring Boot)

Update `application.properties` file in `server/src/main/resources/` with:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/skylink_db
spring.datasource.username=skylink_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=8080
```

### Frontend (React/Vite)

Create a `.env` file in the `client/` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Google Maps API (if using)
VITE_GOOGLE_MAPS_API_KEY=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/atharvnuthi/skylink-project.git
cd skylink-project
```

### 2. Backend Setup

```bash
cd server

# Make gradlew executable (Linux/Mac)
chmod +x gradlew

# Build and run the Spring Boot application
./gradlew bootRun

# Alternative: Using Gradle Wrapper (Windows)
gradlew.bat bootRun
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Default URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Database**: localhost:5432 (PostgreSQL default port)

## API Endpoints

### Authentication

- `POST /api/usuarios/login` - User login
- `POST /api/usuarios/cadastrar` - User registration

### Products

- `GET /api/produtos` - Get all products (with pagination)
- `GET /api/produtos/{id}` - Get product by ID
- `POST /api/produtos` - Create new product
- `PUT /api/produtos/{id}` - Update product
- `DELETE /api/produtos/{id}` - Delete product

### Categories

- `GET /api/categorias` - Get all categories
- `GET /api/categorias/{id}` - Get category by ID
- `POST /api/categorias` - Create new category
- `PUT /api/categorias/{id}` - Update category
- `DELETE /api/categorias/{id}` - Delete category

### Shopping Cart

- `GET /api/carrinho/usuario/{usuarioId}` - Get user's cart
- `POST /api/carrinho/adicionar` - Add item to cart
- `PUT /api/carrinho/atualizar/{itemId}` - Update cart item quantity
- `DELETE /api/carrinho/remover/{itemId}` - Remove item from cart
- `DELETE /api/carrinho/limpar/{usuarioId}` - Clear user's cart

### Favorites

- `GET /api/favoritos/usuario/{usuarioId}` - Get user's favorites
- `POST /api/favoritos/adicionar` - Add product to favorites
- `DELETE /api/favoritos/remover` - Remove product from favorites
- `GET /api/favoritos/verificar/{usuarioId}/{produtoId}` - Check if product is favorited

## Features

- **User Authentication** - Login and registration system
- **Product Management** - Browse, search, and manage products
- **Category Management** - Organize products by categories
- **Shopping Cart** - Add/remove items, update quantities
- **Favorites** - Save favorite products
- **Responsive Design** - Works on desktop and mobile devices
- **Smooth Animations** - Enhanced user experience with AOS

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is for educational purposes.
