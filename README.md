# Comment contribuer ?

## node.js
Pour contribuer ils vous faudra une version récente de node.js, sur osx, la version [homebrew](http://mxcl.github.com/homebrew/) est à jour alors que sous Ubuntu, il vous faudra tapper les commandes suivantes :

    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs npm

Si l'installation s'est bien déroulé vous deviez pouvoir consulter la version de votre node.js :
    
    $ node -v
    v0.8.22

Sous Ubuntu il est possible que le binaire node soit nommé `nodejs` et non `node`, dans ce cas je vous conseille de le renommer :

    sudo ln -s `which nodejs` /usr/bin/node

## redis
La base de donnés utilisé par l'application est redis. L'installation de redis est plutôt simple.

Pour les utilisateur d'Ubuntu

    sudo apt-get install redis-server

Pour les utilisateurs d'OSX

    brew install redis

Attention, sous OSX, le serveur ne se lance pas automatiquement, il faut le lancer manuellement avec la commande `redis-server`.

## developer !
Il vous faudrat installer les dépendances de l'application. Cela ce fait automatiquement avec npm.

   npm install

Cette commande récupère la liste des dépendance dans le fichier package.json et les installe dans le sous-dossier node_modules.

Je vous conseille aussi d'installer le paquet `supervisor` de NPM. Celui-ci redémarrera votre application à chaque modification d'un fichier.

    npm install -g supervisor

L'option `-g`, signifie que l'installation est "globale", le binaire `sueprvisor` est maintenant accessible depuis votre PATH. Il est possible que Ubuntu demande les droits sudo pour effectuer cette commande…

Il ne vous reste plus qu'à lancer l'application

    supervisor app.js

et d'aller voir le résultat sur http://localhost:3000/.

# Contributors
- Victor Bahl
- Paul Chobert
- Alan Fonderflick
- Maxime Heckel
- Jacques KAISER
- Paul-Henri Koeck
- Baptiste Lafabregue
- Léo Unbekandt
