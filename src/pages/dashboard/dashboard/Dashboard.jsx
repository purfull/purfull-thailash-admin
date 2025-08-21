// import { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const Dashboard = () => {

//     const monthDataSeries1 = {
//         prices: [8100, 8200, 8300, 8500, 8700, 9000, 9100],
//         dates: [
//           "2023-09-01",
//           "2023-09-02",
//           "2023-09-03",
//           "2023-09-04",
//           "2023-09-05",
//           "2023-09-06",
//           "2023-09-07",
//         ],
//       };

//     const [state, setState] = useState({
//         series: [
//             {
//             name: 'Sales',
//             data: [
//                 { x: new Date('2023-11-01').getTime(), y: 1 },
//                 { x: new Date('2023-11-02').getTime(), y: 5 },
//                 { x: new Date('2023-11-03').getTime(), y: 3 },
//                 { x: new Date('2023-11-04').getTime(), y: 5 },
//                 { x: new Date('2023-11-05').getTime(), y: 6},
//                 { x: new Date('2023-11-06').getTime(), y: 10 },
//                 { x: new Date('2023-11-07').getTime(), y: 6 },
//             ],
//             },
//         ],
//         options: {
//             chart: {
//             height: 100,
//             type: 'line',
//             toolbar: { show: false },
//             },
//             grid: {
//               show: false,
//             },
//             stroke: {
//             width: 4,
//             curve: 'smooth', 
//             },
//             xaxis: {
//                 type: 'datetime',
//                 tickAmount: 4, 
//                 labels: {
//                     show: false,
//                     formatter: function (value, timestamp) {
//                     return new Date(timestamp).toLocaleDateString('en-GB', {
//                         day: '2-digit',
//                         month: 'short',
//                     });
//                     },
//                 },
//                 axisBorder: { show: false },
//                 axisTicks: { show: false } 
//             },
//             yaxis: {
//                 labels: { show: false }, 
//                 axisBorder: { show: false }, 
//                 axisTicks: { show: false }   
//             },

//             title: {
//             text: '',
//             align: 'left',
//             },
//             fill: {
//                 type: 'gradient',
//                 gradient: {
//                   shade: 'dark',
//                   gradientToColors: [ '#FDD835'],
//                   shadeIntensity: 1,
//                   type: 'horizontal',
//                   opacityFrom: 1,
//                   opacityTo: 1,
//                   stops: [0, 100, 100, 100]
//                 },
//               }

//         },
//     });



//     return ( 
//         <div className="grid gap-6">
//             <div className="grid grid-cols-12 gap-6">
//                 <div className="bg-white h-[40vh] col-span-4 my-shadow p-4">
//                     <div className="heading-2 mb-3">Sales This Month</div>
//                     <div className="text-gray-500 text-sm font-medium">Total Sales This Month</div>
//                     <div className="text-[#3b4056d8] text-lg font-medium">₹28,450</div>
//                         <ReactApexChart options={state.options} series={state.series} height="65%" type="line"  />

//                 </div>
//                 <div className="bg-white h-[40vh] col-span-4 my-shadow"></div>
//                 <div className="bg-white h-[40vh] col-span-4 my-shadow"></div>

//             </div>
//             <div className="grid grid-cols-12 gap-6">
//                 <div className="bg-white h-[60vh] col-span-6 my-shadow"></div>
//                 {/* <div className="bg-white h-[30vh] col-span-3 my-shadow"></div> */}
//                 <div className="bg-white h-[60vh] col-span-6 my-shadow"></div>

//             </div>

//         </div>
//      );
// }

// export default Dashboard;

import { useState } from "react";
// import ReactApexChart from "react-apexcharts";
import './Dashboard.css'; // Import the CSS
// import {
//   // Countries,
//   // Earning,
//   ProductsOverview,
//   // Recentorders,
// } from "./dashboardData";
// import Pageheader from "../../components/common/pageheader/pageheader";

