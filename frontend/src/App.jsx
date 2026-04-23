import { useEffect, useState } from "react";
import {
  getBooks,
  createBook,
  getEmprunts,
  createEmprunt,
  returnBook,
} from "./services/api";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [emprunts, setEmprunts] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [userName, setUserName] = useState("");
  const [bookId, setBookId] = useState("");

  const loadData = async () => {
    const booksRes = await getBooks();
    const empruntsRes = await getEmprunts();
    setBooks(booksRes.data);
    setEmprunts(empruntsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Add Book
  const handleAddBook = async () => {
    await createBook({ title, author });
    setTitle("");
    setAuthor("");
    loadData();
  };

  // Create Emprunt
  const handleEmprunt = async () => {
    await createEmprunt({ userName, bookId });
    setUserName("");
    setBookId("");
    loadData();
  };

  // Return Book
  const handleReturn = async (id) => {
    await returnBook(id);
    loadData();
  };
  // Helper pour trouver le titre du livre par son ID
  const getBookTitle = (id) => {
    const book = books.find((b) => b._id === id);
    return book ? book.title : id;
  };

  return (
    <div>
      <h1>📚 Gestion Bibliothèque</h1>

      {/* ── Add Book ── */}
      <h2>Ajouter Livre</h2>
      <div className="form-section">
        <input
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Auteur"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleAddBook}>Ajouter</button>
      </div>

      {/* ── Books ── */}
      <h2>Liste des Livres</h2>
      {books.length === 0 ? (
        <div className="empty-state">Aucun livre trouvé.</div>
      ) : (
        books.map((b) => (
          <div className="book-item" key={b._id}>
            <div className="book-info">
              <span className="book-title">{b.title}</span>
              <span className="book-author">{b.author}</span>
            </div>
            {b.available ? (
              <span className="badge badge-available">✅ Disponible</span>
            ) : (
              <span className="badge badge-unavailable">❌ Non disponible</span>
            )}
          </div>
        ))
      )}

      {/* ── Emprunter ── */}
      <h2>Emprunter</h2>
      <div className="form-section">
        <input
          placeholder="Nom utilisateur"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
          <option value="">Choisir livre</option>
          {books
            .filter((b) => b.available)
            .map((b) => (
              <option key={b._id} value={b._id}>
                {b.title}
              </option>
            ))}
        </select>
        <button onClick={handleEmprunt}>Emprunter</button>
      </div>

      {/* ── Emprunts ── */}
      <h2>Liste des Emprunts</h2>
      {emprunts.length === 0 ? (
        <div className="empty-state">Aucun emprunt trouvé.</div>
      ) : (
        emprunts.map((e) => (
          <div className="emprunt-item" key={e._id}>
            <div className="emprunt-info">
              <span className="emprunt-user">{e.userName}</span>
              <span className="emprunt-book">Livre: {getBookTitle(e.bookId)}</span>
            </div>
            <div className="emprunt-actions">
              {e.dateRetour ? (
                <span className="badge badge-returned">✔ Retourné</span>
              ) : (
                <>
                  <span className="badge badge-pending">⏳ En cours</span>
                  <button className="btn-return" onClick={() => handleReturn(e._id)}>
                    Retourner
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;