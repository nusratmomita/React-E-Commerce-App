export const getItemsFromLS = () => {
    const items = localStorage.getItem("items");

    if(items){
        const convertedItems = JSON.parse(items);
        return convertedItems;
    }

    else{
        return [];
    }
}

export const addToLS = (item) => {
    const existingItems = getItemsFromLS();

    const index = existingItems.findIndex((i) => i.productId === item.productId);

    if(index !== -1){
        existingItems[index].productQuantity += 1; 
    }
    else{
        existingItems.push(item);
    }

    localStorage.setItem("items" , JSON.stringify(existingItems));

    return existingItems;
}

export const removingFromLS = (productId) => {
    const existingItems = getItemsFromLS();

    const remainingItems = existingItems.filter((i) => i.productId !== productId);

    const addingToLS = JSON.stringify(remainingItems);
    localStorage.setItem("items" , addingToLS);

    return remainingItems;
}