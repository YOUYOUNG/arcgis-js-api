// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define({measures:{length:"ความยาว",area:"พื้นที่",volume:"ปริมาตร",angle:"มุม"},units:{millimeters:{singular:"มิลลิเมตร",plural:"มิลลิเมตร",abbr:"มม."},centimeters:{singular:"เซนติเมตร",plural:"เซนติเมตร",abbr:"ซม."},decimeters:{singular:"เดซิเมตร",plural:"เดซิเมตร",abbr:"ดม."},meters:{singular:"เมตร",plural:"เมตร",abbr:"ม."},kilometers:{singular:"กิโลเมตร",plural:"กิโลเมตร",abbr:"กม."},inches:{singular:"นิ้ว",plural:"นิ้ว",abbr:"ใน"},feet:{singular:"ฟุต",plural:"ฟุต",abbr:"ฟุต"},yards:{singular:"หลา",plural:"หลา",abbr:"หลา"},miles:{singular:"ไมล์",plural:"ไมล์",abbr:"ไมล์"},"nautical-miles":{singular:"ไมล์ทะเล",plural:"ไมล์ทะเล",abbr:"นาโนเมตร"},"us-feet":{singular:"ฟุต (สหรัฐฯ)",plural:"ฟุต (สหรัฐฯ)",abbr:"ฟุต"},"square-millimeters":{singular:"ตารางมิลลิเมตร",plural:"ตารางมิลลิเมตร",abbr:"ตร.มม."},"square-centimeters":{singular:"ตารางเซนติเมตร",plural:"ตารางเซนติเมตร",abbr:"ตร.ซม."},"square-decimeters":{singular:"ตารางเดซิเมตร",plural:"ตารางเดซิเมตร",abbr:"ตร.ดม."},"square-meters":{singular:"ตารางเมตร",plural:"ตารางเมตร",abbr:"ตารางเมตร"},"square-kilometers":{singular:"ตารางกิโลเมตร",plural:"ตารางกิโลเมตร",abbr:"ตารางกิโลเมตร"},"square-inches":{singular:"ตารางนิ้ว",plural:"ตารางนิ้ว",abbr:"ตร.นิ้ว"},"square-feet":{singular:"ตารางฟุต",plural:"ตารางฟุต",abbr:"ตร.ฟุต"},"square-yards":{singular:"ตารางหลา",plural:"ตารางหลา",abbr:"ตร.หลา"},"square-miles":{singular:"ตารางไมล์",plural:"ตารางไมล์",abbr:"ตารางไมล์"},"square-us-feet":{singular:"ตารางฟุต (สหรัฐฯ)",plural:"ตารางฟุต (สหรัฐฯ)",abbr:"ตร.ฟุต"},acres:{singular:"เอเคอร์",plural:"เอเคอร์",abbr:"เอเคอร์"},ares:{singular:"เอเคอร์",plural:"เอเคอร์",abbr:"เอ"},hectares:{singular:"เฮคเตอร์",plural:"เฮคเตอร์",abbr:"เฮกตาร์"},liters:{singular:"ลิตร",plural:"ลิตร",abbr:"ลิตร"},"cubic-millimeters":{singular:"ลูกบาศก์มิลลิเมตร",plural:"ลูกบาศก์มิลลิเมตร",abbr:"ลบ.มม."},"cubic-centimeters":{singular:"ลูกบาศก์เซนติเมตร",plural:"ลูกบาศก์เซนติเมตร",abbr:"ลบ.ซม."},"cubic-decimeters":{singular:"ลูกบาศก์เดซิเมตร",plural:"ลูกบาศก์เดซิเมตร",abbr:"ลบ.ดม."},"cubic-meters":{singular:"ลูกบาศก์เมตร",plural:"ลูกบาศก์เมตร",abbr:"ลบ.ม."},"cubic-kilometers":{singular:"ลูกบาศก์กิโลเมตร",plural:"ลูกบาศก์กิโลเมตร",abbr:"ลบ.กม."},"cubic-inches":{singular:"ลูกบาศก์นิ้ว",plural:"ลูกบาศก์นิ้ว",abbr:"ลบ.นิ้ว"},"cubic-feet":{singular:"ลูกบาศก์ฟุต",plural:"ลูกบาศก์ฟุต",abbr:"ลบ.ฟุต"},"cubic-yards":{singular:"ลูกบาศก์หลา",plural:"ลูกบาศก์หลา",abbr:"ลบ.หลา"},"cubic-miles":{singular:"ลูกบาศก์ไมล์",plural:"ลูกบาศก์ไมล์",abbr:"ลบ.ไมล์"},radians:{singular:"เรเดียน",plural:"เรเดียน",abbr:""},degrees:{singular:"องศา",plural:"องศา",abbr:"°"}}});