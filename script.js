// load phones data 
const loadPhones = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}

//show phones in UI
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-holder');
    phonesContainer.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
      <div class="mx-auto"><img src="${phone.image}" class="card-img-top" alt="..."></div>
        <div class="card-body mx-auto">
            <h5 class="card-title fw-bold">${phone.phone_name}</h5>
            <h6 class="card-title fw-bold">Brand: ${phone.brand}</h6>
            <button onclick="loadPhoneDetails()" class="btn btn-success mt-3">Explore</button>
        </div>
    </div>
        `
        phonesContainer.appendChild(div);
    })
}