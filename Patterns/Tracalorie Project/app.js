//Storage Contoller
const StorageController = (function(){
    return {
        storeItem: function(item){
            let items;
            //Check Local Storage if it's empty
            if(localStorage.getItem('items') === null){
                items = [];
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }
            else{
                //Parse to object from LS
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index) => {
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteFromLocalStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index) => {
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearAllFromStorage: function(){
            localStorage.removeItem('items');
        }
    }
})();

//Item Contoller
const ItemController = (function(){
    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items: StorageController.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    //Public
    return {
        logData: function(){
            return data;
        },
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            let ID;
            //Create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length-1].id + 1;
            }
            else{
                ID = 0;
            }

            calories = parseInt(calories);

            newItem = new Item(ID, name, calories);

            data.items.push(newItem);
            
            return newItem;
        },
        getTotalCalories: function(){
            let total = 0;
            data.items.forEach(item => {
                total += item.calories;
            });

            data.totalCalories = total;

            return data.totalCalories;
        },
        getItemById: function(id){
            let found = 0;
            data.items.forEach(item => {
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories){
            calories = parseInt(calories);
            let found = 0;
            data.items.forEach(item => {
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
            
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        }, 
        deleteItem: function(id){
            const ids = data.items.map(item => item.id);
            const index = ids.indexOf(id);
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        }
    }
})();

//UI Contoller
const UIController = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        listItems: '#item-list li',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        clearBtn: '.clear-btn'
    };

    return{
        makeItemList: function(items){
            let html = '';
            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                            <strong>${item.name} </strong> 
                            <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>
                `;
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        }, 
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        }, 
        addlistItem: function(item){
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //Create li item
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;

            li.innerHTML = `<strong>${item.name} </strong> 
                            <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
            `;

            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        getSelectors: function(){
            return UISelectors;
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }, 
        clearEditState: function(){
            UIController.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories;
            UIController.showEditState();
        },
        updateListItem: function(item){
            let listItems = [...document.querySelectorAll(UISelectors.listItems)];

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `
                        <strong>${item.name} </strong> 
                        <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>
                    `;
                }
            });     
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearItems: function(){
            let listItems = [...document.querySelectorAll(UISelectors.listItems)];
            listItems.forEach(item => item.remove());
        } 
    }
})();

//App Controller
const App = (function(ItemController, StorageController, UIController){
    //Load Event Listeners
    const loadEventListeners = function(){
        const UISelectors = UIController.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable submit on ENTEr
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                event.preventDefault();
                return false;
            }
        })

        //Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //Update event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        //Delete event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        //Clear all 
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearItems);

        //Back event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UIController.clearEditState);
    }

    const itemAddSubmit = function(event){
        const input = UIController.getItemInput();

        if(input.name !== '' && input.calories!== ''){
            //Add item to list
            const newItem = ItemController.addItem(input.name, input.calories);

            //Add item to UI
            UIController.addlistItem(newItem);

            //Get total calories
            const totalCalories = ItemController.getTotalCalories();
            UIController.showTotalCalories(totalCalories);

            //Store in LC
            StorageController.storeItem(newItem);

            UIController.clearInput();
        }
        event.preventDefault();
    }

    const itemEditClick = function(event){
        if(event.target.classList.contains('edit-item')){
            //Get list item id
            const listID = event.target.parentNode.parentNode.id;
            const listArr = listID.split('-');
            const ID = parseInt(listArr[1]);

            //Get item
            const itemToEdit = ItemController.getItemById(ID);
            
            ItemController.setCurrentItem(itemToEdit);

            //Add item to input fields
            UIController.addItemToForm();
        }
        event.preventDefault(); 
    }

    const itemUpdateSubmit = function(event){
        //Get input
        const input = UIController.getItemInput();

        //Update item in DS
        const updatedItem = ItemController.updateItem(input.name, input.calories);

        //Update in UI
        UIController.updateListItem(updatedItem);

        const totalCalories = ItemController.getTotalCalories();
        UIController.showTotalCalories(totalCalories);

        //Update LS
        StorageController.updateItemStorage(updatedItem);

        UIController.clearEditState();
        event.preventDefault();
    }

    const itemDeleteSubmit = function(event){
        const currentItem = ItemController.getCurrentItem();

        ItemController.deleteItem(currentItem.id);

        UIController.deleteListItem(currentItem.id);

        const totalCalories = ItemController.getTotalCalories();
        UIController.showTotalCalories(totalCalories);
        
        StorageController.deleteFromLocalStorage(currentItem.id);

        UIController.clearEditState();

        event.preventDefault();
    }

    const clearItems = function(event){
        //Delete all items
        ItemController.clearAllItems();

        const totalCalories = ItemController.getTotalCalories();
        UIController.showTotalCalories(totalCalories);

        UIController.clearItems();
        StorageController.clearAllFromStorage();

        UIController.hideList();
        
        event.preventDefault();
    }
    //Public
    return {
        init: function(){
            UIController.clearEditState();
            //Fetch items form DS
            const items = ItemController.getItems();
            
            //Check if any items
            if(items.length === 0){
                UIController.hideList();
            } 
            else{
                //Make list with meal
                UIController.makeItemList(items);
            }

            const totalCalories = ItemController.getTotalCalories();
            UIController.showTotalCalories(totalCalories);

            loadEventListeners();
        }
    }
})(ItemController, StorageController, UIController);

App.init();