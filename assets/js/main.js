
let toBasketbtns = document.querySelectorAll(".ti-bag");

toBasketbtns.forEach(btn => {
  btn.parentElement.addEventListener("click", function () {
    addBasketItem(this);
    fillBasket();
  })
});

let basket = JSON.parse(localStorage.getItem("basket"));
function addBasketItem(elem){
  checkBasket();
  let basketItem = getBasketItem(elem);
  if(basket.find(b => b.id == basketItem.id) == undefined){
    basket.push(basketItem);
  }
  else{
    basket.find(b => b.id == basketItem.id).count += 1;
  }
  localStorage.setItem("basket",JSON.stringify(basket))
  getBasketItemCountSum(basket);
//   CheckStockItems(basket)
}
// function CheckStockItems(basket) {
//     let stockBanan=50;
//     let CurrentBananCount=basket[0].count
//     if (stockBanan>CurrentBananCount) {
        
//     }
// }


function getBasketItemCountSum(basket) {
    let totalCount = 0;
    let temp = 0;
    
    basket.forEach(element => {
        temp = element.count
        totalCount =  totalCount+temp
    });
    document.getElementById("TotalCount").innerText=totalCount
}



function getBasketItem(elem) {
  return{
    id : elem.dataset.id,
    price : elem.parentElement.previousElementSibling.children[0].innerText.substring(1,elem.parentElement.previousElementSibling.children[0].innerText.length),
    model : elem.parentElement.previousElementSibling.previousElementSibling.innerText.toUpperCase(),
    img : elem.parentElement.parentElement.previousElementSibling.src,
    count : 1
  }
}

function fillBasket() {
  checkBasket();
  
  let basketItems = JSON.parse(localStorage.getItem("basket"));
  cardTableBody.innerHTML = "";
  let itemCount = 0;
  basketItems.forEach(
    item=>{
      itemCount += item.count;
      cardTableBody.innerHTML += 
      `<tr data-id = ${item.id}>
        <td class="w-25">
          <img src="${item.img}" class="img-fluid img-thumbnail" alt="Sheep">
        </td>
        <td>${item.model}</td>
        <td>${item.price}</td>
        <td class="qty">${item.count}</td>
        <td>${parseInt(item.price)*item.count}$</td>
        <td>
          <i class="fa fa-times">X</i>
        </td>
      </tr>`
    }
  )
}

checkBasket();
fillBasket() 
getBasketItemCountSum(basket);
localStorage.removeItem(basket[0])
console.log(basket[0]);
function checkBasket() {
  if (!localStorage.getItem("basket")) {
    localStorage.setItem("basket",JSON.stringify([]))
  }
}
