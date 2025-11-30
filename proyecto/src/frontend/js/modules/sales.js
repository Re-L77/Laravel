// Sales Module
const Sales = (() => {
    let salesData = [];
    let materials = [];

    const loadMaterials = async () => {
        try {
            const response = await API.materials.getAll();
            materials = response.data || [];
            populateMaterialSelect();
        } catch (error) {
            console.error('Failed to load materials:', error);
            UI.showToast('Error', 'No se pudieron cargar los materiales para la venta', 'error');
        }
    };

    const populateMaterialSelect = () => {
        const select = document.getElementById('saleMaterial');
        if (!select) return;

        select.innerHTML = '<option value="">Selecciona un material...</option>';
        materials.forEach(material => {
            const option = document.createElement('option');
            option.value = material.id;
            const price = parseFloat(material.price);
            option.textContent = `${material.name} - $${price.toFixed(2)}/kg`;
            option.dataset.price = price;
            option.dataset.category = material.category;
            select.appendChild(option);
        });
    };

    const renderRecent = async () => {
        try {
            const response = await API.sales.getRecent(10);
            salesData = response.data || [];
            displaySales();
        } catch (error) {
            console.error('Failed to load recent sales:', error);
            UI.showToast('Error', 'No se pudieron cargar las ventas recientes', 'error');
        }
    };

    const displaySales = () => {
        const container = document.getElementById('recentSales');
        if (!container) return;

        container.innerHTML = '';

        if (salesData.length === 0) {
            container.innerHTML = '<p class="text-muted text-center p-3">No hay ventas registradas</p>';
            return;
        }

        salesData.forEach(sale => {
            const badgeClass = sale.category === 'Papel' ? 'badge-papel' :
                sale.category === 'Plástico' ? 'badge-plastico' : 'badge-carton';

            const saleDate = new Date(sale.sale_date);
            const dateStr = saleDate.toLocaleDateString('es-ES');
            const timeStr = saleDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

            const totalPrice = parseFloat(sale.total_price || 0);
            const commission = parseFloat(sale.commission || 0);

            const saleEl = document.createElement('div');
            saleEl.className = 'border rounded p-3';
            saleEl.innerHTML = `
                <div class="row g-3">
                    <div class="col-6 col-md-3">
                        <p class="text-muted small mb-1">MATERIAL</p>
                        <p class="mb-1">${sale.material_name || 'Sin nombre'}</p>
                        <span class="badge ${badgeClass}">${sale.category || 'Otros'}</span>
                    </div>
                    <div class="col-6 col-md-2">
                        <p class="text-muted small mb-1">CANTIDAD</p>
                        <p class="mb-0">${sale.quantity} kg</p>
                    </div>
                    <div class="col-6 col-md-2">
                        <p class="text-muted small mb-1">COMISIÓN</p>
                        <p class="mb-0 text-success">$${commission.toFixed(2)}</p>
                    </div>
                    <div class="col-6 col-md-2">
                        <p class="text-muted small mb-1">TOTAL</p>
                        <p class="mb-0 text-primary fw-bold">$${totalPrice.toFixed(2)}</p>
                    </div>
                    <div class="col-12 col-md-3 text-md-end">
                        <p class="text-muted small mb-1">
                            <i class="fas fa-calendar me-1"></i>${dateStr}
                        </p>
                        <p class="text-muted small mb-1">
                            <i class="fas fa-clock me-1"></i>${timeStr}
                        </p>
                    </div>
                </div>
            `;
            container.appendChild(saleEl);
        });
    };

    const updateCalculations = () => {
        const materialSelect = document.getElementById('saleMaterial');
        const quantity = parseFloat(document.getElementById('saleQuantity').value) || 0;

        if (materialSelect && materialSelect.value) {
            const selectedOption = materialSelect.options[materialSelect.selectedIndex];
            const price = parseFloat(selectedOption.dataset.price);
            const category = selectedOption.dataset.category;
            const total = quantity * price;
            const commission = total * 0.1; // 10% commission

            document.getElementById('saleType').innerHTML = `<span class="badge badge-${category.toLowerCase()}">${category}</span>`;
            document.getElementById('salePrice').textContent = `$${price.toFixed(2)}`;
            document.getElementById('saleTotal').textContent = `$${total.toFixed(2)}`;
            document.getElementById('saleCommission').textContent = `$${commission.toFixed(2)}`;
        } else {
            document.getElementById('saleType').textContent = 'Selecciona material';
            document.getElementById('salePrice').textContent = '$0.00';
            document.getElementById('saleTotal').textContent = '$0.00';
            document.getElementById('saleCommission').textContent = '$0.00';
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        // Verificar permisos antes de crear venta
        if (!Permissions.hasPermission('create_sale')) {
            UI.showToast('Error de permisos', 'No tienes permiso para registrar ventas', 'error');
            return;
        }

        const materialId = document.getElementById('saleMaterial').value;
        const quantity = parseFloat(document.getElementById('saleQuantity').value);

        // Validaciones
        if (!materialId) {
            UI.showToast('Error de validación', 'Selecciona un material', 'warning');
            return;
        }
        if (isNaN(quantity) || quantity <= 0) {
            UI.showToast('Error de validación', 'La cantidad debe ser mayor a 0', 'warning');
            return;
        }

        const selectedOption = document.getElementById('saleMaterial').options[document.getElementById('saleMaterial').selectedIndex];
        const price = parseFloat(selectedOption.dataset.price);
        const total = quantity * price;

        const saleData = {
            material_id: parseInt(materialId),
            quantity: quantity,
            price: price,
            total: total
        };

        try {
            const response = await API.sales.create(saleData);
            salesData.unshift(response.data);

            const material = materials.find(m => m.id === parseInt(materialId));
            const materialName = material ? material.name : 'Material';

            UI.showToast('Venta registrada', `${quantity}kg de ${materialName} por $${total.toFixed(2)}`, 'success');

            e.target.reset();
            updateCalculations();
            renderRecent();
        } catch (error) {
            console.error('Error registering sale:', error);
            const errorMessage = error.message || 'No se pudo registrar la venta';
            UI.showToast('Error', errorMessage, 'error');
        }
    };

    return {
        loadMaterials,
        renderRecent,
        updateCalculations,
        submit
    };
})();
