let filtered_array, updateId;

// FUNCTIONS FOR SIDEBAR

let alldates = new Date;
var dd = String(alldates.getDate()).padStart(2, '0');
var mm = String(alldates.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = alldates.getFullYear();

alldates = mm + '-' + dd + '-' + yyyy;

let alltime = new Date;

let hours = alltime.getHours();
let minutes = alltime.getMinutes();
let newformat = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0' + minutes : minutes;
alltime = hours + ":" + minutes + " " + newformat;

console.log('date: ', alldates, 'time: ', alltime)

var state = "expanded";
//Check if navbar is expanded or minimized and handle
$('#navbar-toggle').click(function() {
    if (state == "expanded") {
        $('.sidebar').css('margin-left', '-120px');
        state = "minimized";
    } else {
        if (state == "minimized") {
            $('.sidebar').css('margin-left', '0px');
            state = "expanded";
        }
    }
})


let images = "";
    const showFile = (input) => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                images = reader.result;
            })
            reader.readAsDataURL(input.files[0]);
    }

    const additems = (mylabel) => {
        if (!item.value || !price.value || !quantity.value || !collections_from_db.value) {
            return;
        } else {
            let getitems_from_localstorage = JSON.parse(localStorage.getItem('stores')) || [];
            let unique_id = "storeId" + Math.floor(Math.random() * 500000);
            console.log(images);

            let newitems_to_be_added = {
                    unique_id,
                    collection: collections_from_db.value,
                    item: item.value,
                    price: price.value,
                    quantity: quantity.value,
                    total: price.value * quantity.value,
                    img: images
            }
                if (getitems_from_localstorage.find(u => u.collection == collections_from_db.value && u.item == mylabel)) {
                      add_items_text.innerHTML = `<b class="text-danger">LABEL NAME WITH SAME <br/> CATEGORY ALREADY EXIST!</b>`
                      setTimeout(() => {
                          add_items_text.innerHTML = `<b class="">ADD ITEM</b>`
                      }, 3000);
                } else {
                    let add_items_to_localstoarge = [...getitems_from_localstorage, newitems_to_be_added];
                    localStorage.setItem('stores', JSON.stringify(add_items_to_localstoarge));
                    add_items_text.innerHTML = `<b class="text-success">ADDED!</b>`
                    item.value = "";
                    price.value = "";
                    quantity.value = "";
                    setTimeout(() => {
                        add_items_text.innerHTML = `<b class="">ADD ITEM</b>`
                    }, 2000);
                    get_all_items_from_localstorage()
                }
        }

    }

    const get_all_items_from_localstorage = () => {
        let getitems_from_localstorage = JSON.parse(localStorage.getItem('stores')) || [];
        for (let i = 0; i < getitems_from_localstorage.length; i++) {
            let loopeditems = getitems_from_localstorage[i];
            display_items_from_store.innerHTML += `
                <tr>
                <td>${i + 1}</td>
                <td>${loopeditems.collection}</td>
                <td>${loopeditems.item}</td>
                <td>${loopeditems.price}</td>
                <td>${loopeditems.quantity}</td>
                <td><img id="previewimage" style="width: 50px; height:50px; border-radius: 50px" src=${loopeditems.img} alt="image"></td>
                <td>${loopeditems.total}</td>
                <td><input type="text" name="" placeholder="Quantity" class="form-control bg-light" onkeyup="addquantity('${loopeditems.unique_id}')" id=${loopeditems.unique_id}><br/></td>
                  <td><button type="button" onclick="delete_item_from_store('${loopeditems.unique_id}')" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModalCenter">
                        DEL
                    </button></td>
                <td><button class="btn btn-secondary text-white" onclick="update_item_from_store('${loopeditems.unique_id}')" data-toggle="modal" data-target="#editModal">EDIT</button><br/></td>
                </tr>
                `;
        }

    }

    let id_for_delete = "";

    get_all_items_from_localstorage()

    const addquantity = (checkquantity) => {
     let getitems_from_localstorage = JSON.parse(localStorage.getItem('stores')) || [];
     for (let i = 0; i < getitems_from_localstorage.length; i++) {
         if (getitems_from_localstorage[i].unique_id == checkquantity) {
             let r = Number(document.getElementById(checkquantity).value);
             if (r > getitems_from_localstorage[i].quantity) {
                 return;
             } else {
                 getitems_from_localstorage[i].quantity = getitems_from_localstorage[i].quantity - r;
                 getitems_from_localstorage[i].total = getitems_from_localstorage[i].quantity * getitems_from_localstorage[i].price;
             }
              break;
         }
     }
     localStorage.setItem('stores', JSON.stringify(getitems_from_localstorage))
    }

    const delete_item_from_store = (store_id) => {
     id_for_delete = store_id;
     let getitems_from_localstorage = JSON.parse(localStorage.getItem('stores')) || [];
     for (let i = 0; i < getitems_from_localstorage.length; i++) {
        if (getitems_from_localstorage[i].unique_id == store_id) {
            modalBody.innerHTML = "ARE YOU SURE YOU WANT TO DELETE " + `<b class="text-danger">${getitems_from_localstorage[i].item.toUpperCase()}</b>` ;
        }
     }
    }


