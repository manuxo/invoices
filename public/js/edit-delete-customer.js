const deleteCustomer = (id) => {
    console.log(id);
    $.ajax({
        url:`api/customers/${id}`,
        method:'DELETE',
        success: result => {
            console.log(result);
            const divCustomer = document.getElementById(`customer-${id}`);
            divCustomer.parentNode.removeChild(divCustomer);
        }
    });
}