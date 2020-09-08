"use strict";

let paymentDetails = [
    {
        amount: 1000,
        month:"August",
        type:'D',
        category: "Medical",
        des:"Medical"
    },
    {
        amount: 1000,
        month:"September",
        type:'D',
        category: "Shopping",
        des:"Shopping"
    },
    {
        amount: 1000,
        month:"July",
        type:'D',
        category: "Grocery",
        des:"Grocery"
    },
    {
        amount: 1000,
        month:"August",
        type:'D',
        category: "Travel",
        des:"Travel"
    },
    {
        amount: 1000,
        month:"July",
        type:'C',
        category: "Loan",
        des:"Loan"
    },
    {
        amount: 1000,
        month:"August",
        type:'D',
        category: "Shopping",
        des:"Shopping"
    },
    {
        amount: 1000,
        month:"July",
        type:'D',
        category: "Shopping",
        des:"Shopping"
    },
    {
        amount: 1000,
        month:"August",
        type:'D',
        category: "Shopping",
        des:"Shopping"
    },
    {
        amount: 1000,
        month:"July",
        type:'D',
        category: "Shopping",
        des:"Shopping"
    },
    {
        amount: 1000,
        month:"August",
        type:'D',
        category: "Shopping",
        des:"Shopping"
    }
];

let validateForm = () =>  {
    event.preventDefault();

    let amount= Number(document.querySelector("#formAmount").value);
    let date=document.querySelector("#formDate").value;
    let type=document.querySelector("#formPayType").selectedOptions[0].value;
    let category= document.querySelector("#formCategory").value;
    let des=document.querySelector("#formDes").value;

     // get month from date
    let res = date.split('-');
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[res[1]-1];
    let availableAmount = Number(document.querySelector(".totalAmount").textContent);
    if (amount > availableAmount && type==='D') {
      alert("Insufficeint balance");
      return false;
    }

    let paymentItem = {
        amount: amount,
        month:month,
        type:type,
        category: category,
        des:des
    }

    paymentDetails.unshift(paymentItem);
    document.forms["paymentForm"].reset();
    if(type==='D'){
        document.querySelector(".totalAmount").textContent = availableAmount-amount;
    }
    else{
        document.querySelector(".totalAmount").textContent = availableAmount+amount;
    }
    
  }

  let fetchMonths = () => {
      let selectMonth = document.querySelector(".monthlyTransaction");
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const today = new Date();
        let d;
        let month;
        for(let i = 6; i > 0; i -= 1) {
            d = new Date(today.getFullYear(), today.getMonth() - (i-1), 1);
            month = monthNames[d.getMonth()];
            const newOption = document.createElement('option');
            const optionText = document.createTextNode(month);
            // set option text
            newOption.appendChild(optionText); 
            selectMonth.appendChild(newOption); 
        }
  }
  fetchMonths();
 
  let handleFrequency = () => {
        if(document.querySelector("#frequency").value==="Current")
        {
            let divs = document.querySelectorAll('.checkFrequency');
            for (var i = 0; i < divs.length; i++) {
                divs[i].classList.add('forMonthly');
            }
        }
        else{
            let divs = document.querySelectorAll('.checkFrequency');
            for (var i = 0; i < divs.length; i++) {
                divs[i].classList.remove('forMonthly');
            }
        }
    }

    let renderChart = (cat, amount) => {
        document.querySelector('.chartbox').innerHTML = '';
        document.querySelector('.chartbox').innerHTML= '<canvas id="pieChart" style="max-width: 500px;"></canvas>';
        setTimeout(function(){
            let ctxP = document.getElementById("pieChart").getContext('2d');
            let pieChart = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: cat,
                datasets: [{
                data: amount,
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true
            }
            });
       }, 0);
        
    }

    let generate_current_table = (data, num) => {
        let categories = [];
        let amountList = [];
        // clear table before
        if(document.querySelector("#expTable").contains(document.querySelector("tbody"))){
            document.querySelector("#expTable tbody").remove();
        }
        // get the reference for the body
        let tbl = document.getElementById("expTable");
        let tblBody = document.createElement("tbody");
        let counter = 0;
        if(num){
            counter = num;
        }
        else{
            counter = data.length
        }
        for (let i = 0; i < counter; i++) {
          // creates a table row
          let tblRow = document.createElement("tr");
          let itar = data[i];
          categories.push(itar.category);
          amountList.push(itar.amount);
          let rowContent = `<td>${itar.month}</td>
          <td title="${itar.des}">${itar.des}</td>
          <td>${itar.category}</td>
          <td>${itar.amount}</td>
          <td>${itar.type}</td>`
        tblRow.innerHTML = rowContent;
          tblBody.appendChild(tblRow);
        }
        tbl.appendChild(tblBody);
        renderChart(categories, amountList)
      }
      

      let generate_monthly_table = () => {
          const selectedMonth = document.querySelector(".monthlyTransaction").value;
          const selectedCategory = document.querySelector("#transCategory").value;
          const tableData = [];
        for (let index in paymentDetails) {
            console.log(paymentDetails[index].category);
            if(paymentDetails[index].category===selectedCategory && paymentDetails[index].month === selectedMonth){
                tableData.push(paymentDetails[index]);
            }
          }
          generate_current_table(tableData);
      }
 

    let transactionForm = () => {
        event.preventDefault();
        let frequency = document.querySelector("#frequency").value;
        if(frequency==='Current'){
            generate_current_table(paymentDetails, 10);
            document.querySelector('#setTransArea').classList.remove('transArea');
        }
        else{
            generate_monthly_table();
        }        
      }
 
    