const deleteitem = (newid) => {
        $(this).closest('tr').remove();
         let getitems_from_localstorage = JSON.parse(localStorage.getItem('stores')) || [];
         let filtered_data = getitems_from_localstorage.filter(val => val.unique_id != newid);
         localStorage.setItem('stores', JSON.stringify(filtered_data));
    }

const update_item_from_store = (updateitem) => {
    updateId = updateitem;
         let getitems_from_localstorage = JSON.parse(localStorage.getItem('stores')) || [];
         let getcategories_from_localstorage = JSON.parse(localStorage.getItem('categories')) || [];
         for (let i = 0; i < getcategories_from_localstorage.length; i++) {
             for (let y = 0; y < getitems_from_localstorage.length; y++) {
                 const element = getitems_from_localstorage[y];
                 if (element.unique_id === updateitem) {
                     new_selection.innerHTML += `<option value="${getcategories_from_localstorage[i].category}">${getcategories_from_localstorage[i].category}</option>`
                     label_input.value = element.item;
                     price_input.value = element.price;
                     quantity_input.value = element.quantity;
                     display_former_img.innerHTML = `<img src="${element.img}" style="width:50px; height: 50px; border-radius: 50px">`
                     img = images;
                     break;
                 }
             }
         }
         //  let matched_id = getitems_from_localstorage.filter(u => u.unique_id == updateitem);

    }

const update_items_in_localstorage = (newupdateId) => {
    let get_all_items_from_localstorage = JSON.parse(localStorage.getItem('stores')) || [];

    if (!new_selection.value || !label_input.value || !price_input.value || !quantity_input.value) {
        return;
    } else {
        for (let i = 0; i < get_all_items_from_localstorage.length; i++) {
            const element = get_all_items_from_localstorage[i];
            if (element.unique_id == newupdateId) {
                element.img = images;
                element.collection = new_selection.value;
                element.item = label_input.value;
                element.price = price_input.value;
                element.quantity = quantity_input.value;
                console.log(element.collection)
            }

        }

        localStorage.setItem('stores', JSON.stringify(get_all_items_from_localstorage))

    }
}

