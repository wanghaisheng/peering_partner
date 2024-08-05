'use client'

import CountrySelector from '../countrySelection/selector';
import { SelectMenuOption } from '../countrySelection/types';
import { COUNTRIES } from '../countrySelection/countries';
import React, { useState, useEffect } from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import * as echarts from 'echarts';
import { backendURL } from '@/app/api/backendURL';
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Props {
  slug: string;
}


export default function TrafficDetailedPage(
  { slug }: Props

) {

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  console.log(pathname)

  const searchParams = useSearchParams()
 

  const search = searchParams.get('location')

  const router = useRouter()
  
const searchString: string = slug?.toString() || '';
  console.log("location is", slug)
 
  // Default this to a country's code to preselect it
  const countrySelected = {
    title: "Worldwide",
    value: "US",
  }
  
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    // Check if the slug is "Worldwide" and set country accordingly
    if (slug === "Worldwide") {
      setCountry("");
      setLocation("");
    } else {
      setCountry(slug);
      setLocation(slug);
    }


    
  }, [slug]);
  

  const [value, setValue] = useState({
    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days before
    endDate: new Date(),
  });

  const handleDateValueChange = (newValue: any) => {
    console.log("New Date:", newValue);
    setValue(newValue);
  };

  const handleCountryValueChange = (newValue: any) => {
    console.log("New Country:", newValue);
    setCountry(newValue);
    console.log(country)
    console.log("Changeing country")
    // Check if newValue is an empty string
    const route = newValue === "" ? "/traffic/Worldwide" : `/traffic/${newValue}`;
    
    // Use router.push to navigate to the desired route
    router.push(route);
    
    
  }




  //traffic volume
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/charts/TrafficVolumeXY/fetch?location=${slug}`);
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`${error}`);
        }
        const jsonData = await response.json();

        console.log("Data", jsonData)


        const timestamps = jsonData.series.data.result.current.timestamps.map((timestamp: any) => timestamp);
        const values = jsonData.series.data.result.current.values.map((value: any) => value);

        var chartDom = document.getElementById('volume');
        var myChart = echarts.init(chartDom);
        var option;

        // Create data array using timestamps and values
        let data = timestamps.map((timestamp: any, index: any) => [+new Date(timestamp), values[index]]);

        option = {
          tooltip: {
            trigger: 'axis',
            position: function (pt: any) {
              return [pt[0], '10%'];
            }
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'time',
            boundaryGap: false
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 20
            },
            {
              start: 0,
              end: 20
            }
          ],
          series: [
            {
              name: 'Traffic Volume',
              type: 'line',
              smooth: true,
              symbol: 'none',
              areaStyle: {},
              data: data
            }
          ]
        };

        option && myChart.setOption(option);

        // Cleanup function
        return () => {
          myChart.dispose();
        };

      }
      catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []); // Run only once on mount





  //Security & Attacks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/charts/Layer7AttacksBubble/fetch?location=${slug}`);
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`${error}`);
        }
        const jsonData = await response.json();
        console.log("Data", jsonData)
        console.log("Map started")
        const MapLayer7AttacksBubbleData = jsonData.series.data.result.series
        console.log("Map completeed")


        var chartDom = document.getElementById('SecurityandAttacks');
        var myChart = echarts.init(chartDom);
        var option;

        option = {

          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: Math.round(MapLayer7AttacksBubbleData.WAF * 10) / 10, name: `WAF ${Math.round(MapLayer7AttacksBubbleData.WAF * 10) / 10}%` },
                { value: Math.round(MapLayer7AttacksBubbleData.DDOS * 10) / 10, name: `DDOS ${Math.round(MapLayer7AttacksBubbleData.DDOS * 10) / 10}%` },
                { value: Math.round(MapLayer7AttacksBubbleData.IP_REPUTATION * 10) / 10, name: `IP_REPUTATION ${Math.round(MapLayer7AttacksBubbleData.IP_REPUTATION * 10) / 10}%` },
                { value: Math.round(MapLayer7AttacksBubbleData.ACCESS_RULES * 10) / 10, name: `OTHERS ${Math.round(MapLayer7AttacksBubbleData.ACCESS_RULES * 10) / 10}%` },

              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };


        option && myChart.setOption(option);

        // Cleanup function
        return () => {
          myChart.dispose();
        };

      }
      catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []); // Run only once on mount




  //Layer34AttacksBubble
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/charts/Layer34AttacksBubble/fetch?location=${slug}`);
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`${error}`);
        }
        const jsonData = await response.json();
        console.log("Data", jsonData)

        const MapLayer34AttacksBubbleData = jsonData.response.data.result.series


        var chartDom = document.getElementById('Layer34AttacksBubble');
        var myChart = echarts.init(chartDom);
        var option;


        option = {

          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: Math.round(MapLayer34AttacksBubbleData.TCP * 10) / 10, name: `TCP ${Math.round(MapLayer34AttacksBubbleData.TCP * 10) / 10}%` },
                { value: Math.round(MapLayer34AttacksBubbleData.UDP * 10) / 10, name: `UDP ${Math.round(MapLayer34AttacksBubbleData.UDP * 10) / 10}%` },
                { value: Math.round(MapLayer34AttacksBubbleData.ICMP * 10) / 10, name: `OTHERS ${Math.round(MapLayer34AttacksBubbleData.ICMP * 10) / 10}%` },

              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        option && myChart.setOption(option);

        // Cleanup function
        return () => {
          myChart.dispose();
        }

      }
      catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []); // Run only once on mount




  //IpVersionBubble
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/charts/IpVersionBubble/fetch?location=${slug}`);
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`${error}`);
        }
        const jsonData = await response.json();
        console.log("Data", jsonData)

        const MapIpVersionBubbleData = jsonData.series.data.result.series


        var chartDom = document.getElementById('IpVersionBubble');
        var myChart = echarts.init(chartDom);
        var option;


        option = {

          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: Math.round(MapIpVersionBubbleData.IPv4 * 10) / 10, name: `IPv4 ${Math.round(MapIpVersionBubbleData.IPv4 * 10) / 10}%` },
                { value: Math.round(MapIpVersionBubbleData.IPv6 * 10) / 10, name: `IPv6 ${Math.round(MapIpVersionBubbleData.IPv6 * 10) / 10}%` },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        option && myChart.setOption(option);

        // Cleanup function
        return () => {
          myChart.dispose();
        };

      }
      catch (err) {
        console.error(err);
      }
    }
    fetchData();


  }, []); // Run only once on mount

  // HttpVersionBubbleData



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/charts/HttpVersionBubble/fetch?location=${slug}`);
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`${error}`);
        }
        const jsonData = await response.json();
        console.log("Data", jsonData)


        const MapHttpVersionBubbleData = jsonData.series.data.result.series



        var chartDom = document.getElementById('HttpVersionBubbleData');
        var myChart = echarts.init(chartDom);
        var option;


        option = {

          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                {
                  value: Math.round(MapHttpVersionBubbleData["HTTP/2"] * 10) / 10, name: `HTTP/2 ${Math.round(MapHttpVersionBubbleData["HTTP/2"] * 10) / 10}%`,
                  color: 'red',

                },
                { value: Math.round(MapHttpVersionBubbleData["HTTP/3"] * 10) / 10, name: `HTTP/3 ${Math.round(MapHttpVersionBubbleData["HTTP/3"] * 10) / 10}%` },
                { value: Math.round(MapHttpVersionBubbleData["HTTP/1.x"] * 10) / 10, name: `HTTP/1.x ${Math.round(MapHttpVersionBubbleData["HTTP/1.x"] * 10) / 10}%` },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        option && myChart.setOption(option);

        // Cleanup function
        return () => {
          myChart.dispose();
        };

      }
      catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []); // Run only once on mount


  //TrafficTrendsXY



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/charts/TrafficTrendsXY/fetch?location=${slug}`);
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`${error}`);
        }
        const jsonData = await response.json();
        console.log("Data", jsonData)

        const MapTrafficTrendsXYData = jsonData.series.data.result

        var chartDom = document.getElementById('TrafficTrendsXY');
        var myChart = echarts.init(chartDom);
        var option;

        const timestamps = MapTrafficTrendsXYData.total.timestamps.map((timestamp: any) => timestamp);

        const TotalTraffic = MapTrafficTrendsXYData.total.values.map((value: any) => Math.round(value * 100) / 100);
        const TotalTrafficPrev = MapTrafficTrendsXYData.totalPrevious.values.map((value: any) => Math.round(value * 100) / 100);
        const Http = MapTrafficTrendsXYData.http.values.map((value: any) => Math.round(value * 100) / 100);
        const HttpPrev = MapTrafficTrendsXYData.httpPrevious.values.map((value: any) => Math.round(value * 100) / 100);



        option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Total Traffic', 'Total Traffic (Previous 7 days)', 'Http', 'Http (Previous 7 days)']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: timestamps
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Total Traffic',
              type: 'line',
              showSymbol: false,
              data: TotalTraffic

            },
            {
              name: 'Total Traffic (Previous 7 days)',
              type: 'line',
              showSymbol: false,
              data: TotalTrafficPrev
            },
            {
              name: 'Http',
              type: 'line',
              showSymbol: false,
              data: Http
            },
            {
              name: 'Http (Previous 7 days)',
              type: 'line',
              showSymbol: false,
              data: HttpPrev
            }
          ]
        };

        option && myChart.setOption(option);

        // Cleanup function
        return () => {
          myChart.dispose();
        };

      }
      catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []); // Run only once on mount


  const [globalTopASNData, setGlobalTopASNData] = useState<any[]>([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/charts/TopAsnList/fetch?location=${slug}`);
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`${error}`);
        }
        const jsonData = await response.json();

        console.log("Data", jsonData)
        const TopASNdata = jsonData.series.data.result.asns.map((value: any) => ({
          clientASN: value.asn,
          clientASName: value.name  ,
        }));

        // Update the global state with the TopASNdata
        setGlobalTopASNData(TopASNdata);
        console.log(globalTopASNData)

      }
      catch (err) {
        console.error(err);
      }
    }
    fetchData();

  }
    , []); // Run only once on mount'







  return (
    <div className="relative bg-gray-200">
      <div className="pt-8 flex flex-col md:flex-row">
        <h2 className="text-2xl font-bold  text-gray-800 pl-5 pt-7">Traffic</h2>
        <div className="w-full md:w-96 px-5 ">
          <label className="block text-sm font-medium text-gray-700">
            Select a country
          </label>
          <CountrySelector
            id={"country-selector"}
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            onChange={handleCountryValueChange}
            selectedValue={COUNTRIES.find((option) => option.value === country) || COUNTRIES[0]}
          />
        </div>

        <div className="w-full md:w-2/12 mt-5 md:mt-0 ml-auto">
          <label className="block text-sm font-medium text-gray-700">
            Select a date
          </label>
          <Datepicker
            primaryColor={"blue"}
            value={value}
            onChange={handleDateValueChange}
            showShortcuts={true}
          />
        </div>
      </div>

      <div className="bg-gray-200 p-4">
        {/* First Row */}
        <div className="flex flex-col md:flex-row">
          {/* First Half */}
          <div className="w-full md:w-2/3 border p-4 mb-4 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 p-4">Traffic Volume</h2>
            <p className="pl-4 text-l text-gray-400 font-bold">Traffic Volume relative change from the previous period</p>
            <div id="volume" className='overflow-hidden h-96'></div>
          </div>

          {/* Second Half */}
          <div className="w-full md:w-1/3 border p-4 mb-4 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 p-4">Autonomous Systems</h2>
            <p className="pl-4 text-l text-gray-400 font-bold">Top five ASNs based on traffic volume</p>



            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ASN
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {globalTopASNData.map((item: any, index: any) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <a href={`/AS${item.clientASN}`} rel="noreferrer">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          AS{item.clientASN}
                        </th>
                      </a>
                      <td className="px-6 py-4">
                        {item.clientASName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>
        </div>



        {/* Second Row */}
        <div className="border p-4 flex flex-col md:flex-row ">
          {/* First Column (3/4 width on medium and larger screens) */}
          <div className="w-full md:w-3/5 border p-4 mb-4 md:mr-4 bg-white">


            <div className="border p-4 mb-4 bg-white">
              <h2 className="text-2xl font-bold text-gray-800 p-4">Traffic Trends</h2>
              <p className="pl-4 text-l text-gray-400 font-bold">Traffic volume over the selected time period</p>
              <div id="TrafficTrendsXY" className='overflow-hidden ' style={{ height: 600 }}></div>

            </div>

            {/* Second Column - Second Row */}
            <div className="border p-4 bg-white">
              <h4 className="text-2xl font-bold text-gray-800 p-4">Adoption & Usage</h4>
              <p className="pl-4 text-l text-gray-400 font-bold">Insight into adoption and usage of key protocols</p>
              <div className=' flex flex-col md:flex-row'>
                <div className="w-full md:w-1/2 border p-4 mb-4 bg-white">
                  <h2 className="text-2xl font-bold text-gray-800 p-4">Internet Protocol versions</h2>
                  <p className="pl-4 text-l text-gray-400 font-bold">IPv4 vs. IPv6</p>
                  <div id="IpVersionBubble" className='overflow-hidden ' style={{ height: 500 }}></div>
                </div>

                {/* Second Half */}
                <div className="w-full md:w-1/2 border p-4 mb-4 bg-white">
                  <h2 className="text-2xl font-bold text-gray-800 p-4">HTTP versions</h2>
                  <p className="pl-4 text-l text-gray-400 font-bold">HTTP/1.x vs. HTTP/2 vs. HTTP/3</p>
                  <div id="HttpVersionBubbleData" className='overflow-hidden' style={{ height: 500 }}></div>


                </div>
              </div>

            </div>

          </div>

          {/* Second Column (1/4 width on medium and larger screens) */}
          <div className="w-full md:w-2/5 border p-4 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 p-4">Security & Attacks</h2>
            <p className="pl-4 text-l text-gray-400 font-bold">Insight into network and application layer attack traffic</p>
            {/* Second Column - First Row */}
            <div className="border p-4 mb-4 bg-white">
              <h4 className="text-2xl font-bold text-gray-800 p-4">Layer 7 Attacks</h4>
              <p className="pl-4 text-l text-gray-400 font-bold">Top Mitigation Techniques</p>
              <div id="SecurityandAttacks" className='overflow-hidden' style={{ height: 500 }}></div>
            </div>

            {/* Second Column - Second Row */}
            <div className="border p-4 bg-white">
              <h4 className="text-2xl font-bold text-gray-800 p-4">Layer 3/4 Attacks</h4>
              <p className="pl-4 text-l text-gray-400 font-bold">DDoS Attack Type</p>
              <div id="Layer34AttacksBubble" className='overflow-hidden' style={{ height: 500 }}></div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}