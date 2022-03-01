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
    const detailsContainer = document.getElementById('show-details');
    detailsContainer.textContent = '';
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
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    const releaseDateFromData = ` ${slugs.releaseDate}`;
    div.innerHTML = `
    <div class="d-flex justify-content-center"> <img src="${slugs.image}" class="card-img-top w-25" alt="..."></div>
     <div class="card-body text-center">
     <h5 class="card-title fs-3 fw-bold">Phone Name: ${slugs.name}</h5>
         <h6 class="card-title fw-bold text-muted fs-5">Release Date: ${slugs.releaseDate ? slugs.releaseDate : 'Not found'}</h6>
        <h5 class="fw-bold">Features:</h5>
      <ul class="">
          <li>Storage: ${slugs.mainFeatures.storage ? slugs.mainFeatures.storage : 'Not found'}</li>
          <li>Display Size: ${slugs.mainFeatures.displaySize ? slugs.mainFeatures.displaySize : 'Not found'}</li>
          <li>Chipset: ${slugs.mainFeatures.chipSet ? slugs.mainFeatures.chipSet : 'Not found'}</li>
          <li>Memory: ${slugs.mainFeatures.memory ? slugs.mainFeatures.memory : 'Not found'}</li>
          <li>Storage: ${slugs.mainFeatures.storage ? slugs.mainFeatures.storage : 'Not found'}</li>
     </ul>
     <h5 class="fw-bold">Sensors:</h5>
     <p>${slugs.mainFeatures.sensors}</p>
     <h5 class="fw-bold">Others:</h5>
     <ul>
     <li>WLAN:${slugs.others.WLAN ? slugs.others.WLAN : 'Not found'}</li>
     <li>Bluetooth:${slugs.others.Bluetooth ? slugs.others.Bluetooth : 'Not found'}</li>
     <li>GPS:${slugs.others.GPS ? slugs.others.GPS : 'Not found'}</li>
     <li>NFC:${slugs.others.NFC ? slugs.others.NFC : 'Not found'}</li>
     <li>Radio:${slugs.others.Radio ? slugs.others.Radio : 'Not found'}</li>
     <li>USB:${slugs.others.USB ? slugs.others.USB : 'Not found'}</li>

     </ul>
    
    </div>
     `;
    detailsContainer.appendChild(div);



}