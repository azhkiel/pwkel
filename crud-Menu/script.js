document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("mentalHealthForm");
    const dataList = document.getElementById("dataList");
    const ctx = document.getElementById("moodChart").getContext("2d");
    let entries = [];
    let moodCounts = { Happy: 0, Sad: 0, Anxious: 0, Depressed: 0 };
    let moodChart;

    function initializeChart() {
        moodChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(moodCounts),
                datasets: [{
                    label: "Jumlah Mood",
                    data: Object.values(moodCounts),
                    backgroundColor: ["#4CAF50", "#FF5722", "#FFC107", "#2196F3"],
                }],
            },
        });
    }

    function updateChart() {
        moodChart.data.datasets[0].data = Object.values(moodCounts);
        moodChart.update();
    }

    function renderTable() {
        dataList.innerHTML = "";
        resetMoodCounts();
        entries.forEach((entry, index) => {
            moodCounts[entry.feeling]++;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.feeling}</td>
                <td>
                    <button onclick="deleteEntry(${index})">Hapus</button>
                </td>
            `;
            dataList.appendChild(row);
        });
        updateChart();
    }

    function resetMoodCounts() {
        moodCounts = { Happy: 0, Sad: 0, Anxious: 0, Depressed: 0 };
    }

    function addEntry(name, feeling) {
        if (name && feeling) {
            entries.push({ name, feeling });
            renderTable();
            form.reset();
        }
    }

    function deleteEntry(index) {
        entries.splice(index, 1);
        renderTable();
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const feeling = document.getElementById("feeling").value;
        addEntry(name, feeling);
    });

    window.deleteEntry = deleteEntry;
    initializeChart();
});
