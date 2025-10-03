// 公開CSVのURL（CSV形式で公開していることが前提）
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSVfPJXr6fkdax4wTRxE6GCIBuacewn4x2zYv08P6iVNQeFqGoTqAOh6a1akUSXZNRck5AyKT-r7S4/pub?output=csv";

async function loadTimetable() {
  const container = document.getElementById("timetable");

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("ネットワークエラー");

    const text = await response.text();

    // CSVを行ごとに分割
    const rows = text.trim().split("\n").map(r => r.split(","));

    if (rows.length === 0) {
      container.innerHTML = "<p>時間割データがありません。</p>";
      return;
    }

    // HTMLテーブル生成
    let html = "<table><thead><tr><th>時限</th>";
    const headers = rows[0]; // 曜日ラベル
    headers.forEach(day => {
      html += `<th>${day}</th>`;
    });
    html += "</tr></thead><tbody>";

    // 時限ごとの行
    for (let r = 1; r < rows.length; r++) {
      html += `<tr><td>${r}限</td>`; // 時限番号
      for (let c = 0; c < headers.length; c++) {
        const cell = rows[r][c] ? rows[r][c].trim() : "なし"; // 空なら「なし」
        html += `<td>${cell}</td>`;
      }
      html += "</tr>";
    }

    html += "</tbody></table>";
    container.innerHTML = html;

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>時間割を読み込めませんでした。</p>";
  }
}

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", loadTimetable);
