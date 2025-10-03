// 公開CSVのURL
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSVfPJXr6fkdax4wTRxE6GCIBuacewn4x2zYv08P6iVNQeFqGoTqAOh6a1akUSXZNRck5AyKT-r7S4/pub?output=csv";

async function loadTimetable() {
  const container = document.getElementById("timetable");

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("ネットワークエラー");

    const text = await response.text();

    CSVを行ごとに分割
    const rows = text.trim().split("\n").map(r => r.split(","));

    if (rows.length === 0) {
      container.innerHTML = "<p>時間割データがありません。</p>";
      return;
    }

    // 1行目を曜日ラベルとする
    const headers = rows[0];
    const days = headers.map((day, i) => {
      // 各曜日の授業リスト
      const items = [];
      for (let r = 1; r < rows.length; r++) {
        if (rows[r][i] && rows[r][i].trim() !== "") items.push(rows[r][i].trim());
      }
      if (items.length === 0) items.push("授業なし");
      return { day, items };
    });

    // HTML生成（カード形式）
    let html = "";
    days.forEach(d => {
      html += `
        <div class="card">
          <h3>${d.day}</h3>
          <ul>
            ${d.items.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>時間割を読み込めませんでした。</p>";
  }
}

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", loadTimetable);
