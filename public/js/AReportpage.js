  function markResolved(element) {
    const row = element.closest("tr");
    const statusCell = row.children[5];
    statusCell.innerHTML = `<span class="AReportpage-status-resolved">Resolved</span>`;
    alert("✅ Report has been marked as resolved.");
  }

  function deleteReport(element) {
    if (confirm("Are you sure you want to delete this report?")) {
      const row = element.closest("tr");
      row.remove();
    }
  }