# Clouth

## Better-Auth migrations with prisma for Cloudflare D1

```bash
# First time
# Generate prisma schema
pnpx prisma generate
pnpx @better-auth/cli@latest generate

# Create DB
DB_NAME=prisma-demo-db
pnpx wrangler d1 create $DB_NAME

# Create migration files
pnpx wrangler d1 migrations create $DB_NAME create_user_table
pnpx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_create_user_table.sql

# Apply migrations
pnpx wrangler d1 migrations apply $DB_NAME --local
# or
pnpx wrangler d1 migrations apply $DB_NAME --remote
```
