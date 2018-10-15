CREATE TABLE customers(
    id serial primary key,
    business_name varchar(100) not null,
    company_address varchar(100) not null,
    email_address varchar(100) not null,
    phone_number varchar(100) not null,
    created_at_date date default current_date not null,
	created_at_time time default current_time not null
);

CREATE TABLE invoices(
    id serial primary key,
    subtotal numeric(18,2),
    tax numeric(18,2),
    total numeric(18,2),
    date_of_issue date default current_date not null
);

CREATE TABLE invoice_lines(
    id serial primary key,
    description varchar(100) not null,
    unit_cost numeric(18,2) not null,
    quantity int not null,
    amount numeric(18,2) not null
);

/*FOREIGN KEYS*/
ALTER TABLE invoice_lines ADD invoice_id int not null;
ALTER TABLE invoice_lines ADD CONSTRAINT FK_Invoice
FOREIGN KEY(invoice_id) REFERENCES invoices(id);

ALTER TABLE invoices ADD customer_id int not null;
ALTER TABLE invoices ADD CONSTRAINT FK_Customer
FOREIGN KEY(customer_id) REFERENCES customers(id);