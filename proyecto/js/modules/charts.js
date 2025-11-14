// Charts Module
const Charts = (() => {
    const initialize = () => {
        initializeBarChart();
        initializePieChart();
        initializeLineChart();
    };

    const initializeBarChart = () => {
        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Papel',
                    data: [450, 520, 480, 590, 620, 680],
                    backgroundColor: '#10b981'
                }, {
                    label: 'Plástico',
                    data: [320, 380, 420, 450, 510, 560],
                    backgroundColor: '#3b82f6'
                }, {
                    label: 'Cartón',
                    data: [280, 310, 340, 380, 420, 450],
                    backgroundColor: '#f59e0b'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const initializePieChart = () => {
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Papel', 'Plástico', 'Cartón'],
                datasets: [{
                    data: [3340, 2640, 2180],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    };

    const initializeLineChart = () => {
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Ingresos',
                    data: [5200, 6100, 5800, 7200, 7800, 8500],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return {
        initialize
    };
})();
