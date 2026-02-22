import TaskCard from "./TaskCard";

const ListTask = ({ tasks, loading, completedCount, onNewTask, onToggleDone, onEdit, onDelete }) => {
  return (
    <>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div className="stats-card">
          <span className="stats-number">{tasks.length}</span>
          <span className="stats-label">Total de Tareas</span>
        </div>
        <div className="stats-card">
          <span className="stats-number">{completedCount}</span>
          <span className="stats-label">Completadas</span>
        </div>
        <div className="stats-card">
          <span className="stats-number">{tasks.length - completedCount}</span>
          <span className="stats-label">Pendientes</span>
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Cargando tareas...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-clipboard-list empty-icon" />
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            ¡No hay tareas aún!
          </h3>
          <p style={{ marginBottom: "1.5rem" }}>
            Crea tu primera tarea para comenzar a organizarte
          </p>
          <button className="btn-gradient" onClick={onNewTask}>
            <i className="fas fa-plus" />
            Crear Primera Tarea
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "1.5rem" }}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleDone={onToggleDone}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ListTask;
