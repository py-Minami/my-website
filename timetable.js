// スプレッドシートのCSV出力URL
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSVfPJXr6fkdax4wTRxE6GCIBuacewn4x2zYv08P6iVNQeFqGoTqAOh6a1akUSXZNRck5AyKT-r7S4/pub?output=csv";

// CSVを取得して表に変換して表示
fetch(csvUrl)
  .then(res => res.text())
  .then(csvText => {
    const rows = csvText.trim().split("\n").map(row => row.split(","));
    const table = document.createElement("table");

    rows.forEach((cols, rowIndex) => {
      const tr = document.createElement("tr");
      cols.forEach(col => {
        const cell = document.createElement(rowIndex === 0 ? "th" : "td");
        cell.textContent = col;
        tr.appendChild(cell);
      });
      table.appendChild(tr);
    });

    const timetableDiv = document.getElementById("timetable");
    timetableDiv.innerHTML = ""; // "読み込み中..." を消す
    timetableDiv.appendChild(table);
  })
  .catch(error => {
    console.error("CSV取得エラー:", error);
    document.getElementById("timetable").textContent = "時間割の読み込みに失敗しました。";
  });
