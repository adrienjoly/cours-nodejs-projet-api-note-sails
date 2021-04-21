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

- **'POST /signup'**  
  _Fonction_: Créer un nouvel utilisateur  
  _Corps de la requête_:
  ```json
  {
    "username": "{username}",
    "password": "{password}"
  }
  ```
  _Réponse_:
  ```json
  {
    "error": "null || {error Message}",
    "token": "{Token Génrer par l'API}"
  }
  ```
- **'POST /signin'**  
  _Fonction_: Créer un nouvel utilisateur  
  _Corps de la requête_:
  ```json
  {
    "username": "{username}",
    "password": "{password}"
  }
  ```
  _Réponse_:
  ```json
  {
    "error": "null || {error Message}",
    "token": "{Token Génrer par l'API}"
  }
  ```
- **'GET /notes'**
  _Fonction_: Créer un nouvel utilisateur  
  _Header_: `'x-access-token': {Token Générer par l'API}`  
  _Réponse_:

  ```json
  {
    "error": "null || {error Message}",
    "notes": "{Tableau de Notes}"
  }
  ```

- **'PUT /notes'**
  _Fonction_: Créer un nouvel utilisateur  
  _Header_: `'x-access-token': {Token Générer par l'API}`  
  _Corps de la requête_:

  ```json
  {
    "content": "{Contenue de la note}"
  }
  ```

  _Réponse_:

  ```json
  {
    "error": "null || {error Message}",
    "note": "{Note nouvellement créer}"
  }
  ```

- **'PATCH /notes/:id'**
  _Fonction_: Créer un nouvel utilisateur  
  _Header_: `'x-access-token': {Token Générer par l'API}`  
  _Corps de la requête_:

  ```json
  {
    "content": "{Contenue de la note}"
  }
  ```

  _Réponse_:

  ```json
  {
    "error": "null || {error Message}",
    "note": "{Note nouvellement éditer}"
  }
  ```

- **'DELETE /notes/:id'**
  _Fonction_: Créer un nouvel utilisateur  
  _Header_: `'x-access-token': {Token Générer par l'API}`  
  _Corps de la requête_:

  ```json
  {
    "content": "{Contenue de la note}"
  }
  ```

  _Réponse_:

  ```json
  {
    "error": "null || {error Message}",
    "note": "{Note supprimer}"
  }
  ```
