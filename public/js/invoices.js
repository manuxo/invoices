var btnAddInvoiceLine = document.getElementById("btn-add-invoice-line");
var btnAddInvoiceClear = document.getElementById("add-invoice-clear");
var btnSaveInvoice = document.getElementById("add-invoice-save");
const fdSubtotal = document.getElementById("add-invoice-subtotal");
const fdTax = document.getElementById("add-invoice-tax");
const fdTotal = document.getElementById("add-invoice-total");

const addAmount = amount => {

    fdSubtotal.value = parseFloat(fdSubtotal.value) + amount;
    fdTax.value = 0.18 * parseFloat(fdSubtotal.value);
    fdTotal.value = parseFloat(fdSubtotal.value)+parseFloat(fdTax.value);
}

const clearAddInvoiceForm = () => {
    const invoiceLinesContainer = document.getElementById("tbody-add-invoice-lines");
    invoiceLinesContainer.innerText = "";
    const form = document.getElementById("form-add-invoice");
    form.reset();
}

btnAddInvoiceClear.addEventListener('click', () => {clearAddInvoiceForm()});

btnAddInvoiceLine.addEventListener('click', (e) => {
    const container = document.getElementById("div-add-invoice-line");
    const fields = [];
    container.childNodes.forEach(x => {
        if(x instanceof HTMLInputElement){
            fields.push(x.value);        
        }
    });
    fields[1] = parseFloat(fields[1]);
    fields[2] = parseInt(fields[2]);
    
    if(fields[0] != "" && fields[1] > 0 && fields[2] >= 1){
        const description = fields[0];
        const unitCost = fields[1];
        const quantity = fields[2];
        const amount = unitCost * quantity;
        const invoiceLine = document.createElement("tr");
        const d = document.createElement("td");
        d.appendChild(document.createTextNode(description.toString()));
        const u = document.createElement("td");
        u.appendChild(document.createTextNode(unitCost.toString()));
        const q = document.createElement("td");
        q.appendChild(document.createTextNode(quantity.toString()));
        const a = document.createElement("td");
        a.appendChild(document.createTextNode(amount.toString()));
        const x = document.createElement("td");
        const deleteButton = document.createElement("i");
        deleteButton.classList.add("fa","fa-window-close","text-danger","delete");

        deleteButton.addEventListener('click', (e) => {
            const row = e.target.parentElement.parentElement;
            const amount = parseFloat(row.childNodes[3].textContent) * -1;
            row.parentElement.removeChild(row);
            addAmount(amount);
        });

        x.appendChild(deleteButton);

        invoiceLine.appendChild(d);
        invoiceLine.appendChild(u);
        invoiceLine.appendChild(q);
        invoiceLine.appendChild(a);
        invoiceLine.appendChild(x);
        document.getElementById("tbody-add-invoice-lines").appendChild(invoiceLine);
        addAmount(amount);
        
    }
});

btnSaveInvoice.addEventListener('click', (ev) => {
    let fdCustomer = document.getElementById("add-invoice-select-customer");
    const invoiceLines = [];
    let linesContainer = document.getElementById("tbody-add-invoice-lines");
    let subtotal = 0;
    linesContainer.childNodes.forEach(x => {
        if(x instanceof HTMLTableRowElement){
            const tds = x.childNodes;
            subtotal += parseFloat(tds[3].textContent);
            invoiceLines.push({
                description: tds[0].textContent,
                unit_cost: tds[1].textContent,
                quantity: tds[2].textContent,
                amount: tds[3].textContent,
            });
        }
    });
    const invoice = {
        subtotal: subtotal,
        tax: 0.18*subtotal,
        total: subtotal+0.18*subtotal,
        customer_id: fdCustomer.value
    }
    $.ajax({
        url: 'api/invoices',
        method: 'POST',
        data: invoice,
        success: result => {
            console.log(result);
            invoiceLines.forEach(invoiceLine => {
                invoiceLine.invoice_id = result.id;
                console.log(invoiceLine);
                $.ajax({
                    url: 'api/invoice_lines',
                    method: 'POST',
                    data: invoiceLine,
                    success: result => {
                        console.log(result);
                    }
                });
                location.reload();
            });
        }
    });
});