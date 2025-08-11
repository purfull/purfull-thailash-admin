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
import ReactApexChart from "react-apexcharts";
import './Dashboard.css'; // Import the CSS

const Dashboard = () => {

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
      <div className="row">
        <div className="card">
          <div className="heading">Sales This Month</div>
          <div className="subtext">Total Sales This Month</div>
          <div className="amount">₹28,450</div>
          <ReactApexChart
            options={state.options}
            series={state.series}
            height="65%"
            type="line"
          />
        </div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
      <div className="row">
        <div className="card tall"></div>
        <div className="card tall"></div>
      </div>
    </div>
  );
}

export default Dashboard;
