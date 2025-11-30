// Materials Module
const Materials = (() => {
    let materials = [];
    let deleteTargetId = null;

    const initialize = async () => {
        try {
            const response = await API.materials.getAll();
            materials = response.data || [];
            render();
        } catch (error) {
            console.error('Failed to initialize materials:', error);
            UI.showToast('Error', 'No se pudieron cargar los materiales', 'error');
            // Fallback to empty array
            materials = [];
        }
    };

    const render = () => {
        const searchTerm = document.getElementById('searchMaterial')?.value.toLowerCase() || '';
        const filtered = materials.filter(m =>
            m.name.toLowerCase().includes(searchTerm) ||
            (m.category && m.category.toLowerCase().includes(searchTerm))
        );

        const grid = document.getElementById('materialsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        filtered.forEach(material => {
            const stockStatus = getStockStatus(material.stock);

            // Asignar icono según categoría
            let icon = 'fas fa-box';
            if (material.category === 'Plástico') icon = 'fas fa-bottle-water';
            else if (material.category === 'Metal') icon = 'fas fa-coins';
            else if (material.category === 'Vidrio') icon = 'fas fa-wine-glass';
            else if (material.category === 'Papel') icon = 'fas fa-file';

            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                <div class="card material-card h-100">
                    <div class="position-relative bg-light" style="height: 200px; display: flex; align-items: center; justify-content: center;">
                        <div style="text-align: center;">
                            <i class="${icon}" style="font-size: 4rem; color: var(--emerald-600); margin-bottom: 1rem;"></i>
                        </div>
                        <span class="badge badge-${material.category?.toLowerCase().replace(/\s+/g, '')} position-absolute top-0 end-0 m-3">
                            ${material.category || 'Otros'}
                        </span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${material.name}</h5>
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted small">Stock disponible:</span>
                                <span class="${stockStatus.color}">${material.stock} kg</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted small">Precio por kg:</span>
                                <span>$${parseFloat(material.price).toFixed(2)}</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar ${stockStatus.barColor}" 
                                     style="width: ${Math.min((material.stock / 500) * 100, 100)}%"></div>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-secondary flex-fill" onclick="Materials.edit(${material.id})" ${!Permissions.hasPermission('edit_material') ? 'disabled' : ''}>
                                <i class="fas fa-edit me-1"></i>Editar
                            </button>
                            <button class="btn btn-outline-danger flex-fill" onclick="Materials.showDeleteModal(${material.id})" ${!Permissions.hasPermission('delete_material') ? 'disabled' : ''}>
                                <i class="fas fa-trash me-1"></i>Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        updateStats();
        const count = document.getElementById('materialsCount');
        if (count) {
            count.textContent = `Mostrando ${filtered.length} de ${materials.length} materiales`;
        }
    };

    const getStockStatus = (stock) => {
        if (stock < 250) return { color: 'text-danger', label: 'Stock Bajo', barColor: 'bg-danger' };
        if (stock < 400) return { color: 'text-warning', label: 'Stock Medio', barColor: 'bg-warning' };
        return { color: 'text-success', label: 'Stock Alto', barColor: 'bg-success' };
    };

    const updateStats = () => {
        const totalByCategory = {};
        materials.forEach(m => {
            const cat = m.category || 'Otros';
            totalByCategory[cat] = (totalByCategory[cat] || 0) + m.stock;
        });

        // Update stats if elements exist
        const papel = document.getElementById('totalPapel');
        const plastico = document.getElementById('totalPlastico');
        const carton = document.getElementById('totalCarton');

        if (papel) papel.textContent = `${totalByCategory['Papel'] || 0} kg`;
        if (plastico) plastico.textContent = `${totalByCategory['Plástico'] || 0} kg`;
        if (carton) carton.textContent = `${totalByCategory['Cartón'] || 0} kg`;
    };

    const add = async (e) => {
        e.preventDefault();

        // Verificar permisos antes de crear
        if (!Permissions.hasPermission('create_material')) {
            UI.showToast('Error de permisos', 'No tienes permiso para crear materiales', 'error');
            return;
        }

        const name = document.getElementById('addMaterialName').value.trim();
        const category = document.getElementById('addMaterialType').value;
        const stock = parseFloat(document.getElementById('addMaterialStock').value);
        const price = parseFloat(document.getElementById('addMaterialPrice').value);

        // Validaciones
        if (!name) {
            UI.showToast('Error de validación', 'El nombre del material es requerido', 'warning');
            return;
        }
        if (!category) {
            UI.showToast('Error de validación', 'Selecciona una categoría', 'warning');
            return;
        }
        if (isNaN(stock) || stock < 0) {
            UI.showToast('Error de validación', 'El stock debe ser un número válido', 'warning');
            return;
        }
        if (isNaN(price) || price < 0) {
            UI.showToast('Error de validación', 'El precio debe ser un número válido', 'warning');
            return;
        }

        const newMaterial = {
            name: name,
            category: category,
            stock: stock,
            price: price
        };

        try {
            const response = await API.materials.create(newMaterial);
            materials.push(response.data);
            render();

            bootstrap.Modal.getInstance(document.getElementById('addMaterialModal')).hide();
            e.target.reset();

            UI.showToast('Material agregado', `${newMaterial.name} ha sido agregado al inventario`, 'success');
        } catch (error) {
            console.error('Error adding material:', error);
            const errorMessage = error.message || 'No se pudo agregar el material';
            UI.showToast('Error', errorMessage, 'error');
        }
    };

    const edit = (id) => {
        // Verificar permisos antes de editar
        if (!Permissions.hasPermission('edit_material')) {
            UI.showToast('Error de permisos', 'No tienes permiso para editar materiales', 'error');
            return;
        }

        const material = materials.find(m => m.id === id);
        if (!material) return;

        document.getElementById('editMaterialId').value = material.id;
        document.getElementById('editMaterialName').value = material.name;
        document.getElementById('editMaterialType').value = material.category;
        document.getElementById('editMaterialStock').value = material.stock;
        document.getElementById('editMaterialPrice').value = material.price;

        new bootstrap.Modal(document.getElementById('editMaterialModal')).show();
    };

    const update = async (e) => {
        e.preventDefault();

        // Verificar permisos antes de actualizar
        if (!Permissions.hasPermission('edit_material')) {
            UI.showToast('Error de permisos', 'No tienes permiso para editar materiales', 'error');
            return;
        }

        const id = parseInt(document.getElementById('editMaterialId').value);
        const name = document.getElementById('editMaterialName').value.trim();
        const category = document.getElementById('editMaterialType').value;
        const stock = parseFloat(document.getElementById('editMaterialStock').value);
        const price = parseFloat(document.getElementById('editMaterialPrice').value);

        // Validaciones
        if (!name) {
            UI.showToast('Error de validación', 'El nombre del material es requerido', 'warning');
            return;
        }
        if (!category) {
            UI.showToast('Error de validación', 'Selecciona una categoría', 'warning');
            return;
        }
        if (isNaN(stock) || stock < 0) {
            UI.showToast('Error de validación', 'El stock debe ser un número válido', 'warning');
            return;
        }
        if (isNaN(price) || price < 0) {
            UI.showToast('Error de validación', 'El precio debe ser un número válido', 'warning');
            return;
        }

        const updated = {
            name: name,
            category: category,
            stock: stock,
            price: price
        };

        try {
            const response = await API.materials.update(id, updated);
            const index = materials.findIndex(m => m.id === id);
            if (index !== -1) {
                materials[index] = response.data;
            }

            render();
            bootstrap.Modal.getInstance(document.getElementById('editMaterialModal')).hide();

            UI.showToast('Material actualizado', `Los cambios en ${name} se han guardado`, 'success');
        } catch (error) {
            console.error('Error updating material:', error);
            const errorMessage = error.message || 'No se pudo actualizar el material';
            UI.showToast('Error', errorMessage, 'error');
        }
    };

    const showDeleteModal = (id) => {
        const material = materials.find(m => m.id === id);
        if (!material) return;

        deleteTargetId = id;
        document.getElementById('deleteMaterialName').textContent = material.name;
        new bootstrap.Modal(document.getElementById('deleteMaterialModal')).show();
    };

    const delete_material = async () => {
        // Verificar permisos antes de eliminar
        if (!Permissions.hasPermission('delete_material')) {
            UI.showToast('Error de permisos', 'No tienes permiso para eliminar materiales', 'error');
            return;
        }

        try {
            const material = materials.find(m => m.id === deleteTargetId);
            const name = material?.name || 'Material';

            await API.materials.delete(deleteTargetId);

            const index = materials.findIndex(m => m.id === deleteTargetId);
            if (index !== -1) {
                materials.splice(index, 1);
            }

            render();
            bootstrap.Modal.getInstance(document.getElementById('deleteMaterialModal')).hide();

            UI.showToast('Material eliminado', `${name} ha sido eliminado del inventario`, 'success');
            deleteTargetId = null;
        } catch (error) {
            console.error('Error deleting material:', error);
            const errorMessage = error.message || 'No se pudo eliminar el material';
            UI.showToast('Error', errorMessage, 'error');
        }
    };

    return {
        initialize,
        render,
        add,
        edit,
        update,
        showDeleteModal,
        delete: delete_material
    };
})();
