// Sales Module
const Sales = (() => {
    const salesData = [
        { id: 1, material: 'Papel Bond Blanco', type: 'Papel', quantity: 150, price: 1.50, total: 225, customer: 'Empresa ABC', date: '2024-11-14', time: '10:30' },
        { id: 2, material: 'Plástico PET', type: 'Plástico', quantity: 200, price: 2.00, total: 400, customer: 'Industrias XYZ', date: '2024-11-13', time: '14:15' },
        { id: 3, material: 'Cartón Corrugado', type: 'Cartón', quantity: 300, price: 1.20, total: 360, customer: 'Recicladora Norte', date: '2024-11-13', time: '09:45' }
    ];

    const renderRecent = () => {
        const container = document.getElementById('recentSales');
        container.innerHTML = '';
        
        salesData.forEach(sale => {
            const badgeClass = sale.type === 'Papel' ? 'badge-papel' : 
                              sale.type === 'Plástico' ? 'badge-plastico' : 'badge-carton';
            
            const saleEl = document.createElement('div');
            saleEl.className = 'border rounded p-3';
            saleEl.innerHTML = `
                <div class="row g-3">
                    <div class="col-6 col-md-3">
                        <p class="text-muted small mb-1">MATERIAL</p>
                        <p class="mb-1">${sale.material}</p>
                        <span class="badge ${badgeClass}">${sale.type}</span>
                    </div>
                    <div class="col-6 col-md-2">
                        <p class="text-muted small mb-1">CANTIDAD</p>
                        <p class="mb-0">${sale.quantity} kg</p>
                    </div>
                    <div class="col-6 col-md-2">
                        <p class="text-muted small mb-1">TOTAL</p>
                        <p class="mb-0 text-success">$${sale.total.toFixed(2)}</p>
                    </div>
                    <div class="col-6 col-md-3">
                        <p class="text-muted small mb-1">CLIENTE</p>
                        <p class="mb-0">${sale.customer}</p>
                    </div>
                    <div class="col-12 col-md-2 text-md-end">
                        <p class="text-muted small mb-1">
                            <i class="fas fa-calendar me-1"></i>${sale.date}
                        </p>
                        <p class="text-muted small mb-1">
                            <i class="fas fa-clock me-1"></i>${sale.time}
                        </p>
                        <button class="btn btn-sm btn-outline-secondary mt-2">Ver Detalles</button>
                    </div>
                </div>
            `;
            container.appendChild(saleEl);
        });
    };

    const updateCalculations = () => {
        const material = document.getElementById('saleMaterial').value;
        const quantity = parseFloat(document.getElementById('saleQuantity').value) || 0;
        
        const prices = {
            'papel': 1.50,
            'plastico': 2.00,
            'carton': 1.20
        };
        
        const types = {
            'papel': '<span class="badge badge-papel">Papel</span>',
            'plastico': '<span class="badge badge-plastico">Plástico</span>',
            'carton': '<span class="badge badge-carton">Cartón</span>'
        };
        
        if (material) {
            const price = prices[material];
            const total = quantity * price;
            
            document.getElementById('saleType').innerHTML = types[material];
            document.getElementById('salePrice').textContent = `$${price.toFixed(2)}`;
            document.getElementById('saleTotal').textContent = `$${total.toFixed(2)}`;
        } else {
            document.getElementById('saleType').textContent = 'Auto-completado';
            document.getElementById('salePrice').textContent = '$0.00';
            document.getElementById('saleTotal').textContent = '$0.00';
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        const material = document.getElementById('saleMaterial').value;
        const quantity = document.getElementById('saleQuantity').value;
        const total = document.getElementById('saleTotal').textContent;
        
        UI.showToast('Venta registrada exitosamente', `${quantity}kg de ${material} por ${total}`, 'success');
        
        e.target.reset();
        updateCalculations();
    };

    return {
        renderRecent,
        updateCalculations,
        submit
    };
})();
