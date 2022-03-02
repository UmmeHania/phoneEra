// load phones data 
const loadPhones = () => {
    const searchInput = document.getElementById('search-input');
    let searchValue = searchInput.value;
    //error handling for empty input 
    const errorDiv = document.getElementById('error-text');
    if (searchValue == '') {
        errorDiv.innerText = 'Write something please!';
        const phonesContainer = document.getElementById('phone-holder');
        phonesContainer.textContent = '';
    }
    else {
        errorDiv.innerText = '';
        searchInput.value = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
    }
}

//show phones in UI
const displayPhones = phones => {
    const phone20 = phones.slice(0, 20)
    //handle error if search input is not found
    const phonesContainer = document.getElementById('phone-holder');
    phonesContainer.textContent = '';
    const detailsContainer = document.getElementById('show-details');
    detailsContainer.textContent = '';
    //handling error if the search result do not match with stored data
    const errorDiv = document.getElementById('error-text');
    if (phones == '') {
        errorDiv.innerText = 'Nothing found for you!';
    }
    else {
        errorDiv.innerText = '';
        phone20.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
         <div class="card h-100">
           <div class="mx-auto mt-3 w-50"><img src="${phone.image}" class="card-img-top" alt="..."></  div>
           <div class="card-body mx-auto"> 
           <div class="height">
            <h5 class="card-title fw-bold">${phone.phone_name}</h5>
            <h6 class="card-title fw-bold text-muted">Brand: ${phone.brand ? phone.brand : 'Not found'}</h6>     
            </div>    
            <button id="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success mt-3 fw-bold text-dark">Explore Now</button>
          </div>
         </div>`;
            phonesContainer.appendChild(div);
        })
    }
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
    div.classList.add('col-div');
    div.innerHTML = `
    <div class="d-flex justify-content-center pt-3"> <img src="${slugs.image}" class="card-img-top w-25" alt="..."></div>
     <div class="card-body text-left">
     <h5 class="card-title fs-3 fw-bold text-center">Phone Name: ${slugs.name}</h5>
     <h6 class="card-title fw-bold text-muted fs-5 text-center">Release Date: ${slugs.releaseDate ? slugs.releaseDate : 'Not found'}</h6>
    <div class="text-left">
       <h5 class="fw-bold">Features:</h5>
       <div class="">${slugs.mainFeatures ? `<ul class="">
       <li><span class="fw-bold">Storage</span>: ${slugs.mainFeatures.storage ? slugs.mainFeatures.storage : 'Not found'}</li>
       <li><span class="fw-bold"> Display Size</span>: ${slugs.mainFeatures.displaySize ? slugs.mainFeatures.displaySize : 'Not found'}</li>
       <li><span class="fw-bold">Chipset</span>: ${slugs.mainFeatures.chipSet ? slugs.mainFeatures.chipSet : 'Not found'}</li>
       <li><span class="fw-bold">Memory</span>: ${slugs.mainFeatures.memory ? slugs.mainFeatures.memory : 'Not found'}</li>
       <li><span class="fw-bold">Storage</span>: ${slugs.mainFeatures.storage ? slugs.mainFeatures.storage : 'Not found'}</li>
       </ul>` : "not found"}
     </div>
     </div>
     <h5 class="fw-bold">Sensors:</h5>
     <p>${slugs.mainFeatures.sensors.join(' , ')}</p>
     <h5 class="fw-bold">Others:</h5>
       <div>${slugs.others ? `<ul class="text-left">
       <li><span class="fw-bold">WLAN</span>:${slugs.others.WLAN ? slugs.others.WLAN : 'Not found'}</li>
       <li><span class="fw-bold">Bluetooth</span>:${slugs.others.Bluetooth ? slugs.others.Bluetooth : 'Not found'}</li>
       <li><span class="fw-bold">GPS</span>:${slugs.others.GPS ? slugs.others.GPS : 'Not found'}</li>
       <li><span class="fw-bold">NFC</span>:${slugs.others.NFC ? slugs.others.NFC : 'Not found'}</li>
       <li><span class="fw-bold">Radio</span>:${slugs.others.Radio ? slugs.others.Radio : 'Not found'}</li>
      <li><span class="fw-bold">USB</span>:${slugs.others.USB ? slugs.others.USB : 'Not found'}</li>
      </ul>` : "not found"}
     </div>
    </div> `;
    detailsContainer.appendChild(div);
}


