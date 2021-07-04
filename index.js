function getFormattedTime(){
 const now = new Date().toLocaleTimeString('en-us',{
        month:'short',
        day:'numeric',
        hour:'2-digit',
        minute:'2-digit',
 }
 );

 const date = now.split(',')[0].split(' ');
 const time = now.split(',');
 const formattedTime =` ${date[1]} ${date[0]},${time}`;



 return formattedTime;
}



document.querySelector('#ewallet-form')
.addEventListener('submit',function(e){
    e.preventDefault();

    const type = document.querySelector('.add__type').value;
    const desc = document.querySelector('.add__description').value;
    const value =document.querySelector('.add__value').value;
     
    if (desc.length> 0 && value.length > 0){
    addItems(type, desc, value);

    
    resetForm();
    }
    
});
 
showItems();

function showItems(){
  let items = getitemsfromLS();
  const collection = document.querySelector('.collection');
  for(let item of items){
    const newHtml =`
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.desc}</p>
      </div>
      <div class="item-time">
        <p>${item.time}</p>
      </div>
    </div>
    <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount'}">
      <p>${item.type}${item.value}</p>
    </div>
  </div>
    
    
    `;
    collection.insertAdjacentHTML('afterbegin',newHtml);
  }
}

function addItems(type,desc,value){
  const time = getFormattedTime();
    const newHtml =`
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'}">
      <p>${type}${value}</p>
    </div>
  </div>
    
    
    `;
    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin',newHtml);
    
    addTimestoLS(desc,time,type,value);
    showTotalExpense();
    showTotalIncome();

}
function resetForm(){

    document.querySelector('.add__type').value = "+";
    document.querySelector('.add__description').value = "";
    document.querySelector('.add__value').value= "";
}

function getitemsfromLS(){
  let items = localStorage.getItem('items');


  if(items){
    items = JSON.parse(items);

  }
  else {
    items =[];
  }

  return items;
} 

function addTimestoLS(desc, time, type, value){

  let items =getitemsfromLS();

  items.push({desc,time,type,value});

  localStorage.setItem('items',JSON.stringify(items));
}

showTotalIncome();

function showTotalIncome(){
  let items = getitemsfromLS();

  let totalIncome = 0;
  for(let item of items){
    if(item.type ==='+'){
      totalIncome += parseInt(item.value);
    }
  }
document.querySelector('.income__amount p').innerText = `$${totalIncome}`;
  
}


showTotalExpense();

function showTotalExpense(){

  let items =getitemsfromLS();
  let totalExpense = 0;

  for(let item of items){
    if(item.type ==='-'){
      totalExpense += parseInt(item.value);
    }
  }
  document.querySelector('.expense__amount p').innerText = `$${totalExpense}`;
  
}