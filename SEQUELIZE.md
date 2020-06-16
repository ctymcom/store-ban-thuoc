## Create a migration
```sh
sequelize migration:create --name <name>
```
## Run migration
- ### Run development environment
```sh
sequelize db:migrate --env development
```
- ### Run development testing
```sh
sequelize db:migrate --env testing
```
## Undo all migration
```sh
sequelize db:migrate:undo:all
```
## Undo a migration latest
```sh
sequelize db:migrate:undo
```
## Create a seed
```sh
sequelize seed:create --name <name>
```
## Run all seed
```sh
sequelize db:seed:all
```
## Run a seed
```sh
sequelize db:seed --seed <name>
```
## Undo all seed
```sh
sequelize db:seed:undo:all
```
## Undo a seed
```sh
sequelize db:seed:undo --seed <name>
```