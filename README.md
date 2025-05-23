# Food E-commerce App

## Database Configuration for Multiple Users

This application supports both local development and cloud database connections. To make the app accessible to multiple users, you need to configure a cloud-hosted database.

### Local Development

For local development, the following database configuration is used by default:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysql
DB_NAME=food_ecommerce
DB_PORT=3306
USE_CLOUD_DB=false
```

### Cloud Database Setup

To deploy with a cloud database:

1. Sign up for a cloud database service (MySQL compatible):
   - [PlanetScale](https://planetscale.com/) (Free tier available)
   - [Railway](https://railway.app/) (Free tier available)
   - [Amazon RDS](https://aws.amazon.com/rds/) (AWS Free tier includes MySQL)
   - [Google Cloud SQL](https://cloud.google.com/sql)
   - [Azure Database for MySQL](https://azure.microsoft.com/en-us/services/mysql/)

2. Create a MySQL database in your chosen cloud provider

3. Update the `.env` file with your cloud database credentials:
   ```
   DB_HOST=your-cloud-database-host.example.com
   DB_USER=your_cloud_db_username
   DB_PASSWORD=your_cloud_db_password
   DB_NAME=food_ecommerce
   DB_PORT=3306 (or your cloud provider's port)
   USE_CLOUD_DB=true
   NODE_ENV=production
   ```

4. Run database setup script to initialize the cloud database schema:
   ```
   node scripts/setup-db.js
   ```

5. Deploy your application to a hosting service like:
   - [Render](https://render.com/)
   - [Heroku](https://www.heroku.com/)
   - [Railway](https://railway.app/)
   - [Vercel](https://vercel.com/)

### Switching Between Local and Cloud Databases

- Set `USE_CLOUD_DB=true` in your `.env` file to use cloud database configuration
- Set `USE_CLOUD_DB=false` to use local database configuration

## Deploying to Production

When deploying to production:

1. Set `NODE_ENV=production` in your `.env` file
2. Set `USE_CLOUD_DB=true` to use cloud database settings
3. Update other environment variables as needed for production (JWT_SECRET, COOKIE_SECRET, etc.)
4. Make sure to properly configure SSL and security settings

## Database Schema Setup

The database schema is automatically created by running:

```
node scripts/setup-db.js
```

This script creates all necessary tables and initial data for the application.

# E-commerce# Food-Ecommerce
# Phali-Food-Ecommerce
#   f r o n t e n d _ f o o d _ e c o m m e r c e  
 #   f r e s h _ f o o d _ e c o m m e r c e  
 