const add_category = () => {
        $('#show_categories_to_admin').css('display', 'none');$('#show_items_to_admin').css('display','none')
        $('#add_categories').css('display', 'block');$('#display_categories').css('display', 'none');
        $('#add_items').css('display', 'none');$('#display_all_items').css('display','none')
        $('#history_div').css('display', 'none');
}

    // fuction for adding category
    const add_category_func = (mydata) => {
        let get_category_from_local = JSON.parse(localStorage.getItem('categories')) || [];
        if (!category_input.value) {
            return;
        } else {
                if (get_category_from_local.find(u => u.category == mydata)) {
                    add_category_text.innerHTML = "<b class='text-danger'>ALREADY EXIST!</b>";
                    setTimeout(() => {
                        add_category_text.innerHTML = "ADD CATEGORY";
                    }, 2000);
                } else {
                    let new_category = {
                        uniqid: "category" + Math.floor(Math.random() * 6000),
                        category: category_input.value
                    }
                    let spread_category = [...get_category_from_local, new_category];
                    localStorage.setItem('categories', JSON.stringify(spread_category));
                    add_category_text.innerHTML = "<b class='text-success'>ADDED!</b>";
                    category_input.value = "";
                    setTimeout(() => {
                        add_category_text.innerHTML = "ADD CATEGORY";
                    }, 2000);
                }
        }
}

    const show_all_collections = () => {
        let get_category_from_local = JSON.parse(localStorage.getItem('categories')) || [];
        let get_acct = JSON.parse(localStorage.getItem('accounts')) || [];
        let get_acctDate = JSON.parse(localStorage.getItem('accountsDate')) || [];
        let stores = JSON.parse(localStorage.getItem('stores')) || [];
        filtered_array = get_category_from_local.filter(value => Object.keys(value).length != 0);
        // filtered_array.map(el => {
        // })
        let dateArr = [];
        let acctTotal = [];
         let newDate = Object.values(get_acctDate.reduce((acc, cur) => Object.assign(acc, { [cur.dates]: cur }), {}));
        newDate.map(el => {
          dateArr.push(el.dates)
        })

        get_acct.map(el => {
            // console.log(alldates)
            el.newData.find(u => {
              if (u.date === alldates){
            acctTotal.push(Number(u.total))
              }
            });
        })

      var ctx = document.getElementById('myChart3');
      var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: dateArr,
                    datasets: [{
                        label: 'List of category',
                        data: acctTotal,
                        backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         'rgba(255, 206, 86, 0.2)',
                         'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)',
                         'rgba(255, 159, 64, 0.2)'
                        ],

                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 5
                    }]
                },
            });


        var ctx = document.getElementById('myChart2');
        let newItem = [];
        let newSold = [];
        let newTotal = [];
        get_category_from_local.map(el => {
           // stores.map(els => {
             let t = stores.filter(els => els.collection === el.category)
             newItem.push(el.category);
             newSold.push(Number(t.length));
        // })
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: newItem,
                    datasets: [{
                        label: 'List of category',
                        data: newSold,
                        backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         'rgba(255, 206, 86, 0.2)',
                         'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)',
                         'rgba(255, 159, 64, 0.2)'
                        ],

                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 5
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
              // })

            })

        for (let i = 0; i < filtered_array.length; i++) {
             const element = filtered_array[i];
             let t = stores.filter(el => el.collection === element.category)
             show_all_collection.innerHTML += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${element.category}</td>
                                <td> <b class="text-danger">${t.length}</b> Items</td>
                            </tr>
             `
            collections_from_db.innerHTML += `
                <option value=${element.category}>${element.category}</option>
            `
         }
     }

show_all_collections();

        const back_to_home_func = () => {
            $('#add_categories').css('display','none')
            $('#display_categories').css('display', 'block');
            $('#display_all_items').css('display', 'none');
            $('#show_cates').css('display', 'none');
            $('#show_categories_to_admin').css('display', 'none');
            $('#show_items_to_admin').css('display', 'none')
            $('#history_div').css('display', 'none');


}

        const display_add_items_div = () => {
            $('#add_items').css('display', 'block'); $('#add_categories').css('display', 'none');
            $('#display_categories').css('display', 'none'); $('#display_all_items').css('display','none')
            $('#show_cates').css('display', 'none');
            $('#show_categories_to_admin').css('display', 'none');
            $('#show_items_to_admin').css('display', 'none')
            $('#history_div').css('display', 'none');
            $('#accountDiv').css('display','none');$('#usersStore').css('display','none')

}

            const display_all_items_local = () => {
                $('#add_items').css('display', 'none'); $('#add_categories').css('display', 'none');
            $('#display_categories').css('display', 'none'); $('#display_all_items').css('display','block')
            $('#show_cates').css('display', 'none');$('#accountDiv').css('display','none')
            $('#show_categories_to_admin').css('display', 'none');
                $('#show_items_to_admin').css('display', 'none')
            $('#history_div').css('display', 'none');

            }

const display_all_categories_card = () => {
              show_cards2.innerHTML = ""
            $('#add_items').css('display', 'none'); $('#add_categories').css('display', 'none');
            $('#display_categories').css('display', 'none'); $('#display_all_items').css('display','none')
            $('#show_categories_to_admin').css('display', 'block'); $('#show_items_to_admin').css('display','none')
            $('#history_div').css('display', 'none');$('#accountDiv').css('display','none');$('#usersStore').css('display','none')

}

         const display_categories_admin = () => {
                let get_categories = JSON.parse(localStorage.getItem('categories')) || [];
            for (let i = 0; i < get_categories.length; i++) {
                show_cards.innerHTML += `
                           <div style="cursor: pointer" class="card cards col-md-3 m-3" ${get_categories[i].uniqid} onclick="display_items_equal_to_category('${get_categories[i].category}')">
                                    <div class="card-body">
                                        <h4>${get_categories[i].category}</h4>
                                    </div>
                            </div>`
            }
}
display_categories_admin();

let categories_name = "";

let display_items_equal_to_category = (items_category) => {
    categories_name = items_category;
    $('#show_items_to_admin').css('display', 'block'); $('#show_categories_to_admin').css('display', 'none');
        let get_stores = JSON.parse(localStorage.getItem('stores')) || [];
        let filtered_stores = get_stores.filter(u => u.collection == items_category);
    if (filtered_stores.length < 1) {
        $('#display_button_for_users').css('display', 'none');
        $('#no_collections').css('display', 'block');
        no_collections.innerHTML = "NO COLLECTIONS HERE YET!"
    } else {
        $('#display_button_for_users').css('display', 'block');
        $('#no_collections').css('display', 'none');
        display_name_of_category.innerHTML = items_category;
            for (let i = 0; i < filtered_stores.length; i++) {
                const element = filtered_stores[i];
                show_cards2.innerHTML += `<div class="col-md-4 newcards animate__animated animate__fadeInUp"><div class="card cards" id="${element.unique_id}">
        <img class="card-img-top m-3" src="${element.img}" alt="Card image cap" style="width: 200px; height: 200px; border-radius: 50%">
        <div class="card-body">
           <span class="text-secondary mb-2 mt-3"><b>${element.item.toUpperCase()}</b></span><br>
           <span class="text-success mb-2 mt-3"><b>Price: N${Number(element.price).toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2})}</b></span><br>
           <span class="text-dark mb-2 mt-3"><b class="float-right">Quantity left ${element.quantity <= 11 ? `<b class="text-danger">${element.quantity}</b>` : `<b class="text-success">${element.quantity}</b>`}</b></span><br>
           <span class="text-danger"><b>Total: N${Number(element.total).toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2})}</b></span><br>
          <span class="mt-3 mb-4"><button class="btn btn-outline-danger text-danger">DELETE</button></span>
        </div>
        </div>
        </div>`
        }
        }
}

    const push_to_users = () => {
            $('#myModals').css('display','block')
}

        const show_modal_for_push = (mytexts, ddd) => {
            $('#myModals').css('display','none')
            $('#myModal').css('display', 'block');
            let categories_from_localStorage = JSON.parse(localStorage.getItem('stores')) || [];
            let filtered_stores = categories_from_localStorage.filter(u => u.collection === mytexts);
            let filtered_stores2 = categories_from_localStorage.filter(u => u.collection !== mytexts);

            let a_store_for_users = JSON.parse(localStorage.getItem('users_store')) || [];
            let a_storeCategories_for_users = JSON.parse(localStorage.getItem('users_storeCategories')) || [];
            let history_db_var = JSON.parse(localStorage.getItem('history_db_stores')) || [];
            let history_db_cate = JSON.parse(localStorage.getItem('history_db_cates')) || [];
            let history_db_date = JSON.parse(localStorage.getItem('hist_dates')) || [];

            let new_user_obj = [...a_store_for_users, filtered_stores];

            let newUsersCategories = {
                unique_id: "users_cat" + Math.floor(Math.random() * 4000),
                category: categories_name,
            }


            let hist_obj = {
                stores: filtered_stores,
                dates: alldates,
                time: alltime
            }

            let hist_date = {
                dates: alldates,
                time: alltime
            }

            let hist_stores = [...history_db_var, hist_obj];

            // for (let i = 0; i < hist_stores.length; i++) {
            //     const elements = hist_stores[i];
            //     console.log(elements.dates)
            //     for (let i = 0; i < elements.stores.length; i++) {
            //         const element = elements.stores[i];
            //         console.log(element)
            //     }
            // }
             let hist_cates = {
                unique_id: "users_cat" + Math.floor(Math.random() * 500000),
                category: mytexts,
                dates: alldates
            }

            let spread_hist = [...history_db_cate, hist_cates];
            let spread_date_hist = [...history_db_date, hist_date];
            let all_Users_Categories = [...a_storeCategories_for_users, newUsersCategories];

            if (new_user_obj && all_Users_Categories) {
                $('#myModal').css('display', 'block');
                setTimeout(() => {
                    $('#myModal').css('display', 'none');
                    if (history_db_cate.find(u => u.category == mytexts)) {
                        localStorage.setItem('history_db_stores', JSON.stringify(hist_stores));
                        localStorage.setItem('stores', JSON.stringify(filtered_stores2));
                        localStorage.setItem('users_store', JSON.stringify(new_user_obj));
                        // localStorage.setItem('users_storeCategories', JSON.stringify(all_Users_Categories));
                    }
                    else {
                        localStorage.setItem('history_db_stores', JSON.stringify(hist_stores));
                        localStorage.setItem('stores', JSON.stringify(filtered_stores2));
                        localStorage.setItem('users_store', JSON.stringify(new_user_obj));
                        localStorage.setItem('users_storeCategories', JSON.stringify(all_Users_Categories));
                        localStorage.setItem('history_db_stores', JSON.stringify(hist_stores));
                        localStorage.setItem('history_db_cates', JSON.stringify(spread_hist));
                        localStorage.setItem('hist_dates', JSON.stringify(spread_date_hist));
                        localStorage.setItem('stores', JSON.stringify(filtered_stores2));
                    }
                }, 4000);
        } else {
            return;
        }
}

const display_all_history = () => {
        $('#show_categories_to_admin').css('display', 'none');$('#show_items_to_admin').css('display','none')
        $('#add_categories').css('display', 'none');$('#display_categories').css('display', 'none');
        $('#add_items').css('display', 'none');$('#display_all_items').css('display','none');$('#accountDiv').css('display','none')
        $('#history_div').css('display', 'block'); $('#second_history_div').css('display','block')
        $('#usersStore').css('display','none');
    let get_hist_date = JSON.parse(localStorage.getItem('hist_dates')) || [];
    let newFilter = "";
    let e = Object.values(get_hist_date.reduce((acc, cur) => Object.assign(acc, { [cur.dates]: cur }), {}))
    e.map(el => {
       newFilter += `<option value="${el.dates}">${el.dates}</option>`
    })
     selectedDateHist.innerHTML = newFilter;
}

let mydate = ""

const showDate = () =>{
   mydate = selectedDateHist.value;
   console.log(mydate)
}

const display_date_related_cates = (date_param) => {
    console.log(date_param)
    let get_hist_cates = JSON.parse(localStorage.getItem('history_db_cates')) || [];
    $('#hist_cate_div').css('display', 'block')
    $('#second_history_div').css('display', 'none')
    $('#new_store').css('display', 'none');
    $('#hist_store_div').css('display', 'none');
    $('#usersStore').css('display','none')
    $('#usersStore').css('display', 'none');$('#accountDiv').css('display', 'none');
    let filtered_categories = get_hist_cates.filter(u => u.dates === date_param);
    let displayed_cates = "";
    for (let i = 0; i < filtered_categories.length; i++) {
        const element = filtered_categories[i];
                displayed_cates += `<div class="col-md-4" id="${element.unique_id}">
                                        <div class="card" onclick="display_related_items('${element.category}', '${date_param}')" style="cursor: pointer; box-shadow: 10px 12px 10px rgba(0,0,0,0.5)">
                                            <div class="card-body">
                                                  <h1 class="text-center">  ${element.category.toUpperCase()} </h2>
                                            </div>
                                        </div>
                                    </div>`
    }

    row_hist_for_categories.innerHTML = displayed_cates;
}

const display_related_items = (lists, newdate) => {
    $('#hist_cate_div').css('display', 'none')
    $('#hist_store_div').css('display', 'block')
    $('#new_store').css('display', 'none');$('#accountDiv').css('display', 'none');

    let get_hist_stores = JSON.parse(localStorage.getItem('history_db_stores')) || [];
    console.log(get_hist_stores);
    let displayed_store = "";

    for (let i = 0; i < get_hist_stores.length; i++) {
        const element = get_hist_stores[i];

        let filtered_hist_store = element.stores.filter(u => u.collection === lists && element.dates === newdate)

        for (let i = 0; i < filtered_hist_store.length; i++) {
            const elements = filtered_hist_store[i];
            displayed_store += `<div class="col-md-4 newcards animate__animated animate__fadeInUp"><div class="card cards" id="${elements.unique_id}">
        <img class="card-img-top m-3" src="${elements.img}" alt="Card image cap" style="width: 200px; height: 200px; border-radius: 50%">
        <div class="card-body">
           <span class="text-secondary mb-2 mt-3"><b>${elements.item.toUpperCase()}</b></span><br>
           <span class="text-success mb-2 mt-3"><b>Price: N${Number(elements.price).toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2})}</b></span><br>
           <span class="text-dark mb-2 mt-3"><b class="float-right">Quantity left ${elements.quantity <= 11 ? `<b class="text-danger">${elements.quantity}</b>` : `<b class="text-success">${elements.quantity}</b>`}</b></span><br>
           <span class="text-danger"><b>Total: N${Number(elements.total).toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2})}</b></span><br>
          <span class="mt-3 mb-4">
          <button class="btn btn-outline-danger text-danger" onclick="deleteData('${elements.unique_id}')">REMOVE</button>
          <button class="btn btn-outline-info text-success float-right" onclick="restoreData('${elements.unique_id}', '${element.unique_id}')">RESTORE</button>
          </span>
        </div>
        </div>
        </div>`
        }
    }
    row_hist_for_stores.innerHTML = displayed_store;
}


const restoreData = (restoreId, newStoreId) => {
    let get_hist_stores = JSON.parse(localStorage.getItem('history_db_stores')) || [];

    for (let i = 0; i < get_hist_stores.length; i++) {
        const element = get_hist_stores[i];

        let getitems_from_localstorage = JSON.parse(localStorage.getItem('stores')) || [];

        let filtered_store = element.stores.filter(u => u.unique_id === restoreId);

        filtered_store.map((element) => {

              let restoreditems = {
                    unique_id: restoreId,
                    collection: element.collection,
                    item: element.item,
                    price: element.price,
                    quantity: element.quantity,
                    total: element.total,
                    img: element.img
            }
            let spread_restored = [...getitems_from_localstorage, restoreditems];
            localStorage.setItem('stores', JSON.stringify(spread_restored));
        })

    }

    get_hist_stores.forEach(function(t) {
        t.stores = t.stores.filter(u => u.unique_id != restoreId);
    });

    localStorage.setItem('history_db_stores', JSON.stringify(get_hist_stores))
}

const display_all_userStore = () => {
    // display_user_items.innerHTML = "";
    $('#add_categories').css('display', 'none'); $('#display_categories').css('display', 'none');
     $('#display_all_items').css('display', 'none');$('#show_cates').css('display', 'none');
     $('#show_categories_to_admin').css('display', 'none');$('#show_items_to_admin').css('display', 'none')
    $('#history_div').css('display', 'none'); $('#usersStore').css('display', 'block');
    $('#new_store').css('display', 'none');$('#accountDiv').css('display', 'none');

     let getUsers_categories = JSON.parse(localStorage.getItem('users_storeCategories')) || [];
     let newcategory = Object.values(getUsers_categories.reduce((acc, cur) => Object.assign(acc, { [cur.category]: cur }), {}))
     let loopedDates = "";
     for (let y = 0; y < newcategory.length; y++) {
         const el = newcategory[y];
         loopedDates += `<tr>
         <td>${y + 1}.</td>
         <td style="cursor: pointer" onclick="displayItems_Underthis_usercategory('${el.category}')">${el.category}</td>
         <td><button class="btn btn-outline-danger text-danger" onclick="delete_this_Usercat('${el.category}')" data-toggle="modal" data-target="#exampleModalCenter">DELETE</button></td>
         </tr>`
        }
        display_usersStore_table.innerHTML = loopedDates;
    }


const delete_this_Usercat = (val) => {
    id_for_delete = val
  let get_UserCategory = JSON.parse(localStorage.getItem('users_storeCategories')) || [];
  let get_UserStore = JSON.parse(localStorage.getItem('users_store')) || [];

        for (let i = 0; i < get_UserCategory.length; i++) {
            const element = get_UserCategory[i];
                if (element.category === val) {
                    modalBody.innerHTML = "ARE YOU SURE YOU WANT TO DELETE " + `<b class="text-danger">${element.category.toUpperCase()}</b>` ;
                }
        }

}


const deletecategory = (val) => {
    let getitems_from_localstorage = JSON.parse(localStorage.getItem('users_store')) || [];
    let get_UserCategory = JSON.parse(localStorage.getItem('users_storeCategories')) || [];

     getitems_from_localstorage.find((u) => {
         let r = u.filter(ty => ty.collection !== val);
         localStorage.setItem('users_store', JSON.stringify(r));
     })

    let r = get_UserCategory.filter(y => y.category !== val)
    localStorage.setItem('users_storeCategories', JSON.stringify(r));
    // let filtered_data = getitems_from_localstorage.filter(val => val.unique_id != uid);
}

const displayItems_Underthis_usercategory = (newId) => {
    $('#new_store').css('display', 'block');
     $('#usersStore').css('display', 'none');
    // $('#user_cate_table').css('display','none')
        let getUsers_stores = JSON.parse(localStorage.getItem('users_store')) || [];
    let lists_of_items = "";
    for (let i = 0; i < getUsers_stores.length; i++) {
            const element = getUsers_stores[i];
            let newElement = element.filter(u => u.collection === newId);
            newElement.map((el) => {
                lists_of_items += `<div class="col-md-4 newcards animate__animated animate__fadeInUp"><div class="card cards" id="${el.unique_id}">
                    <img class="card-img-top m-3" src="${el.img}" alt="Card image cap" style="width: 200px; height: 200px; border-radius: 50%">
                    <div class="card-body">
                       <span class="text-secondary mb-2 mt-3"><b>${el.item.toUpperCase()}</b></span><br>
                       <span class="text-success mb-2 mt-3"><b>Price: N${Number(el.price).toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2})}</b></span><br>
                       <span class="text-dark mb-2 mt-3"><b class="float-right">Quantity left ${el.quantity <= 11 ? `<b class="text-danger">${el.quantity}</b>` : `<b class="text-success">${el.quantity}</b>`}</b></span><br>
                       <span class="text-danger"><b>Total: N${Number(el.total).toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2})}</b></span><br>
                      <span class="mt-3 mb-4"><button class="btn btn-outline-danger text-danger" onclick="delete_this_item('${el.unique_id}')" data-toggle="modal" data-target="#exampleModalCenter">DELETE</button></span>
                      <span class="mt-3 mb-4 float-right"><button class="btn btn-outline-danger text-danger" onclick="edit_this_item('${el.unique_id}')" data-toggle="modal" data-target="#editModal">EDIT</button></span>
                    </div>
                    </div>
                    </div>`

            })
    }
    // $('#display_user_items').css('display', 'block')
    display_user_items.innerHTML = lists_of_items;
  }


  const edit_this_item = (updateitem) => {
    updateId = updateitem;
      console.log(updateitem)
         let getitems_from_localstorage = JSON.parse(localStorage.getItem('users_store')) || [];
         let getcategories_from_localstorage = JSON.parse(localStorage.getItem('users_storeCategories')) || [];
         for (let i = 0; i < getcategories_from_localstorage.length; i++) {
             for (let y = 0; y < getitems_from_localstorage.length; y++) {
                 const element = getitems_from_localstorage[y];
               for (let x = 0; x < element.length; x++) {
                   const el = element[x];
                     if (el.unique_id === updateitem) {
                     new_selection.innerHTML += `<option value="${getcategories_from_localstorage[i].category}">${getcategories_from_localstorage[i].category}</option>`
                     label_input.value = el.item;
                     price_input.value = el.price;
                     quantity_input.value = el.quantity;
                     display_former_img.innerHTML = `<img src="${el.img}" style="width:50px; height: 50px; border-radius: 50px">`
                     img = images;
                     break;
                 }
               }
             }
         }
        //   let matched_id = getitems_from_localstorage.filter(u => u.unique_id == updateitem);

    }

const update_User_items = (newupdateId) => {
    let get_all_items_from_localstorage = JSON.parse(localStorage.getItem('users_store')) || [];

    if (!new_selection.value || !label_input.value || !price_input.value || !quantity_input.value) {
        return;
    } else {
        for (let i = 0; i < get_all_items_from_localstorage.length; i++) {
            const element = get_all_items_from_localstorage[i];

            for (let x = 0; x < element.length; x++) {
                const el = element[x];
                if (el.unique_id == newupdateId) {
                el.img = images;
                el.collection = new_selection.value;
                el.item = label_input.value;
                el.price = price_input.value;
                el.quantity = quantity_input.value;
                console.log(el.collection)
            }
            }

        }
        console.log(get_all_items_from_localstorage)

        localStorage.setItem('users_store', JSON.stringify(get_all_items_from_localstorage))
    }
}


// usersList


const display_accounts = () => {
    $('#show_categories_to_admin').css('display', 'none'); $('#show_items_to_admin').css('display', 'none')
    $('#add_categories').css('display', 'none'); $('#display_categories').css('display', 'none');
    $('#add_items').css('display', 'none'); $('#display_all_items').css('display', 'none')
    $('#hist_store_div').css('display', 'none');$('#history_div').css('display', 'none');
    $('#second_history_div').css('display', 'none');$('#usersStore').css('display','none');
    $('#new_store').css('display', 'none');$('#accountDiv').css('display', 'block');$('#table__for_acct').css('display', 'none');
    $('#dates__select_tab').css('display', 'block'); $('#view_date_detail').css('display', "block")
    getAccouts()
}

$(document).ready(function(){
    $('.collapsible').collapsible();
  });

const checkaccount = () => {
    let productId = "PRO" + Math.floor(Math.random() * 200000000000);
    let get_UserStore = JSON.parse(localStorage.getItem('users_store')) || [];
    let get_historyStore = JSON.parse(localStorage.getItem('history_db_stores')) || [];
    let get_accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    let get_accountsDate = JSON.parse(localStorage.getItem('accountsDate')) || [];
    let sold;

    let newData = [];
    let newDates = [];

        get_UserStore.map((element) => {
            element.map((t) => {
                 get_historyStore.map(elements => {
                    let s=   elements.stores.find(e => {
                    return e.unique_id == t.unique_id
             })
                if (s) {
                sold = Number(s.quantity) - Number(t.quantity);
                    if (sold < 0) {
                            sold = 0
                    }
                    else {
                        let ty = {
                            productId,
                            sold,
                            prevQty: s.quantity,
                            collection: t.collection,
                            qtyRem: t.quantity,
                            price: t.price,
                            item: t.item,
                            total: Number(sold) * Number(t.price),
                            date: alldates
                        }
                        newData.push(ty)
                    }
                }
            })

        })

        })

    get_accounts.push({newData})

    let mydates = {
        dates: alldates
    }
    get_accountsDate.push(mydates)

    localStorage.setItem('accounts', JSON.stringify(get_accounts))
    localStorage.setItem('accountsDate', JSON.stringify(get_accountsDate))
}
setInterval(() => {
    console.log(JSON.parse(localStorage.accounts))
    checkaccount();
}, 86400);


let loopedColapsible = "";

    const getAccouts = () => {
      let new_selection = "";
        let get_accountsDate = JSON.parse(localStorage.getItem('accountsDate')) || [];
        let removedDuplicates = Object.values(get_accountsDate.reduce((acc, cur) => Object.assign(acc, { [cur.dates]: cur }), {}))
        let mycarts = JSON.parse(localStorage.getItem('history_db_stores')) || [];
        var newElement;
        for (let i = 0; i < removedDuplicates.length; i++) {
            newElement = removedDuplicates[i];
                new_selection += `<option value="${newElement.dates}">${newElement.dates}</option>`
        }

        dates_from_db.innerHTML = new_selection;
    }


  let selectionDate = "";

    const displayrelateddates = () => {
            selectionDate = dates_from_db.value;
    }

    const display_this_account = (val) => {
      $('#dates__select_tab').css('display', 'none')
      $('#view_date_detail').css('display', 'none')
      $('#table__for_acct').css('display', 'block')
      let account_table = "";
          let get_accounts = JSON.parse(localStorage.getItem('accounts')) || [];
          if (!dates_from_db.value) {
            console.log('hello')
          } else {
            get_accounts.map(element => {
                  let r = element.newData.filter(y => y.date === val);
                  if (r) {
                    r.map(el => {
                      myDates.innerHTML = val;
                      account_table += `<tr>
                                            <td>${el.productId}</td>
                                            <td>${el.item}</td>
                                            <td>${el.collection}</td>
                                            <td>${el.prevQty}</td>
                                            <td>${el.sold}</td>
                                            <td>${el.qtyRem}</td>
                                            <td>N${Number(el.price).toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2})}</td>
                                            <td>N${Number(el.total).toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2})}</td>
                                        </tr>`;
                    })


                  var ctx = document.getElementById('myChart');
                  let newItem = [];
                  let newSold = [];
                  let newTotal = [];

                  r.map(el => {
                     newItem.push(el.item);
                     newSold.push(Number(el.sold)) + newTotal;
                     newTotal.push(Number(el.total));
                     console.log(newItem);
                     // console.log(newSold)
                  // })
                      var myChart = new Chart(ctx, {
                          type: 'line',
                          data: {
                              labels: newItem,
                              datasets: [{
                                  label: 'Sold Items',
                                  data: newSold,
                                  backgroundColor: [
                                   'rgba(255, 99, 132, 0.2)',
                                   'rgba(54, 162, 235, 0.2)',
                                   'rgba(255, 206, 86, 0.2)',
                                   'rgba(75, 192, 192, 0.2)',
                                   'rgba(153, 102, 255, 0.2)',
                                   'rgba(255, 159, 64, 0.2)'
                                  ],

                                  borderColor: [
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                  ],
                                  borderWidth: 5
                              }]
                          },
                          options: {
                              scales: {
                                  yAxes: [{
                                      ticks: {
                                          beginAtZero: true
                                      }
                                  }]
                              }
                          }
                      });
                        })

                  }
              })

          }

        display_accountAdmin_tables.innerHTML  = account_table;
    }

// dates__select_tab.innerHTML
// table__for_acct.innerHTML
// display_usersStore_tables.innerHTML
// view_date_detail.innerHTML
