# Setup the database

After installing PostgreSQL
Run the following in `psql`:

```sql
CREATE ROLE pmeu WITH LOGIN PASSWORD 'pmeu';
CREATE DATABASE tripify OWNER pmeu;
```
