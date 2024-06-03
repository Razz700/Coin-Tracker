let coindata;
async function main(){
  try{await  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false').then((res)=>{
    return res.json();
    }).then((data)=>{
    coindata=data;
    });
}catch(error){ console.log('An Error occured!!',error);}
render();
function render(){
    document.querySelector('#search').value="";
    document.querySelector('table>tbody').innerHTML="";
    coindata.forEach((item,i)=> {
        document.querySelector('table>tbody').innerHTML+=`
    <tr>
    <td><img src='${item.image}' alt='coin image'></td>
    <td>${item.name}</td>
    <td>${item.symbol}</td>
    <td>$${item.current_price}</td>
    <td>$${item.total_volume}</td>
    <td id="a${i}">${item.market_cap_change_percentage_24h}%</td>
    <td>$${item.market_cap}</td>
    </tr>`;
    
    if (item.market_cap_change_percentage_24h>0) {
     document.querySelector(`#a${i}`).style.color="#14840b";
    }else{
        document.querySelector(`#a${i}`).style.color="#9f2121";
    }
    });
}

// sort function
let sortbymkt=document.getElementById('sortMkt');
let sortbypercent=document.getElementById('sortPercent');

sortbymkt.addEventListener('click',()=>{
  let  arr=[];
coindata.forEach((item)=>{
arr.push(item.market_cap);
});
arr.sort((a,b)=>{
return a-b;
});
document.querySelector('table>tbody').innerHTML="";
arr.forEach((cap)=>{
coindata.forEach((item,i)=>{
if (cap==item.market_cap) {
    document.querySelector('table>tbody').innerHTML+=`
<tr>
<td><img src='${item.image}' alt='coin image'></td>
<td>${item.name}</td>
<td>${item.symbol}</td>
<td>$${item.current_price}</td>
<td>$${item.total_volume}</td>
<td id='b${i}'>${item.market_cap_change_percentage_24h}%</td>
<td>$${item.market_cap}</td>
</tr>`;
if (item.market_cap_change_percentage_24h>0) {
    document.querySelector(`#b${i}`).style.color="#14840b";
   }else{
       document.querySelector(`#b${i}`).style.color="#9f2121";
   }
}});});
});

sortbypercent.addEventListener('click',()=>{
    let arr=[];
    coindata.forEach((item)=>{
        arr.push(item.market_cap_change_percentage_24h);
        });
        arr.sort((a,b)=>{
        return b-a;
        });
        document.querySelector('table>tbody').innerHTML="";
        arr.forEach((percent)=>{
        coindata.forEach((item,i)=>{
        if (percent==item.market_cap_change_percentage_24h) {
            document.querySelector('table>tbody').innerHTML+=`
        <tr>
        <td><img src='${item.image}' alt='coin image'></td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>$${item.current_price}</td>
        <td>$${item.total_volume}</td>
        <td id='c${i}'>${item.market_cap_change_percentage_24h}%</td>
        <td>$${item.market_cap}</td>
        </tr>`;
        if (item.market_cap_change_percentage_24h>0) {
            document.querySelector(`#c${i}`).style.color="#14840b";
           }else{
               document.querySelector(`#c${i}`).style.color="#9f2121";
           }
        }});});
});

//search 
let search=document.querySelector('#search');
search.addEventListener('input',()=>{
    let val=search.value.toLowerCase().trim();
    let arr1=[];
    if(val!=""){
        coindata.forEach((item)=>{
if (item.name.toLowerCase().includes(val) || item.symbol.toLowerCase().includes(val) || JSON.stringify(item.current_price).includes(val) || JSON.stringify(item.market_cap_rank).includes(val) || JSON.stringify(item.market_cap).includes(val) || JSON.stringify(item.market_cap_change_percentage_24h).includes(val) || JSON.stringify(item.total_volume).includes(val)) {
    arr1.push(item);
}});
if (arr1.length>0) {
    document.querySelector('table>tbody').innerHTML="";
    arr1.forEach((item,i)=> {
        document.querySelector('table>tbody').innerHTML+=`
    <tr>
    <td><img src='${item.image}' alt='coin image'></td>
    <td>${item.name}</td>
    <td>${item.symbol}</td>
    <td>$${item.current_price}</td>
    <td>$${item.total_volume}</td>
    <td id="d${i}">${item.market_cap_change_percentage_24h}%</td>
    <td>$${item.market_cap}</td>
    </tr>`;
    
    if (item.market_cap_change_percentage_24h>0) {
     document.querySelector(`#d${i}`).style.color="#14840b";
    }else{
        document.querySelector(`#d${i}`).style.color="#9f2121";
    }});  
}else{
    document.querySelector('table>tbody').innerHTML=`
    <tr><td>Search Result not found!!</td></tr>`;
}
}else{
render();
}
});
}
main();