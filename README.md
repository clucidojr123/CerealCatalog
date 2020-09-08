# [CerealCatalog](https://cerealcatalog.herokuapp.com/)

The Cereal Catalog is a community-driven cereal database project. Registered users can create, read, update, and delete cereals, with comment sections underneath each cereal.

## Installation

Here are the prerequisites needed to install and start the application:

```bash
node 12.x.x
npm 6.x.x
```
You can clone the repository by typing into the command line:
```bash
git clone https://github.com/clucidojr123/CerealCatalog.git
```
To install packages needed for the application:
```bash
cd CerealCatalog
npm install
```
Next you will need to create a .env file and supply values for environment variables:
```bash
touch .env
---- In the .env file ----
DBCONNECT=x
SECRET=x
PORT=x
```
To start the app:
```bash
npm start
```
To view the app on your local machine (port will depend on the value provided in the .env file): 
```bash
https://localhost:3000
```
## Built with the MEN stack
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)

## Author
Cesare Lucido

## License
[MIT](https://choosealicense.com/licenses/mit/)