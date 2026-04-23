# 📗 Emprunt Service (Microservice)

C'est le microservice orienté comportement qui gère les processus d'emprunts (location) et retours de livres. Il **communique dynamiquement** avec le `livre-service` afin de vérifier et de mettre à jour le statut des livres.

## 🛠️ Stack Technique
- **Node.js** & **Express**
- **TypeScript** (avec ES Modules via `tsx`)
- **MongoDB** avec Mongoose
- **Axios** (Pour parler au `livre-service` en temps réel)
- **Vitest** & **Supertest** (Pour tester les routes proprement)

## 📁 Structure du Projet
```bash
src/
  ├── config/        # Connexion MongoDB Atlas (db.ts)
  ├── controllers/   # Logique complexe métier (empruntController.ts) 
  ├── models/        # Schéma d'Emprunt: userName, bookId, dateEmprunt, dateRetour (Emprunt.ts)
  ├── routes/        # Appels vers Express Router (empruntRoutes.ts, empruntRoutes.test.ts)
  └── server.ts      # Fichier d'initialisation de l'application
```

## 🔌 API Routes (Endpoints)
Ce service écoute sur le port **`3002`**. L'URL ciblée pour la communication est configurée par la variable `LIVRE_SERVICE_URL`.

| Méthode | Route | Body Requis / Opération Inter-services |
|---|---|---|
| `GET` | `/emprunts` | Récupère tous les historiques d'emprunt. |
| `GET` | `/emprunts/:id` | Récupère les données d'un emprunt unique. |
| `POST` | `/emprunts` | **Requis**: `{ userName, bookId }`.<br>1. GET livre-service `available === true` ?<br>2. Si oui: Sauvegarder `Emprunt`.<br>3. PUT livre-service `available: false`. |
| `PUT` | `/emprunts/:id` | **Requis**: `{ dateRetour: "..." }`.<br>Assigne une date de retour. Par effet de bord, déclenche un appel PUT livre-service `available: true`. |

## 🧪 Exécution des Tests
Les tests mockent `Axios` pour garantir un test isolé des appels inter-services.
```bash
npm run test
```

## 🚀 Lancer le Service
Votre fichier `.env` a besoin de :
- `PORT=3002`
- `MONGO_URI=mongodb+srv://...`
- `LIVRE_SERVICE_URL=http://localhost:3001` (URL du premier service)

Pour le démarrer:
```bash
npm run dev
```
