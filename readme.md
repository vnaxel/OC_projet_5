## Openclassrooms - Parcours Developpeur full-stack Java et Angular - Projet 5 - Testez une application fullstack

### Mise en place du projet

Pour la base de données, il faut avoir docker installé et fonctionnel sur le poste.

depuis le repertoire `ressources`, executer `docker compose up`

### Back-end

Pour lancer le backend, la variable d'environnement $JAVA_HOME doit pointer vers une version du JDK 17 ou supérieure
Egalement pour lancer les tests du backend en ligne de commande on utilisera maven. (https://maven.apache.org/install.html)

Depuis le repertoire `back` executer `mvn clean test`

### Front-end

Depuis le repertoire `front` executer `npm i` pour installer les dépendances du projet

puis `npm run start` pour lancer le frontend

pour executer les tests frontend avec couverture executer `npm run test:coverage`

pour executer les tests end to end executer `npm run cypress:run`
puis pour consulter la couverture des tests end to end executer `npm run e2e:coverage` 

