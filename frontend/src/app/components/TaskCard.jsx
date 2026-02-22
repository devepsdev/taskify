const TaskCard = ({ task, onToggleDone, onEdit, onDelete }) => {
  return (
    <div className={`task-card ${task.done ? "completed" : ""}`}>

      <h5 className={`task-title ${task.done ? "completed" : ""}`}>
        {task.done && (
          <i className="fas fa-check-circle" style={{ marginRight: "0.5rem", color: "#28a745" }} />
        )}
        {task.title}
      </h5>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <i className="fas fa-calendar" style={{ marginRight: "0.4rem" }} />
        {new Date(task.created_at).toLocaleString("es-ES")}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <button className="btn-action btn-complete" onClick={() => onToggleDone(task)}>
          <i className={`fas ${task.done ? "fa-undo" : "fa-check"}`} style={{ marginRight: "0.3rem" }} />
          {task.done ? "Desmarcar" : "Completar"}
        </button>
        <button className="btn-action btn-edit" onClick={() => onEdit(task)}>
          <i className="fas fa-edit" style={{ marginRight: "0.3rem" }} />
          Editar
        </button>
        <button className="btn-action btn-delete" onClick={() => onDelete(task.id)}>
          <i className="fas fa-trash" style={{ marginRight: "0.3rem" }} />
          Eliminar
        </button>
      </div>

    </div>
  );
};

export default TaskCard;
