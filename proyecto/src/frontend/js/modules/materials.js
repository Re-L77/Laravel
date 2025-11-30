// Materials Module
const Materials = (() => {
    let materials = [];
    let deleteTargetId = null;

    const initialize = () => {
        const stored = localStorage.getItem('ecocycle_materials');
        if (stored) {
            materials = JSON.parse(stored);
        } else {
            materials = [
                { id: 1, name: 'Papel Bond Blanco', type: 'Papel', stock: 500, price: 1.50, image: 'https://images.unsplash.com/photo-1756362399416-503694e40cf5?w=400' },
                { id: 2, name: 'Plástico PET', type: 'Plástico', stock: 300, price: 2.00, image: 'https://images.unsplash.com/photo-1756362399416-503694e40cf5?w=400' },
                { id: 3, name: 'Cartón Corrugado', type: 'Cartón', stock: 450, price: 1.20, image: 'https://images.unsplash.com/photo-1739204618173-3e89def7140f?w=400' },
                { id: 4, name: 'Papel Periódico', type: 'Papel', stock: 200, price: 0.80, image: 'https://images.unsplash.com/photo-1756362399416-503694e40cf5?w=400' },
                { id: 5, name: 'Plástico HDPE', type: 'Plástico', stock: 350, price: 2.20, image: 'https://images.unsplash.com/photo-1756362399416-503694e40cf5?w=400' },
                { id: 6, name: 'Cartón Kraft', type: 'Cartón', stock: 280, price: 1.10, image: 'https://images.unsplash.com/photo-1739204618173-3e89def7140f?w=400' }
            ];
            save();
        }
    };

    const save = () => {
        localStorage.setItem('ecocycle_materials', JSON.stringify(materials));
    };

    const render = () => {
        const searchTerm = document.getElementById('searchMaterial')?.value.toLowerCase() || '';
        const filtered = materials.filter(m => 
            m.name.toLowerCase().includes(searchTerm) || 
            m.type.toLowerCase().includes(searchTerm)
        );
        
        const grid = document.getElementById('materialsGrid');
        grid.innerHTML = '';
        
        filtered.forEach(material => {
            const stockStatus = getStockStatus(material.stock);
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                <div class="card material-card h-100">
                    <div class="position-relative">
                        <img src="${material.image}" class="card-img-top material-image" alt="${material.name}">
                        <span class="badge badge-${material.type.toLowerCase()} position-absolute top-0 end-0 m-3">
                            ${material.type}
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
                                <span>$${material.price.toFixed(2)}</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar ${stockStatus.barColor}" 
                                     style="width: ${Math.min((material.stock / 500) * 100, 100)}%"></div>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-secondary flex-fill" onclick="Materials.edit(${material.id})">
                                <i class="fas fa-edit me-1"></i>Editar
                            </button>
                            <button class="btn btn-outline-danger flex-fill" onclick="Materials.showDeleteModal(${material.id})">
                                <i class="fas fa-trash me-1"></i>Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        
        updateStats();
        document.getElementById('materialsCount').textContent = 
            `Mostrando ${filtered.length} de ${materials.length} materiales`;
    };

    const getStockStatus = (stock) => {
        if (stock < 250) return { color: 'text-danger', label: 'Stock Bajo', barColor: 'bg-danger' };
        if (stock < 400) return { color: 'text-warning', label: 'Stock Medio', barColor: 'bg-warning' };
        return { color: 'text-success', label: 'Stock Alto', barColor: 'bg-success' };
    };

    const updateStats = () => {
        const totalPapel = materials.filter(m => m.type === 'Papel').reduce((sum, m) => sum + m.stock, 0);
        const totalPlastico = materials.filter(m => m.type === 'Plástico').reduce((sum, m) => sum + m.stock, 0);
        const totalCarton = materials.filter(m => m.type === 'Cartón').reduce((sum, m) => sum + m.stock, 0);
        
        document.getElementById('totalPapel').textContent = `${totalPapel} kg`;
        document.getElementById('totalPlastico').textContent = `${totalPlastico} kg`;
        document.getElementById('totalCarton').textContent = `${totalCarton} kg`;
    };

    const add = (e) => {
        e.preventDefault();
        
        const newMaterial = {
            id: Date.now(),
            name: document.getElementById('addMaterialName').value,
            type: document.getElementById('addMaterialType').value,
            stock: parseFloat(document.getElementById('addMaterialStock').value),
            price: parseFloat(document.getElementById('addMaterialPrice').value),
            image: getImageByType(document.getElementById('addMaterialType').value)
        };
        
        materials.push(newMaterial);
        save();
        render();
        
        bootstrap.Modal.getInstance(document.getElementById('addMaterialModal')).hide();
        e.target.reset();
        
        UI.showToast('Material agregado', `${newMaterial.name} ha sido agregado al inventario`, 'success');
    };

    const edit = (id) => {
        const material = materials.find(m => m.id === id);
        if (!material) return;
        
        document.getElementById('editMaterialId').value = material.id;
        document.getElementById('editMaterialName').value = material.name;
        document.getElementById('editMaterialType').value = material.type;
        document.getElementById('editMaterialStock').value = material.stock;
        document.getElementById('editMaterialPrice').value = material.price;
        
        new bootstrap.Modal(document.getElementById('editMaterialModal')).show();
    };

    const update = (e) => {
        e.preventDefault();
        
        const id = parseInt(document.getElementById('editMaterialId').value);
        const index = materials.findIndex(m => m.id === id);
        
        if (index !== -1) {
            const name = document.getElementById('editMaterialName').value;
            materials[index] = {
                ...materials[index],
                name: name,
                type: document.getElementById('editMaterialType').value,
                stock: parseFloat(document.getElementById('editMaterialStock').value),
                price: parseFloat(document.getElementById('editMaterialPrice').value),
                image: getImageByType(document.getElementById('editMaterialType').value)
            };
            
            save();
            render();
            
            bootstrap.Modal.getInstance(document.getElementById('editMaterialModal')).hide();
            
            UI.showToast('Material actualizado', `Los cambios en ${name} se han guardado`, 'success');
        }
    };

    const showDeleteModal = (id) => {
        const material = materials.find(m => m.id === id);
        if (!material) return;
        
        deleteTargetId = id;
        document.getElementById('deleteMaterialName').textContent = material.name;
        new bootstrap.Modal(document.getElementById('deleteMaterialModal')).show();
    };

    const delete_material = () => {
        const index = materials.findIndex(m => m.id === deleteTargetId);
        
        if (index !== -1) {
            const name = materials[index].name;
            materials.splice(index, 1);
            save();
            render();
            
            bootstrap.Modal.getInstance(document.getElementById('deleteMaterialModal')).hide();
            
            UI.showToast('Material eliminado', `${name} ha sido eliminado del inventario`, 'success');
        }
    };

    const getImageByType = (type) => {
        switch (type) {
            case 'Plástico':
                return 'https://images.unsplash.com/photo-1756362399416-503694e40cf5?w=400';
            case 'Cartón':
                return 'https://images.unsplash.com/photo-1739204618173-3e89def7140f?w=400';
            default:
                return 'https://images.unsplash.com/photo-1756362399416-503694e40cf5?w=400';
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
