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
    //console.log(phones);
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
         
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success mt-3">Explore</button>
        </div>
    </div>
        `
        phonesContainer.appendChild(div);
    })
}

// load single phone details 
const loadPhoneDetails = slugs => {
    console.log(slugs)
    const url = `https://openapi.programming-hero.com/api/phone/${slugs}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

//display single phone details in UI
const displayPhoneDetails = slugs => {
    console.log(slugs)
    const detailsContainer = document.getElementById('show-details');
    const div = document.createElement('div');
    const releaseDateFromData = ` ${slugs.releaseDate}`;
    div.innerHTML = `
     <img src="${slugs.image}" class="card-img-top w-25" alt="...">
     <div class="card-body">
     <h5 class="card-title fw-bold">Phone Name: ${slugs.name}</h5>
         <h6 class="card-title fw-bold text-muted">Release Date: ${slugs.releaseDate ? slugs.releaseDate : 'Not found'}</h6>
         
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
             content.</p>
         
     </div>
     `;
    detailsContainer.appendChild(div);



}