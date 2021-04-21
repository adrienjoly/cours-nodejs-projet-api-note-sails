# API de Gestion de notes

[URL du Projet](https://note-api-2021.herokuapp.com/)

[Professeur: Adrien Joly](https://adrienjoly.com/) ||
[sujet du Projet](https://adrienjoly.com/cours-nodejs/00-projet/)

### Équipe

- DOUKOURE Salayna
- JAUCH Anthony
- KAMINOWICZ Dan
- OULD-SAID Aghilas

### Variables d'environnements

- **MONGO_URI**: URL de la base de donnée Mongo
- **PORT**: Port d'écoute du serveur
- **JWT_KEY**: Clé de décryptage des token

## Installation

### Clonage du Projet

```sh
git clone https://github.com/Salayna/note-api note_api
cd note_api
npm install
```

### Utilisation en local

- Créer à la racine une fichier `.env` et y ajouter les variables d'environnements cités plus haut

- Lancer le projet avec la commande `npm run dev`

### Endoints

- 'POST /signup'  
  _Fonction_: Créer un nouvel utilisateur  
  _Header_: aucun  
  _Corps de la requête_:
  ```json
  {
    "username": "{username}",
    "password": "{password}"
  }
  ```
  Réponse:
  ```json
  {
    "error": null || {error Message},
    "token": {Token Génrer par l'API}
  }
  ```
- 'POST /signin'  
  _Fonction_: Créer un nouvel utilisateur  
  _Header_: aucun  
  _Corps de la requête_:
  ```json
  {
    "username": "{username}",
    "password": "{password}"
  }
  ```
  Réponse:
  ```json
  {
    "error": null || {error Message},
    "token": {Token Génrer par l'API}
  }
  ```
- 'GET /notes'
  Fonction: Créer un nouvel utilisateur  
  Header: `'x-access-token': {Token Générer par l'API}`  
  Réponse:

  ```json
  {
    "error": null || {error Message},
    "notes": {Tableau de Notes}
  }
  ```

- 'PUT /notes'
  Fonction: Créer un nouvel utilisateur  
  Header: aucun  
  Corps de la requête:

  ```json
  {
    "content": "{Contenue de la note}"
  }
  ```

- 'PATCH /notes/:id'
  Fonction: Créer un nouvel utilisateur  
  Header: aucun  
  Corps de la requête:

  ```json
  {
    "content": "{Contenue de la note}"
  }
  ```

- 'DELETE /notes/:id'
  Fonction: Créer un nouvel utilisateur  
  Header: aucun  
  Corps de la requête:
  ```json
  {
    "content": "{Contenue de la note}"
  }
  ```
