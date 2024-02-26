
let myChart;
function buildQueryString() {

 

    let queryString = "(";
  
    document.getElementById("fromDateFFBR").value !== "" &&
    document.getElementById("toDateFFBR").value !== ""
      ? (queryString += `Registration_Date_of_FFBR >= "${
          document.getElementById("fromDateFFBR").value
        }" && Registration_Date_of_FFBR <= "${
          document.getElementById("toDateFFBR").value
        }" && `)
      : null;
  
      document.getElementById("division").value !== "" &&
      document.getElementById("division").value !== "All"
        ? (queryString += `Divisions == ${BigInt(document.getElementById("division").value)} && `)
        : null;
  
      document.getElementById("plant").value !== "" &&
      document.getElementById("plant").value !== "All"
        ? (queryString += `Plants == ${BigInt(document.getElementById("plant").value)} && `)
        : null;
  
    
      // Product Group condition
      document.getElementById("productGroup").value !== "" &&
      document.getElementById("productGroup").value !== "All"
        ? (queryString += `Product_Group == ${BigInt(document.getElementById("productGroup").value)} && `)
        : null;
  
      document.getElementById("product-segment").value !== "" &&
      document.getElementById("product-segment").value !== "All"
        ? (queryString += `Product_Segment == ${BigInt(document.getElementById("product-segment").value)} && `)
        : null;
    
    
      queryString += ")";
  
    return queryString;
}


function generate(){
    let ffbrStrartDate = document.getElementById("fromDateFFBR").value;
    let ffbrEndDate = document.getElementById("toDateFFBR").value;

    if (ffbrStrartDate === "" || ffbrEndDate === "") {
        alert("Please select mandatory FFBR date");
        return;
    }
}






const config = {
    reportName: "Registered_FFBRs",
};
  
  console.log()
ZOHO.CREATOR.init().then(function (data) {
    const { reportName } = config;
    ZOHO.CREATOR.API.getAllRecords({ reportName })
      .then(function (response) {
        console.log("data", { response });
      })
      .catch(function (error) {
        console.error(error);
      });
  
    configOfdivision = {
      appName: "field-failure-feedback-report",
      reportName: "Divisions1",
    };
    configOfplants = {
      reportName: "Plants1",
    };
    configOfProduct_Groups = {
      reportName: "Product_Groups",
    };
    configOfProduct_Segments1 = {
      reportName: "Product_Segments1",
    };
    users = {
      reportName: "Users",
    };
  
    //   for division
    ZOHO.CREATOR.API.getAllRecords(configOfdivision).then(function (response) {
      //callback block
      const divisionSelect = document.getElementById("division");
      console.log("Divisions1 ", response);
      const data = response.data;
      // Loop through the data and create options
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.ID;
        option.textContent = item.Division_Name;
        divisionSelect.appendChild(option);
      });
    });
  
    //   for plants
    ZOHO.CREATOR.API.getAllRecords(configOfplants).then(function (response) {
      //callback block
      
      const divisionSelect = document.getElementById("plant");
      console.log("Plants1 ", response);
      const data = response.data;
      // Loop through the data and create options
  
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.ID;
        option.textContent = item.Plant_Name;
        divisionSelect.appendChild(option);
      });
    });
    //   for Product_Groups
    ZOHO.CREATOR.API.getAllRecords(configOfProduct_Groups).then(function (
      response
    ) {
      //callback block
      const divisionSelect = document.getElementById("productGroup");
      console.log("Product_Groups ", response);
      const data = response.data;
      // Loop through the data and create options
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.ID;
        option.textContent = item.Product_Group_Name;
        divisionSelect.appendChild(option);
      });
    });

//     async function getTheDivsionID() {
//   let selectedElement = document.getElementById("division");
//   let index=selectedElement.selectedIndex
//   let value=selectedElement.options[index].textContent;
//   console.log(value)
//   if (value === "MFG") {
//     const plantSelect = document.getElementById("plant");
//     // Enable the select option
//     plantSelect.disabled = false;

//   } else if (value !== "MFG") {
//     const plantSelect = document.getElementById("plant");

//     // Disable the select option
//     plantSelect.value='All';
//     plantSelect.disabled = true;

//   }
// }


    
  
  //   ZOHO.CREATOR.API.getAllRecords(users).then(function (response) {
  //     //callback block
  //     const divisionSelect = document.getElementById("users1");
  //     console.log("users ", response);
  //     const data = response.data;
  //     // Loop through the data and create options
  //     data.forEach((item) => {
  //       const option = document.createElement("option");
  //       option.value = item.ID;
  //       option.textContent = item.Product_Segment;
  //       divisionSelect.appendChild(option);
  //     });
  //   });
});


async function getTheDivsionID() {
    let selectedElement = document.getElementById("division");
    let index=selectedElement.selectedIndex
    let value=selectedElement.options[index].textContent;
    console.log(value)
    if (value === "MFG") {
      const plantSelect = document.getElementById("plant");
      // Enable the select option
      plantSelect.disabled = false;
  
    } else if (value !== "MFG") {
      const plantSelect = document.getElementById("plant");
        plantSelect.value='All';
      plantSelect.disabled = true;
  
    }
}

