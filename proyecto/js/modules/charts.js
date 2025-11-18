// Charts Module
const Charts = (() => {
    const initialize = () => {
        // Verificar que los canvas existan antes de crear gráficos
        if (document.getElementById('barChart')) initializeBarChart();
        if (document.getElementById('pieChart')) initializePieChart();
        if (document.getElementById('lineChart')) initializeLineChart();
        if (document.getElementById('donutChart')) initializeDonutChart();
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
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
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
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
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
                    label: 'Ingresos ($)',
                    data: [5200, 6100, 5800, 7200, 7800, 8500],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const initializeDonutChart = () => {
        const donutCtx = document.getElementById('donutChart').getContext('2d');
        new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Papel', 'Plástico', 'Cartón'],
                datasets: [{
                    data: [1450, 650, 350],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    };

    return {
        initialize
    };
})();
