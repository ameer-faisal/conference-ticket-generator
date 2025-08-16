const uploadBox = document.getElementById('upload-box');
const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatar-preview');
const iconUpload = document.getElementById('icon-upload');
const boxP = document.querySelector('.box-p');
const removeImageButton = document.getElementById('remove-image');
const changeImageButton = document.getElementById('change-image');  
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputgithub = document.getElementById('github');
const genBtn = document.getElementById('gen-btn')
const avatarTicket = document.getElementById('avatar-ticket');
const nameTicket = document.getElementById('name-ticket');
const githubTicket = document.getElementById('github-ticket');
const ticketId = document.getElementById('ticket-id');
const ticket = document.querySelector('.ticket');
const date = document.getElementById('date');
const locaion = document.getElementById('locaion');
const form = document.querySelector('form');
const congrats = document.getElementById('congrats');
const emailed = document.getElementById('emailed');
const header = document.getElementById('h2');
const paragraph = document.getElementById('p1');

avatarInput.addEventListener('change', uploadFile);
uploadBox.addEventListener('drop', uploadFile);


let uploadedFile;
function uploadFile(event) {
    event.preventDefault(); 

    let files;
    if (event.type === "change") {
        files = event.target.files; 
    } else if (event.type === "drop") {
        files = event.dataTransfer.files; 
    }

    
    if (!files || files.length === 0) {
        console.warn("No file selected");
        return;
    }

    const file = files[0];
    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

    
    if (!fileTypes.includes(file.type)) {
        alert('Please upload a valid image file (PNG, JPEG, JPG, GIF).');
        return;
    }

    
    if (file.size > 500000) {
        alert('File size exceeds 500KB limit. Please upload a smaller image.');
        return;
    }

uploadedFile = file;
    let imgUrl = URL.createObjectURL(file);

    avatarPreview.style.backgroundImage = `url(${imgUrl})`;
    avatarPreview.hidden = false;
    iconUpload.hidden = true;
    boxP.hidden = true;
    removeImageButton.hidden = false;
    changeImageButton.hidden = false;
    uploadBox.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
}

uploadBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadBox.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
});

removeImageButton.addEventListener('click', () => {
    avatarPreview.style.backgroundImage = '';
    avatarPreview.hidden = true;
    iconUpload.hidden = false;
    boxP.hidden = false;
    removeImageButton.hidden = true;
    changeImageButton.hidden = true;
});

changeImageButton.addEventListener('click', () => {
    avatarInput.click();
});

const today = new Date();
const formattedDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
date.textContent = formattedDate;
locaion.textContent = 'Austin, TX';
genBtn.addEventListener('click', (event) => {
    event.preventDefault();
    nameTicket.textContent = inputName.value;
    githubTicket.textContent = inputgithub.value;
    if (uploadedFile) {
        let imgUrl = URL.createObjectURL(uploadedFile);
        avatarTicket.src = imgUrl;
    } else {
        avatarTicket.src = ''; 
    }
    ticketId.textContent = "#" + Math.floor(Math.random() * 1000000);
    ticket.hidden = false;
    form.hidden = true;
    ticket.style.display = 'flex';
congrats.hidden = false;
    congrats.innerHTML = `Congrats, <span class="header-name">${inputName.value}</span> !<br> Your ticket is ready.`;
    emailed.hidden = false;
    emailed.innerHTML = `We've emailed your ticket to<br> 
    <span>${inputEmail.value}</span> and will send updates in<br>
    the run up to the event.`;
    header.hidden = true;
    paragraph.hidden = true;
});
