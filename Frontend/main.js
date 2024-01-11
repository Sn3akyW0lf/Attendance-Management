const myForm = document.querySelector('#my-form');
const item = document.querySelector('#item');
const item_desc = document.querySelector('#item_desc');
const item_price = document.querySelector('#item_price');
const item_qty = document.querySelector('#item_qty');
const msg_item = document.querySelector('#msg_item');
const msg_desc = document.querySelector('#msg_desc');
const msg_item_price = document.querySelector('#msg_item_price');
const msg_item_qty = document.querySelector('#msg_item_qty');
const tblGrosery = document.getElementById('tblGrosery');
var itmArr = [];

myForm.addEventListener('submit', onSubmit);

// records.addEventListener('click', remExp);
// records.addEventListener('click', editExp);

// Get Existing data from the database and populate the table with that data

window.addEventListener('DOMContentLoaded', async () => {
    let response = await axios.get('http://localhost:3000/grocery/get-items');
    // console.log(response.data.allItemDetails);
    let data = response.data.allItemDetails;

    data.forEach(d => {
        // console.log(d);
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');        
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');

        td1.appendChild(document.createTextNode(`${d.id}`));
        td1.className = 'd-none';
        td2.appendChild(document.createTextNode(`${d.name}`));
        td3.appendChild(document.createTextNode(`${d.description}`));
        td4.appendChild(document.createTextNode(`${d.price}`));
        td5.appendChild(document.createTextNode(`${d.quantity}`));

        let del = document.createElement('button');
        del.className = 'btn btn-danger btn-sm float-right delete';
        del.appendChild(document.createTextNode('X'));
        del.addEventListener('click', function(){ deleteExp(td1); });

        let edit = document.createElement('button');
        edit.className = 'btn btn-info btn-sm float-right edit';
        edit.appendChild(document.createTextNode('Edit'));

        td6.appendChild(del);
        td6.appendChild(edit);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tblGrosery.appendChild(tr);


        let itmObj = {
            item: d.name,
            item_desc: d.description,
            item_price: d.price,
            item_qty: d.quantity,
            id: d.id
        };
        itmArr.push(itmObj);
    });
    // console.log(expObj);

})

// Validating and adding Record to the List and in the DataBase

async function onSubmit(e) {
    e.preventDefault();

    if(item.value === ''){
        msg_item.style.color = 'chocolate';
        msg_item.style.background = 'beige';  
        msg_item.innerHTML = 'Please Enter Item Name!';
        setTimeout(() => msg_item.remove(), 3000);
    } else if (item_desc.value === '') {
        msg_desc.style.color = 'chocolate';
        msg_desc.style.background = 'beige';  
        msg_desc.innerHTML = 'Please Enter Something about the Item!';
        setTimeout(() => msg_desc.remove(), 3000);
    } else if (item_price.value === 'none') {
        msg_item_price.style.color = 'chocolate';
        msg_item_price.style.background = 'beige';  
        msg_item_price.innerHTML = 'Please Enter Item Price!';
        setTimeout(() => msg_item_price.remove(), 3000);
    } else if (item_qty.value === 'none') {
        msg_item_qty.style.color = 'chocolate';
        msg_item_qty.style.background = 'beige';  
        msg_item_qty.innerHTML = 'Please Enter Item Quantity!';
        setTimeout(() => msg_item_qty.remove(), 3000);
    } else {
        let itmObj = {
            item: item.value,
            item_desc: item_desc.value,
            item_price: item_price.value,
            item_qty: item_qty.value
        }
        // console.log(expObj);


        let res = await axios.post('http://localhost:3000/grocery/add-item', itmObj);

        // console.log(res.data.newItemDetails);

        let data = res. data.newItemDetails;

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');        
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');

        td1.appendChild(document.createTextNode(`${data.id}`));
        td1.className = 'd-none';
        td2.appendChild(document.createTextNode(`${data.item}`));
        td3.appendChild(document.createTextNode(`${data.description}`));
        td4.appendChild(document.createTextNode(`${data.price}`));
        td5.appendChild(document.createTextNode(`${data.quantity}`));

        let del = document.createElement('button');
        del.className = 'btn btn-danger btn-sm float-right delete';
        del.appendChild(document.createTextNode('X'));
        del.addEventListener('click', function(){ deleteExp(td1); });

        let edit = document.createElement('button');
        edit.className = 'btn btn-info btn-sm float-right edit';
        edit.appendChild(document.createTextNode('Edit'));

        td6.appendChild(del);
        td6.appendChild(edit);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tblGrosery.appendChild(tr);

        itmObj = {
            item: item.value,
            item_desc: item_desc.value,
            item_price: item_price.value,
            item_qty: item_qty.value,
            id: d.id
        };
        itmArr.push(itmObj);
        item.value = '';
        item_desc.value = '';
        item_price.value = '';
        item_qty.value = '';
        // console.log(expObj);
    }

}

//Deleting the Ietm Data from Table as well as Database

async function deleteExp(e) {
    // console.log(itmArr);
    // console.log(e);
    let tr = e.parentElement;
    let tbl = tr.parentElement;
    let item = itmArr.find(u => u.id == e.innerHTML);
    // console.log(item);

    let res = await axios.post(`http://localhost:3000/grocery/delete-item/${item.id}`);
    console.log(res);
    tbl.removeChild(tr);
}


//Editing Item Information after Registration

function editExp(e) {
    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;
        for (var i = 0; i < expArr.length; i++) {
            if (li.firstChild.textContent.indexOf(expArr[i]) != -1) {
                exp_deserial = JSON.parse(localStorage.getItem(expArr[i]));
                expense.value = exp_deserial.expense;
                exp_desc.value = exp_deserial.exp_desc;
                exp_type.value = exp_deserial.exp_type;
                localStorage.removeItem(expArr[i]);
            }
        }
        records.removeChild(li);
    }
}
