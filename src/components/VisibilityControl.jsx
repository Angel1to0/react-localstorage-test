export function VisibilityControl({ setShowCompleted, clearTask, isChecked }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete it?")) {
      clearTask();
    }
  };
  return (
    <div className="d-flex justify-content-between bg-secondary text-white text-center p-2 border-secondary">
      <div className="form-check form-switch">
      <input
      className="form-check-input"
        checked={isChecked}
        type={"checkbox"}
        onChange={(e) => setShowCompleted(e.target.checked)}
      />{" "}
      <label>Show Task Done</label>
      </div>
      <button onClick={handleDelete} className="btn btn-danger btn-sm">
        Clear
      </button>
    </div>
  );
}
