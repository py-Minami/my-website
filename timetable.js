// 公開CSVのURL
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
    let html = "<table>";
    rows.forEach((row, i) => {
      html += "<tr>";
      row.forEach(cell => {
        if (i === 0) {
          html += `<th>${cell}</th>`; // 1行目は曜日
        } else {
          html += `<td>${cell}</td>`;
        }
      });
      html += "</tr>";
    });
    html += "</table>";

    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>時間割を読み込めませんでした。</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadTimetable);
