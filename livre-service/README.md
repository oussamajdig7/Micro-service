# 📘 Livre Service (Microservice)

C'est le microservice responsable de la gestion du catalogue des livres. Il stocke et met à jour l'inventaire des livres dans la base de données.

## 🛠️ Stack Technique
- **Node.js** & **Express**
- **TypeScript** (avec les modules ES `type: "module"`)
- **MongoDB** avec Mongoose
- **Vitest** & **Supertest** (Pour les tests Unitaires et d'Intégration)

## 📁 Structure du Projet
```bash
src/
  ├── config/        # Fichier de connexion à MongoDB (db.ts)
  ├── controllers/   # Logique métier des requêtes de livres (bookController.ts)
  ├── models/        # Définition du Mongoose Schema 'Book' (Book.ts)
  ├── routes/        # Configuration du routeur Express et tests (bookRoutes.ts, bookRoutes.test.ts)
  └── server.ts      # Le point d'entrée principal qui s'occupe de l'écoute du serveur
```

## 🔌 API Routes (Endpoints)
Le service tourne par défaut sur le port **`3001`**. Voici les routes disponibles :

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/books` | Récupérer la liste complète des livres existants. |
| `POST` | `/books` | Ajouter et créer un nouveau livre. |
| `GET` | `/books/:id` | Récupérer les détails d'un livre en utilisant son ObjectId. |
| `PUT` | `/books/:id` | Mettre à jour un livre (souvent appelé par `emprunt-service` pour modifier l'état `available`). |

## 🧪 Exécution des Tests
Les tests mockent la base de données et valident la fiabilité des endpoints directement. Exécutez la commande :
```bash
npm run test
```

## 🚀 Lancer le Service
Configurez les données de connexion sur votre fichier `.env` :
- `PORT=3001`
- `MONGO_URI=mongodb+srv://...`

Lancer en mode développement:
```bash
npm run dev
```