const Dashboard = () => {
    // const [Data, setData] = useState(ProductsOverview);
    const [editData, setEditData] = useState();
    const [online, setOnline] = useState()
  
    const userdata = [];
  
    // const myfunction = (idx) => {
    //   let Data;
    //   for (Data of ProductsOverview) {
    //     if (Data.name[0] == " ") {
    //       Data.name = Data.name.trim();
    //     }
    //     if (Data.name.toLowerCase().includes(idx.toLowerCase())) {
    //       if (Data.name.toLowerCase().startsWith(idx.toLowerCase())) {
    //         userdata.push(Data);
    //       }
    //     }
    //   }
    //   setData(userdata);
    // };
    const handleChange = (event) => {
      const { id, value } = event.target;
      setEditData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };
  
 const handleDownload = async (type) => {
    try {
      const response = await fetch(
        `${AppEnv.baseUrl}/order/reports?startDate=${
          editData.startDate
        }&endDate=${editData.endDate}&type=${type ? "B2B" : "B2C"}&isOnline=${online}`
      );
      const result = await response.json();
      console.log(result, "Filtered Data");

      if (result) {
        const worksheet = XLSX.utils.json_to_sheet(result.data);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });

        saveAs(blob, type ? "B2B-report.xlsx" : "B2C-report.xlsx");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
  }


    const handleTypeChange = (e) => {
    console.log("eeeeeeee",e.target.value);
    const isOnline = e.target.value === 'online' ? true : false
    setOnline(isOnline)
    
  }
  

  const [state, setState] = useState({
    series: [
      {
        name: 'Sales',
        data: [
          { x: new Date('2023-11-01').getTime(), y: 1 },
          { x: new Date('2023-11-02').getTime(), y: 5 },
          { x: new Date('2023-11-03').getTime(), y: 3 },
          { x: new Date('2023-11-04').getTime(), y: 5 },
          { x: new Date('2023-11-05').getTime(), y: 6 },
          { x: new Date('2023-11-06').getTime(), y: 10 },
          { x: new Date('2023-11-07').getTime(), y: 6 },
        ],
      },
    ],
    options: {
      chart: {
        height: 100,
        type: 'line',
        toolbar: { show: false },
      },
      grid: {
        show: false,
      },
      stroke: {
        width: 4,
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 4,
        labels: {
          show: false,
          formatter: function (value, timestamp) {
            return new Date(timestamp).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
            });
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      title: {
        text: '',
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      }
    },
  });

  return (
    <div className="dashboard-container">

      <h2>Dashboard Reports</h2>

      <div className="card-container-main">
        <div className="card-1">




          <div className="report-container">
            <div className="report-box">
              <div className="report-body">
                <div className="report-grid">
                  <div className="report-content">
                    <span className="report-title">Download B2C Report</span>

                    <div className="report-field">
                      <span className="report-label">From</span>
                      <input
                        type="date"
                        id="startDate"
                        onChange={handleChange}
                        className="report-input"
                      />
                    </div>

                    <div className="report-field">
                      <span className="report-label">To</span>
                      <input
                        type="date"
                        id="endDate"
                        onChange={handleChange}
                        className="report-input"
                      />
                    </div>

                    <div className="report-radio-group">
                      <label className="report-radio">
                        <input
                          type="radio"
                          name="billingType"
                          value="online"
                        onChange={handleTypeChange}
                        />
                        Online Bill
                      </label>

                      <label className="report-radio">
                        <input
                          type="radio"
                          name="billingType"
                          value="offline"
                        onChange={handleTypeChange}
                        />
                        Offline Bill
                      </label>
                    </div>

                    <div>
                      <button
                        className="report-btn"
                      onClick={() => handleDownload(false)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div className="card-2">
          <div className="report-container">
            <div className="report-box">
              <div className="report-body">
                <div className="report-grid">
                  <div className="report-content">
                    <span className="report-title">Download B2B Report</span>

                    <div className="report-field">
                      <span className="report-label">From</span>
                      <input
                        type="date"
                        id="startDate"
                        onChange={handleChange}
                        className="report-input"
                      />
                    </div>

                    <div className="report-field">
                      <span className="report-label">To</span>
                      <input
                        type="date"
                        id="endDate"
                        onChange={handleChange}
                        className="report-input"
                      />
                    </div>

                    <div className="report-radio-group">
                      <label className="report-radio">
                        <input
                          type="radio"
                          name="billingType"
                          value="online"
                          onChange={handleTypeChange}
                        />
                        Online Bill
                      </label>

                      <label className="report-radio">
                        <input
                          type="radio"
                          name="billingType"
                          value="offline"
                          onChange={handleTypeChange}
                        />
                        Offline Bill
                      </label>
                    </div>

                    <div>
                      <button
                        className="report-btn"
                        onClick={() => handleDownload(true)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>




      {/* <div className="card">
          <div className="heading">Sales This Month</div>
          <div className="subtext">Total Sales This Month</div>
          <div className="amount">₹28,450 {}</div>
          <ReactApexChart
            options={state.options}
            series={state.series}
            height="65%"
            type="line"
          />
        </div>
        <div className="card"></div>
        <div className="card"></div>
      </div> */}
      {/* <div className="row">
        <div className="card tall"></div>
        <div className="card tall"></div>
      </div> */}

      {/* <div className="card-container">
          <div className="card-main">

            <div className="card">
              <div className="box-body">
                <div className="grid">
                  <div className="icon-section">
                    <span className="icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                        fill="#000000"
                      >
                        <path d="M0,0h24v24H0V0z" fill="none" />
                        <g>
                          <path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12
              c1.66,0,3-1.34,3-3V2L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z" />
                          <rect height="2" width="6" x="9" y="7" />
                          <rect height="2" width="2" x="16" y="7" />
                          <rect height="2" width="6" x="9" y="10" />
                          <rect height="2" width="2" x="16" y="10" />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="content-section">
                    <div className="title">Total Customers</div>
                    <div className="number">
                      <span>38,346.</span>
                    </div>
                    <div className="growth">
                      Increase by <span className="badge">+12.0%</span> this month
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* //card 2 */}

      {/* <div className="card">
              <div className="box-body">
                <div className="grid">
                  <div className="icon-section">
                    <span className="icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                        fill="#000000"
                      >
                        <path d="M0,0h24v24H0V0z" fill="none" />
                        <g>
                          <path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12
              c1.66,0,3-1.34,3-3V2L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z" />
                          <rect height="2" width="6" x="9" y="7" />
                          <rect height="2" width="2" x="16" y="7" />
                          <rect height="2" width="6" x="9" y="10" />
                          <rect height="2" width="2" x="16" y="10" />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="content-section">
                    <div className="title">Total Customers</div>
                    <div className="number">
                      <span>38,346.</span>
                    </div>
                    <div className="growth">
                      Increase by <span className="badge">+12.0%</span> this month
                    </div>
                  </div>
                </div>
              </div>

            </div> */}

      {/* //card 3  */}

      {/* <div className="card">
              <div className="box-body">
                <div className="grid">
                  <div className="icon-section">
                    <span className="icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                        fill="#000000"
                      >
                        <path d="M0,0h24v24H0V0z" fill="none" />
                        <g>
                          <path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12
              c1.66,0,3-1.34,3-3V2L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z" />
                          <rect height="2" width="6" x="9" y="7" />
                          <rect height="2" width="2" x="16" y="7" />
                          <rect height="2" width="6" x="9" y="10" />
                          <rect height="2" width="2" x="16" y="10" />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="content-section">
                    <div className="title">Total Customers</div>
                    <div className="number">
                      <span>38,346.</span>
                    </div>
                    <div className="growth">
                      Increase by <span className="badge">+12.0%</span> this month
                    </div>
                  </div>
                </div>
              </div>

            </div> */}
      {/* <div className="card">
              <div className="box-body">
                <div className="grid">
                  <div className="icon-section">
                    <span className="icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                        fill="#000000"
                      >
                        <path d="M0,0h24v24H0V0z" fill="none" />
                        <g>
                          <path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12
              c1.66,0,3-1.34,3-3V2L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z" />
                          <rect height="2" width="6" x="9" y="7" />
                          <rect height="2" width="2" x="16" y="7" />
                          <rect height="2" width="6" x="9" y="10" />
                          <rect height="2" width="2" x="16" y="10" />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="content-section">
                    <div className="title">Total Customers</div>
                    <div className="number">
                      <span>38,346.</span>
                    </div>
                    <div className="growth">
                      Increase by <span className="badge">+12.0%</span> this month
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div> */}


      {/* <div className="report-chart-main">


          <div className=""></div>
          <div className=""></div>
        </div>




      </div> */}

      {/* <div className="customer-container">

        <div className="box">
          <div className="box-header">
            <div className="box-title">Customers</div>
            <div className="dropdown">
              <a href="#" className="dropdown-toggle">
                View All <i className="ri-arrow-down-s-line"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">Today</a></li>
                <li><a href="#">This Week</a></li>
                <li><a href="#">Last Week</a></li>
              </ul>
            </div>
          </div>

          <div className="box-body">
            <div className="stats-row">
              <div className="stat">
                <div className="stat-label">First Half</div>
                <div className="stat-value">
                  <span className="number">1.94k</span>
                  <span className="badge success">+0.9%</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Top Gross</div>
                <div className="stat-value">
                  <span className="number">8.32k</span>
                  <span className="badge success">+0.39%</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Second Half</div>
                <div className="stat-value">
                  <span className="number">13k</span>
                  <span className="badge danger">-0.15%</span>
                </div>
              </div>
            </div>

            <div id="earnings">
              {/* <Earning /> */}
      {/* </div>
          </div> */}





    </div >
  );
}

export default Dashboard;
