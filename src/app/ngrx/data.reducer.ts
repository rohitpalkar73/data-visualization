import { createReducer, on } from "@ngrx/store";
import { addChart, addData, deleteData, addFirebaseData } from "./data.action";

const data: any[] = [
    {
        "id": "9876543210",
        "data": [
            {
                "Level": "India",
                "Name": "India",
                "TRU": "Total",
                "Population": "17"
            },
            {
                "Level": "India",
                "Name": "JAMMU & KASHMIR",
                "TRU": "Rural",
                "Population": "14"
            },
            {
                "Level": "India",
                "Name": "HIMACHAL PRADESH",
                "TRU": "Urban",
                "Population": "10"
            },
            {
                "Level": "STATE",
                "Name": "PUNJAB",
                "TRU": "Total",
                "Population": "19"
            },
            {
                "Level": "STATE",
                "Name": "CHANDIGARH",
                "TRU": "Rural",
                "Population": "10"
            },
            {
                "Level": "STATE",
                "Name": "UTTARAKHAND",
                "TRU": "Urban",
                "Population": "17"
            },
            {
                "Level": "STATE",
                "Name": "HARYANA",
                "TRU": "Total",
                "Population": "16"
            },
            {
                "Level": "STATE",
                "Name": "NCT OF DELHI",
                "TRU": "Rural",
                "Population": "12"
            },
            {
                "Level": "STATE",
                "Name": "RAJASTHAN",
                "TRU": "Urban",
                "Population": "20"
            },
            {
                "Level": "STATE",
                "Name": "UTTAR PRADESH",
                "TRU": "Total",
                "Population": "19"
            },
            {
                "Level": "STATE",
                "Name": "BIHAR",
                "TRU": "Rural",
                "Population": "12"
            },
            {
                "Level": "STATE",
                "Name": "SIKKIM",
                "TRU": "Urban",
                "Population": "13"
            },
            {
                "Level": "STATE",
                "Name": "ARUNACHAL PRADESH",
                "TRU": "Total",
                "Population": "16"
            },
            {
                "Level": "STATE",
                "Name": "NAGALAND",
                "TRU": "Rural",
                "Population": "17"
            },
            {
                "Level": "STATE",
                "Name": "MANIPUR",
                "TRU": "Urban",
                "Population": "18"
            },
            {
                "Level": "STATE",
                "Name": "MIZORAM",
                "TRU": "Total",
                "Population": "16"
            },
            {
                "Level": "STATE",
                "Name": "TRIPURA",
                "TRU": "Rural",
                "Population": "13"
            },
            {
                "Level": "STATE",
                "Name": "MEGHALAYA",
                "TRU": "Urban",
                "Population": "15"
            },
            {
                "Level": "STATE",
                "Name": "ASSAM",
                "TRU": "Total",
                "Population": "20"
            },
            {
                "Level": "STATE",
                "Name": "WEST BENGAL",
                "TRU": "Rural",
                "Population": "20"
            },
            {
                "Level": "STATE",
                "Name": "JHARKHAND",
                "TRU": "Urban",
                "Population": "13"
            },
            {
                "Level": "STATE",
                "Name": "ODISHA",
                "TRU": "Total",
                "Population": "14"
            },
            {
                "Level": "STATE",
                "Name": "CHHATTISGARH",
                "TRU": "Rural",
                "Population": "18"
            },
            {
                "Level": "STATE",
                "Name": "MADHYA PRADESH",
                "TRU": "Urban",
                "Population": "14"
            },
            {
                "Level": "STATE",
                "Name": "GUJARAT",
                "TRU": "Total",
                "Population": "11"
            },
            {
                "Level": "STATE",
                "Name": "DAMAN & DIU",
                "TRU": "Rural",
                "Population": "16"
            },
            {
                "Level": "STATE",
                "Name": "DADRA & NAGAR HAVELI",
                "TRU": "Urban",
                "Population": "12"
            },
            {
                "Level": "STATE",
                "Name": "MAHARASHTRA",
                "TRU": "Total",
                "Population": "14"
            },
            {
                "Level": "STATE",
                "Name": "ANDHRA PRADESH",
                "TRU": "Rural",
                "Population": "20"
            },
            {
                "Level": "STATE",
                "Name": "KARNATAKA",
                "TRU": "Urban",
                "Population": "15"
            },
            {
                "Level": "STATE",
                "Name": "GOA",
                "TRU": "Total",
                "Population": "16"
            },
            {
                "Level": "STATE",
                "Name": "LAKSHADWEEP",
                "TRU": "Rural",
                "Population": "16"
            },
            {
                "Level": "STATE",
                "Name": "KERALA",
                "TRU": "Urban",
                "Population": "15"
            },
            {
                "Level": "STATE",
                "Name": "TAMIL NADU",
                "TRU": "Total",
                "Population": "12"
            },
            {
                "Level": "STATE",
                "Name": "PUDUCHERRY",
                "TRU": "Rural",
                "Population": "20"
            },
            {
                "Level": "STATE",
                "Name": "ANDAMAN & NICOBAR ISLANDS",
                "TRU": "Urban",
                "Population": "17"
            }
        ],
        "headers": [
            {
                "key": "Level",
                "value": "Level"
            },
            {
                "key": "Name",
                "value": "Name"
            },
            {
                "key": "TRU",
                "value": "TRU"
            },
            {
                "key": "Population",
                "value": "Population"
            }
        ],
        "name": "Charts Demo",
        "charts": [
            {
                "type": "Bar",
                "xAxis": "Name",
                "yAxis": "Population",
                "height": 400,
                "width": 1560,
                "yScale": 25
            },
            {
                "type": "MultiBar",
                "height": 500,
                "width": 1500,
                "xAxis": "TRU",
                "yAxis": "Population",
                "groupBy": "Level"
            },
            {
                "type": "Pie",
                "xAxis": "TRU",
                "yAxis": "Population",
                "height": 500,
                "width": 450,
                "radius": 220,
                "fontsize": 20
            },
            {
                "type": "Line",
                "xAxis": "Population",
                "yAxis": "Population",
                "height": 400,
                "width": 1560
            }
        ]
    },
    {
        "data": [
            {
                "State": "Karnataka",
                "City": "Nanjangud Mysore",
                "Latitude": "12.12",
                "Longitude": "76.68"
            },
            {
                "State": "Rajasthan",
                "City": "Chittorgarh",
                "Latitude": "24.879999",
                "Longitude": "74.629997"
            },
            {
                "State": "Maharashtra",
                "City": "Ratnagiri",
                "Latitude": "16.994444",
                "Longitude": "73.300003"
            },
            {
                "State": "Maharashtra",
                "City": "Goregaon Mumbai",
                "Latitude": "19.155001",
                "Longitude": "72.849998"
            },
            {
                "State": "Rajasthan",
                "City": "Pindwara",
                "Latitude": "24.7945",
                "Longitude": "73.055"
            },
            {
                "State": "Chhattisgarh",
                "City": "Raipur",
                "Latitude": "21.25",
                "Longitude": "81.629997"
            },
            {
                "State": "Karnataka",
                "City": "Gokak",
                "Latitude": "16.1667",
                "Longitude": "74.833298"
            },
            {
                "State": "Uttar Pradesh",
                "City": "Lucknow",
                "Latitude": "26.85",
                "Longitude": "80.949997"
            },
            {
                "State": "Delhi",
                "City": "Delhi",
                "Latitude": "28.679079",
                "Longitude": "77.06971"
            },
            {
                "State": "Maharashtra",
                "City": "Mumbai",
                "Latitude": "19.07609",
                "Longitude": "72.877426"
            },
            {
                "State": "Karnataka",
                "City": "Sagar",
                "Latitude": "14.16704",
                "Longitude": "75.040298"
            },
            {
                "State": "West Bengal",
                "City": "Jalpaiguri",
                "Latitude": "26.540457",
                "Longitude": "88.719391"
            },
            {
                "State": "Jharkhand",
                "City": "Pakur",
                "Latitude": "24.633568",
                "Longitude": "87.849251"
            },
            {
                "State": "Rajasthan",
                "City": "Sardarshahar",
                "Latitude": "28.440554",
                "Longitude": "74.493011"
            },
            {
                "State": "Rajasthan",
                "City": "Sirohi",
                "Latitude": "24.882618",
                "Longitude": "72.858894"
            },
            {
                "State": "Maharashtra",
                "City": "Jaysingpur",
                "Latitude": "16.779877",
                "Longitude": "74.556374"
            },
            {
                "State": "Karnataka",
                "City": "Ramanagara",
                "Latitude": "12.715035",
                "Longitude": "77.281296"
            },
            {
                "State": "Karnataka",
                "City": "Chikkaballapura",
                "Latitude": "13.432515",
                "Longitude": "77.727478"
            },
            {
                "State": "Karnataka",
                "City": "Channapatna",
                "Latitude": "12.651805",
                "Longitude": "77.208946"
            },
            {
                "State": "Gujarat",
                "City": "Surendranagar",
                "Latitude": "22.728392",
                "Longitude": "71.637077"
            },
            {
                "State": "Kerala",
                "City": "Thiruvalla",
                "Latitude": "9.383452",
                "Longitude": "76.574059"
            },
            {
                "State": "Karnataka",
                "City": "Ranebennur",
                "Latitude": "14.623801",
                "Longitude": "75.621788"
            },
            {
                "State": "Puducherry",
                "City": "Karaikal",
                "Latitude": "10.92544",
                "Longitude": "79.838005"
            },
            {
                "State": "Karnataka",
                "City": "Belgaum",
                "Latitude": "15.852792",
                "Longitude": "74.498703"
            },
            {
                "State": "Odisha",
                "City": "Chatrapur",
                "Latitude": "19.354979",
                "Longitude": "84.986732"
            },
            {
                "State": "West Bengal",
                "City": "Suri",
                "Latitude": "23.905445",
                "Longitude": "87.52462"
            },
            {
                "State": "Odisha",
                "City": "Bhubaneswar",
                "Latitude": "20.296059",
                "Longitude": "85.824539"
            },
            {
                "State": "Gujarat",
                "City": "Mahuva",
                "Latitude": "21.105001",
                "Longitude": "71.771645"
            },
            {
                "State": "Haryana",
                "City": "Jagadhri",
                "Latitude": "30.172716",
                "Longitude": "77.299492"
            },
            {
                "State": "Bihar",
                "City": "Barh",
                "Latitude": "25.477585",
                "Longitude": "85.709091"
            },
            {
                "State": "Maharashtra",
                "City": "Bhusawal",
                "Latitude": "21.045521",
                "Longitude": "75.801094"
            },
            {
                "State": "West Bengal",
                "City": "Alipurduar",
                "Latitude": "26.49189",
                "Longitude": "89.5271"
            },
            {
                "State": "Kerala",
                "City": "Kollam",
                "Latitude": "8.893212",
                "Longitude": "76.614143"
            },
            {
                "State": "West Bengal",
                "City": "Medinipur",
                "Latitude": "22.430889",
                "Longitude": "87.321487"
            },
            {
                "State": "Gujarat",
                "City": "Patan",
                "Latitude": "23.849325",
                "Longitude": "72.126625"
            },
            {
                "State": "Tamil Nadu",
                "City": "Mettur",
                "Latitude": "11.786253",
                "Longitude": "77.800781"
            },
            {
                "State": "Karnataka",
                "City": "Huliyar",
                "Latitude": "13.583274",
                "Longitude": "76.540154"
            },
            {
                "State": "Karnataka",
                "City": "Harihar",
                "Latitude": "14.530457",
                "Longitude": "75.801094"
            },
            {
                "State": "Maharashtra",
                "City": "Rasayani",
                "Latitude": "18.901457",
                "Longitude": "73.176132"
            },
            {
                "State": "West Bengal",
                "City": "Haringhata",
                "Latitude": "22.96051",
                "Longitude": "88.567406"
            },
            {
                "State": "Karnataka",
                "City": "Kushtagi",
                "Latitude": "15.756595",
                "Longitude": "76.192696"
            },
            {
                "State": "Jharkhand",
                "City": "Jadugora",
                "Latitude": "22.656015",
                "Longitude": "86.352882"
            },
            {
                "State": "Uttar Pradesh",
                "City": "Orai",
                "Latitude": "25.989836",
                "Longitude": "79.450035"
            },
            {
                "State": "Chhattisgarh",
                "City": "Surajpur",
                "Latitude": "23.223047",
                "Longitude": "82.87056"
            },
            {
                "State": "Maharashtra",
                "City": "Ambernath",
                "Latitude": "19.186354",
                "Longitude": "73.191948"
            },
            {
                "State": "Punjab",
                "City": "Malerkotla",
                "Latitude": "30.525005",
                "Longitude": "75.890121"
            },
            {
                "State": "Jharkhand",
                "City": "Jorapokhar",
                "Latitude": "22.422455",
                "Longitude": "85.760651"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Vizianagaram",
                "Latitude": "18.106659",
                "Longitude": "83.395554"
            },
            {
                "State": "Chhattisgarh",
                "City": "Durg",
                "Latitude": "21.190449",
                "Longitude": "81.28492"
            },
            {
                "State": "Gujarat",
                "City": "Himmatnagar",
                "Latitude": "23.597969",
                "Longitude": "72.969818"
            },
            {
                "State": "Uttar Pradesh",
                "City": "Sambhal",
                "Latitude": "28.590361",
                "Longitude": "78.571762"
            },
            {
                "State": "Bihar",
                "City": "Harnaut",
                "Latitude": "25.369179",
                "Longitude": "85.53006"
            },
            {
                "State": "Andaman and Nicobar Islands",
                "City": "Port Blair",
                "Latitude": "11.623377",
                "Longitude": "92.726486"
            },
            {
                "State": "West Bengal",
                "City": "Suti",
                "Latitude": "24.618393",
                "Longitude": "88.024338"
            },
            {
                "State": "Rajasthan",
                "City": "Banswara",
                "Latitude": "23.546757",
                "Longitude": "74.43383"
            },
            {
                "State": "West Bengal",
                "City": "Manikchak",
                "Latitude": "25.077787",
                "Longitude": "87.900375"
            },
            {
                "State": "Uttarakhand",
                "City": "Roorkee",
                "Latitude": "29.854263",
                "Longitude": "77.888"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Kavali",
                "Latitude": "14.913181",
                "Longitude": "79.992981"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Dharmavaram",
                "Latitude": "14.413745",
                "Longitude": "77.712616"
            },
            {
                "State": "Telangana",
                "City": "Siddipet",
                "Latitude": "18.101904",
                "Longitude": "78.852074"
            },
            {
                "State": "Madhya Pradesh",
                "City": "Dhanpuri",
                "Latitude": "23.173939",
                "Longitude": "81.565125"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Chirala",
                "Latitude": "15.812074",
                "Longitude": "80.355377"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Markapur",
                "Latitude": "15.764501",
                "Longitude": "79.259491"
            },
            {
                "State": "Kerala",
                "City": "Chalakudy",
                "Latitude": "10.311879",
                "Longitude": "76.331978"
            },
            {
                "State": "Gujarat",
                "City": "Gondal",
                "Latitude": "21.961946",
                "Longitude": "70.792297"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Bhimavaram",
                "Latitude": "16.544893",
                "Longitude": "81.52124"
            },
            {
                "State": "Maharashtra",
                "City": "Jalgaon Jamod",
                "Latitude": "21.04954",
                "Longitude": "76.532028"
            },
            {
                "State": "Guwahati Assam",
                "City": "Paltan Bazaar",
                "Latitude": "26.182245",
                "Longitude": "91.754723"
            },
            {
                "State": "Haryana",
                "City": "Hodal",
                "Latitude": "27.897551",
                "Longitude": "77.384117"
            },
            {
                "State": "Maharashtra",
                "City": "Ausa",
                "Latitude": "18.245655",
                "Longitude": "76.505356"
            },
            {
                "State": "Madhya Pradesh",
                "City": "Mahidpur",
                "Latitude": "23.486839",
                "Longitude": "75.659157"
            },
            {
                "State": "Punjab",
                "City": "Gurdaspur",
                "Latitude": "32.041943",
                "Longitude": "75.405334"
            },
            {
                "State": "Jharkhand",
                "City": "Domchanch",
                "Latitude": "24.47438",
                "Longitude": "85.688744"
            },
            {
                "State": "West Bengal",
                "City": "Barjora",
                "Latitude": "23.427221",
                "Longitude": "87.287018"
            },
            {
                "State": "Paithen Maharashtra",
                "City": "Saint Dnyaneshwar Garden and Paithan park",
                "Latitude": "19.487707",
                "Longitude": "75.380768"
            },
            {
                "State": "Maharashtra",
                "City": "Sinnar",
                "Latitude": "19.85306",
                "Longitude": "74.000633"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Guntakal",
                "Latitude": "15.167409",
                "Longitude": "77.373627"
            },
            {
                "State": "West Bengal",
                "City": "Lalgola",
                "Latitude": "24.417534",
                "Longitude": "88.250343"
            },
            {
                "State": "Madhya Pradesh",
                "City": "Hoshangabad",
                "Latitude": "22.744108",
                "Longitude": "77.736969"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Proddatur",
                "Latitude": "14.752805",
                "Longitude": "78.552757"
            },
            {
                "State": "Durgapur",
                "City": "RL Infotechh & Solutions",
                "Latitude": "23.520399",
                "Longitude": "87.311897"
            },
            {
                "State": "Rajasthan",
                "City": "Pali",
                "Latitude": "25.771315",
                "Longitude": "73.323685"
            },
            {
                "State": "Haryana",
                "City": "Palwal",
                "Latitude": "28.148735",
                "Longitude": "77.332024"
            },
            {
                "State": "Haryana",
                "City": "Gohana",
                "Latitude": "29.138407",
                "Longitude": "76.693245"
            },
            {
                "State": "Bihar",
                "City": "Munger",
                "Latitude": "25.37571",
                "Longitude": "86.474373"
            },
            {
                "State": "Maharashtra",
                "City": "Yavatmal",
                "Latitude": "20.388794",
                "Longitude": "78.120407"
            },
            {
                "State": "Jharkhand",
                "City": "Bokaro Steel City",
                "Latitude": "23.669296",
                "Longitude": "86.151115"
            },
            {
                "State": "Gujarat",
                "City": "Jetpur",
                "Latitude": "21.761524",
                "Longitude": "70.627625"
            },
            {
                "State": "West Bengal",
                "City": "Basirhat",
                "Latitude": "22.657402",
                "Longitude": "88.86718"
            },
            {
                "State": "West Bengal",
                "City": "Konnagar Mirpur",
                "Latitude": "22.700474",
                "Longitude": "88.319069"
            },
            {
                "State": "Jharkhand",
                "City": "Ranchi",
                "Latitude": "23.344315",
                "Longitude": "85.296013"
            },
            {
                "State": "Andhra Pradesh",
                "City": "Gudur",
                "Latitude": "14.146319",
                "Longitude": "79.850388"
            },
            {
                "State": "Uttar Pradesh",
                "City": "Gola Gokarannath",
                "Latitude": "28.078636",
                "Longitude": "80.471588"
            },
            {
                "State": "Uttar Pradesh",
                "City": "Shikohabad",
                "Latitude": "27.108416",
                "Longitude": "78.584602"
            },
            {
                "State": "Tamil Nadu",
                "City": "Tirumangalam",
                "Latitude": "9.823619",
                "Longitude": "77.986565"
            },
            {
                "State": "Tamil Nadu",
                "City": "Anakaputhur Sriperumbudur",
                "Latitude": "12.946366",
                "Longitude": "79.959244"
            },
            {
                "State": "Telangana",
                "City": "Suryapet",
                "Latitude": "17.143908",
                "Longitude": "79.623924"
            },
            {
                "State": "Karnataka",
                "City": "Udupi",
                "Latitude": "13.340881",
                "Longitude": "74.742142"
            }
        ],
        "headers": [
            {
                "key": "State",
                "value": "State"
            },
            {
                "key": "City",
                "value": "City"
            },
            {
                "key": "Latitude",
                "value": "Latitude"
            },
            {
                "key": "Longitude",
                "value": "Longitude"
            }
        ],
        "name": "Map Demo",
        "id": "8221465295",
        "charts": [
            {
                "latitude": "Latitude",
                "longitude": "Longitude",
                "label": "City",
                "type": "Map"
            }
        ]
    }
];

export const chartsReducer = createReducer(
    data,
    on(addData, (state, action) => {
        let data = [...state];
        data.push(action['csvData']);
        return [...data];
    }),
    on(addChart, (state, action) => {
        let data = JSON.parse(JSON.stringify(state))
        if (data) {
            data.forEach((each: any) => {
                if (each.id === action['id']) {
                    if (each['charts'] === undefined) each['charts'] = [];
                    each['charts'].push(action['property']);
                }
            });
        }
        return [...data];
    }),
    on(deleteData, (state, action) => {
        let data = [...state];
        data = data.filter((each: any) => each.id !== action['id']);
        return [...data];
    }),
    on(addFirebaseData, (state, action) => {
        let data = [...state];
        data.push(...action['csvData']['data']);
        return [...data];
    })
);