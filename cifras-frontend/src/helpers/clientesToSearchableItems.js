const clientesToSearchableItems = (array) => {
    const searchableArray = []

    for(let i = 0; i < array.length; i++) {
        let text = array[i].razonSocial
        if(array[i].nombreDeFantasia != '') {
            text = text + " - " + array[i].nombreDeFantasia
        }
        searchableArray.push({id: array[i].id, text: text})
    }

    return searchableArray
}

export default clientesToSearchableItems;