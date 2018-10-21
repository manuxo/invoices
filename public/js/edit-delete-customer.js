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

const editCustomer = (element,id) => {
    element.classList.toggle("text-dark");
    element.classList.toggle("fa-pencil-square");
    element.classList.toggle("text-success");
    element.classList.toggle("fa-check-square");
    if(element.hasAttribute("editable")){
        const businessName = document.getElementById(`business-name-${id}`).value;
        const email = document.getElementById(`email-address-${id}`).value;
        const companyAddress = document.getElementById(`company-address-${id}`).value;
        const phoneNumber = document.getElementById(`phone-number-${id}`).value;
        const customer = {
            business_name: businessName,
            email_address: email,
            company_address: companyAddress,
            phone_number: phoneNumber
        }
        $.ajax({
            url:`api/customers/${id}`,
            method: 'PUT',
            data: customer,
            success: result => {
                console.log(result);
            }
        });
    }
    var fields = document.querySelectorAll(`#card-detail-${id} input`);
    fields.forEach((el) => {
        if(el.hasAttribute('readonly')){
            el.removeAttribute('readonly');
        }else{
            el.setAttribute('readonly',null);
        }
    });
    element.hasAttribute("editable")? element.removeAttribute("editable") : element.setAttribute("editable",null);
}