function populateProductSegment(){
    //   for Product_Segments1
    const divisionSelect = document.getElementById("product-segment");
    divisionSelect.innerHTML='<option value="All">All</option>';
    
    
    let queryString = "(";
    
  
    document.getElementById("productGroup").value !== "" &&
    document.getElementById("productGroup").value !== "All"
      ? (queryString += `Product_Group == ${BigInt(document.getElementById("productGroup").value)} && `)
      : null;
  
    queryString += ")";
  
    let modifiedQueryString = queryString.trim(); // Remove leading and trailing whitespaces
    modifiedQueryString = modifiedQueryString.slice(0, -5); // Remove the last '&&'
    modifiedQueryString += ")";
  
    const config_New = {
      reportName: "Product_Segments1",
      criteria: modifiedQueryString.trim(),
    };
  
  
    ZOHO.CREATOR.API.getAllRecords(config_New)
    .then(function (response) {
      // callback block
      
      console.log("Product_Segment ", response);
      const data = response.data;
      console.log(data);
      // Loop through the data and create options
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.ID;
        option.textContent = item.Product_Segment;
        divisionSelect.appendChild(option);
      });
    })
  
  
     
}

async function generate(){
  document.getElementById('chart').style.display="none";
    document.getElementById('record_found').textContent=`0 record found`
    document.getElementById('refreshButton').disabled=false;
  if (myChart) {
    myChart.destroy();
  }
  const table = document.getElementById("table");
  table.style.display="none";
  var tbody = document.getElementById("tableBody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  if(document.getElementById("fromDateFFBR").value === "" &&
  document.getElementById("toDateFFBR").value === ""){
    alert('Please select mandatory FFBR date')
    return;
  }
  let fromDate=document.getElementById('fromDateFFBR').value;
  let toDate=document.getElementById('toDateFFBR').value;

  let fromDateObj = new Date(fromDate);
  let toDateObj = new Date(toDate);

  let dateDifference = toDateObj - fromDateObj;

  const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;

  if (dateDifference > oneYearInMilliseconds) {
    alert("The date gap is greater than 1 year.");
    return;
  }

  

  await ZOHO.CREATOR.init();
  let queryString=buildQueryString();
  let modifiedQueryString = queryString.trim(); // Remove leading and trailing whitespaces
  modifiedQueryString = modifiedQueryString.slice(0, -5); // Remove the last '&&'
  modifiedQueryString += ")";
  configOfRegistered_FFBRs = {
    appName: "field-failure-feedback-report",
    reportName: "Registered_FFBRs",
    criteria: modifiedQueryString.trim(),
  };

  let AllResponse;
  try{
    AllResponse = await ZOHO.CREATOR.API.getAllRecords(
      configOfRegistered_FFBRs
    );
  }catch(err){
    document.getElementById('record_found').textContent= `0 records found.` 
  }
  const regFbbrID = [];
  const dataArr = [];
  const regFfbrData = AllResponse.data;
  console.log("regFfbrData", regFfbrData);
  regFfbrData.forEach((el) => {
    regFbbrID.push(el.ID);
  });

  for (let i = 0; i < regFbbrID.length; i++) {
    const regFbbrIDdata = {
      appName: "field-failure-feedback-report",
      reportName: "Registered_FFBRs",
      id: regFbbrID[i],
    };

    const singleUserData = await ZOHO.CREATOR.API.getRecordById(regFbbrIDdata);
    dataArr.push(singleUserData.data);
    console.log('dataArr'+singleUserData.data)

  }
  dataArr.forEach(el=>console.log(el));

  configOfComplaint_Type = {
    reportName: "Complaint_Types",
  };
  let Complaint_Type=await ZOHO.CREATOR.API.getAllRecords(configOfComplaint_Type)
  Complaint_Type=Complaint_Type.data;

  const counts = {};

  dataArr.forEach(item => {
    // Check if 'Nature_of_Problem' is present in the item
    if (item && item.Nature_of_Problem && item.Nature_of_Problem.display_value) {
      const natureOfProblem = item.Nature_of_Problem.display_value;
  
      // If the natureOfProblem is not already in the object, initialize its count to 1
      if (!counts[natureOfProblem]) {
        counts[natureOfProblem] = 1;
      } else {
        // If it's already in the object, increment its count
        counts[natureOfProblem]++;
      }
    }
  });

    // Populate the table with the counts
    const tableBody = document.getElementById('tableBody');

    for (const natureOfProblem in counts) {
        if (counts.hasOwnProperty(natureOfProblem)) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${natureOfProblem}</td>
            <td>${counts[natureOfProblem]}</td>
            `;
            tableBody.appendChild(row);
        }
    }
    if(dataArr.length!==0){
      table.style.display = "block";
      document.getElementById('chart').style.display="flex";
    }
    document.getElementById('record_found').textContent=`${dataArr.length} record found`


    const arrayOfObjects = Object.keys(counts).map(key => ({
      'label': key,
      'y': counts[key],
    }));
    createBarChart(Object.keys(counts), Object.values(counts),arrayOfObjects);
//   updateTable(dataArr);


}
  
function calculateProductSegmentCount(data) {
  const productSegmentOccurrences = {};

  // Loop through the data array
  data.forEach(item => {
    let productSegment = item.Product_Segment.display_value;

    // Check if the productSegment is already in the occurrences object
    if (productSegment in productSegmentOccurrences) {
      // Increment the count
      productSegmentOccurrences[productSegment]++;
    } else {
      // Initialize the count
      productSegmentOccurrences[productSegment] = 1;
    }
  });

  // Now, productSegmentOccurrences object contains the occurrences of each Product_Segment
  console.log(productSegmentOccurrences);
  return productSegmentOccurrences;
}



function updateTable(dataArray) {
  const tableBody = document.getElementById('tableBody');
  const totalCountElement = document.getElementById('totalCount');

  // Clear existing table content
  tableBody.innerHTML = '';

  // Calculate the product segment count
  let resultObject = calculateProductSegmentCount(dataArray);

  // Populate the table body
  // if (Array.isArray(resultArray)) {
    console.log(resultObject)
    for (const key in resultObject) {
      if (resultObject.hasOwnProperty(key)) {
        const value = resultObject[key]
        const row = document.createElement('tr');
        const cellProductSegment = document.createElement('td');
        const cellCount = document.createElement('td');
        cellProductSegment.textContent = key;
        cellCount.textContent = value;

        row.appendChild(cellProductSegment);
        row.appendChild(cellCount);
        tableBody.appendChild(row);
      
    }
    const keys = Object.keys(resultObject);

    const values = keys.map(key => resultObject[key]);

    const arrayOfObjects = Object.keys(resultObject).map(key => ({
      'label': key,
      'y': resultObject[key],
    }));
    resultObject.forEach(el=>console.log(el));
    createBarChart(keys, values,arrayOfObjects);
    
  }

  // Calculate and display the total count
  
}





function setDefaultValues() {
    // Select all input elements
    var inputElements = document.querySelectorAll('input');
  
    inputElements.forEach(function (input) {
      input.value = '';
    });
  
    var selectElements = document.querySelectorAll('select');
  
    selectElements.forEach(function (select) {
      select.value = select.options[0].value;
    });
}
  
  



function setDate(){
  var fromDateFFBR = document.getElementById('fromDateFFBR')
  let toDateFFBR=document.getElementById('toDateFFBR')
  var currentDate = new Date();
  var maxDate = currentDate.toISOString().split('T')[0];
  fromDateFFBR.max = maxDate;
  toDateFFBR.max=maxDate;


  toDateFFBR.max=maxDate;
  
  }

  

  function createBarChart(labels, data,obj) {
    const blueColor = 'rgb(0, 102, 255)';
    // Create a bar chart using Chart.js




    myChart = new CanvasJS.Chart("chartContainer", {

      axisY: {
        title: "Number of Complaints",
        lineColor: "#4F81BC",
        tickColor: "#4F81BC",
        labelFontColor: "#4F81BC"
      },
      axisX: {
        title: "Defects",
        lineColor: "#4F81BC",
        tickColor: "#4F81BC",
        labelFontColor: "#4F81BC"
      },

      data: [{
        type: "column",
        dataPoints: obj
      }]
    });
    myChart.render();
    createPareto();



    function createPareto() {
      var dps = [];
      var yValue, yTotal = 0, yPercent = 0;

      for (var i = 0; i < myChart.data[0].dataPoints.length; i++)
        yTotal += myChart.data[0].dataPoints[i].y;

      for (var i = 0; i < myChart.data[0].dataPoints.length; i++) {
        yValue = myChart.data[0].dataPoints[i].y;
        yPercent += (yValue / yTotal * 100);
        dps.push({ label: myChart.data[0].dataPoints[i].label, y: yPercent });
      }

      myChart.addTo("data", { type: "line", yValueFormatString: "0.##\"%\"", dataPoints: dps });
      myChart.data[1].set("axisYType", "secondary", false);
      myChart.axisY[0].set("maximum", yTotal);
      myChart.axisY2[0].set("maximum", 100);
    }







  //  myChart=new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: 'Defects',
  //         data: data,
  //         backgroundColor: blueColor,
  //         borderColor: 'rgba(75, 192, 192, 1)', // Border color
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         x: {
  //           title: {
  //             display: true,
  //             text: "Defects",
  //             color: "rgb(0, 75, 141)",
  //             font: {
  //               size: 14,
  //               family: "Arial"
  //             }
  //           },
  //           beginAtZero: true
  //         },
  //         y: {
  //           title: {
  //             display: true,
  //             text: "Count of Defects",
  //             color: "rgb(0, 75, 141)",
  //             font: {
  //               size: 14,
  //               family: "Arial"
  //             }
  //           },
  //           interlacedColor: "azure",
  //           tickColor: "azure",
  //           titleFontColor: "rgb(0, 75, 141)",
  //           valueFormatString: "#M,,.",
  //           interval: 100000000,
  //           beginAtZero: true
  //         }
  //       }
  //     },
      
      

    // });

  }


  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

