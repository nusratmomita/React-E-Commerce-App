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

    const duplicate = existingItems.find((i) => i.productName === item.productName);

    if(duplicate){
        return false;
    }

    else{
        existingItems.push(item);

        const addingToLS = JSON.stringify(existingItems);
        localStorage.setItem("items" , addingToLS);

        return existingItems;
    }
}

export const removingFromLS = (productId) => {
    const existingItems = getItemsFromLS();

    const remainingItems = existingItems.filter((i) => i.productId !== productId);

    const addingToLS = JSON.stringify(remainingItems);
    localStorage.setItem("items" , addingToLS);

    return remainingItems;
}