var fields = document.forms["form-add-customer"];

const validate = customer => {
    if(customer.email_address === "" || customer.business_name === "" || customer.company_address === "" || customer.phone_number === "")
        return false;
    return true;
}

const addCustomer = () => {
    let customer = {
        email_address: fields["email_address"].value,
        business_name: fields["business_name"].value,
        company_address: fields["company_address"].value,
        phone_number: fields["phone_number"].value
    }
    if(validate(customer)){
        $.ajax({
            url:"api/customers",
            method: "POST",
            data: customer,
            success: result => {
                console.log(result);
                location.reload();
            }
        });
    }
}

//Fields Validation
var fdPhoneNumber = fields["phone_number"];
fdPhoneNumber.addEventListener('keydown',(event) => {
    if(event.key === 'Delete' || event.key === 'Backspace')
        return;
    const regex = /[0-9]|\./;
    const isValid = regex.test(event.key)
    if(!isValid){
        event.returnValue = false;
        if(event.preventDefault)
            event.preventDefault();
    }
});
