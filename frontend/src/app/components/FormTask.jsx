const FormTask = ({ formData, setFormData, editingTask, showModal, setShowModal, onSubmit }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h5 className="modal-title">
            <i className={`fas ${editingTask ? "fa-edit" : "fa-plus"}`} />
            {editingTask ? "Editar Tarea" : "Nueva Tarea"}
          </h5>
          <button className="btn-close" onClick={() => setShowModal(false)}>×</button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="modal-body">

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="task-title" className="form-label">
                <i className="fas fa-heading" style={{ marginRight: "0.4rem" }} />
                Título *
              </label>
              <input
                id="task-title"
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Escribe el título de la tarea..."
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="task-description" className="form-label">
                <i className="fas fa-align-left" style={{ marginRight: "0.4rem" }} />
                Descripción
              </label>
              <textarea
                id="task-description"
                className="form-control"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe los detalles de la tarea... (opcional)"
                style={{ resize: "vertical" }}
              />
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn-gradient">
              <i className="fas fa-save" />
              {editingTask ? "Actualizar" : "Crear"} Tarea
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default FormTask;
