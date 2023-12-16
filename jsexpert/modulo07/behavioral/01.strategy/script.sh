docker run \
  --name postgres \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD="senha001" \
  -e POSTGRES_DB=heroes \
  -p 5433:5432 \
  -d \
  postgres

# verificar está rodando
docker logs postgres

# Executar
docker exec -it postgres psql --username root --dbname heroes

### Criar tabela
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);

### Selecionar tabela
SELECT * FROM warriors;

# ---------

# mongoDB

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
  -p 27017:27017 \
  -d \
  mongo:4

# verificar está rodando
docker logs mongodb