// swiper-images-main
const swiper = new Swiper('.swiper-images-main', {
  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
// swiper-images-main

// cart local stogre
const cart = localStorage.getItem("cart");
if(!cart){
  localStorage.setItem("cart", JSON.stringify([]));
}
// cart


// show mini cart
const ShowMiniCart = () => {
  const minicart = document.querySelector("span[mini-cart]")
  if(minicart){
    const cart = JSON.parse(localStorage.getItem("cart"));
    minicart.innerHTML = cart.length
  }
}
ShowMiniCart()
// show mini cart
const formCart = document.querySelector("[form-add-to-cart]")
if(formCart){
  formCart.addEventListener("submit", (e) => {
    e.preventDefault()
    const tour_id = parseInt(formCart.getAttribute("tour-id"))
    const quantity = parseInt(e.target.quantity.value)
    if(tour_id && quantity > 0){
      const data = {
        tour_id: tour_id,
        quantity: quantity
      }
      const cart = JSON.parse(localStorage.getItem("cart"))
      const child = cart.find(item => item.tour_id == data.tour_id)
      if(child){
        child.quantity = child.quantity + data.quantity
      }else{
        cart.push(data)
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      ShowMiniCart()
    }
  })
}

const drawCart = () => {
  const tableCart = document.querySelector(".table-cart")
  if(tableCart){
    fetch("/cart/list", {
      method: "POST",
      body: localStorage.getItem("cart"),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        const totle = data.totle;
        const tours = data.tours;

        const htmlsTr = tours.map((item,index) => 
          `
            <tr>
              <td>${index + 1}</td>
              <td><img src=${item.image} alt=${item.title} width="80px"/></td>
              <td><a href="tour/detail/${item.slug}"></a></td>
              <td>${item.price_special.toLocaleString()}đ</td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value=${item.quantity}
                  min="1"
                  item-id=${item.tour_id}
                  style="width: 60px"
                />
              </td>
              <td>${item.totle.toLocaleString()}đ</td>
              <td>
                <button class="btn btn-sm btn-danger" btn-delete=${item.tour_id}>Xóa</button>
              </td>
            </tr>
          `
        )

        const tbody = tableCart.querySelector("tbody")
        tbody.innerHTML = htmlsTr.join("")
        const totlePirce = document.querySelector(".totle-price")
        if(totlePirce){
          totlePirce.innerHTML = totle.toLocaleString()
        }
      })
  }
}
drawCart()