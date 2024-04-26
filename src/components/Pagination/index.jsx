const Pagination = ({ currentPage, handlePageChange, totalPages }) => {
  return (
    <div className="pagination-main-container">
      <button
        disabled={currentPage === 1}
        style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>
      <span className="page-indicator">
        {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        style={{
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
