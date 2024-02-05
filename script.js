// script.js
const productContainer = {
    Men: document.getElementById('Men'),
    Women: document.getElementById('Women'),
    Kids: document.getElementById('Kids'),
  };
  
  function showProducts(category) {
    for (const key in productContainer) {
      const container = productContainer[key];
      const button = document.getElementById(`${key.toLowerCase()}Button`);
  
      if (key === category) {
        container.style.display = 'flex';
       
        // Add 'active' class to the corresponding button
        if (button) {
          button.classList.add('active');
         button.style.background='black';
         button.style.color='white';
         
        }
      } else {
        container.style.display = 'none';
    
        // Remove 'active' class from other buttons
        if (button) {
           
           
          button.classList.remove('active');
          button.style.background='white';
         button.style.color='black';
        
        }
      }
    }
  }
  
  // Fetch product data from the API
  fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
      // Process the data and create product cards
      data.categories.forEach(category => {
        const categoryContainer = productContainer[category.category_name];
    
        category.category_products.forEach(product => {
          const card = createProductCard(product);
          categoryContainer.appendChild(card);
        });
      });
    })
    .catch(error => console.error('Error fetching product data:', error));
  
  function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
  
    // Add product details to the card
  
    card.innerHTML = `
      <img src="${product.image}" alt="imgs" style="width:500px,height
      800px">
      ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
      <ul class="titles" style="padding:0px;">
     <li style="list-style:none;"> <h3 style="font-size:60px;margin-right:60px;">${product.title.length>10?(product.title.substring(0,11)+".."):product.title}</h3></li>
     
      <li class="dotp" style="font-size:50px;margin-left:80px;" > ${product.vendor}</li>
      </ul>
      <div class="prices">
      <h3 style="font-size:50px">Rs: $${product.price}</h3>
      <h3 id="compare" style="font-size:50px;margin-left:70px;color:#8F8F8F;text-decoration:line-through">${product.compare_at_price}</h3>
      <h3 style="font-size:50px;margin-left:70px;color:red">${calculateDiscount(product.price, product.compare_at_price)}% off</h3>
      </div>
     <button>Add to Cart</button>
    `;
   
    return card;
  }
  
  function calculateDiscount(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
  }
  showProducts('Men');