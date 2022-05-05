import * as Config from '@/config'
import {post,get,patch,del} from '@/api/http-request' // eslint-disable-line no-unused-vars
//import axios from "axios";

const endpoint='/support-scheduler'
const version2='/api/v2'
// const apiVersion='v2'
const urlPrefixV2=`${Config.HTTP_SERVER}${endpoint}${version2}`
const intervalUrl=`${urlPrefixV2}/interval`
const intervalActionUrl=`${urlPrefixV2}/intervalaction`

export function addInterval(interval,success,error,final){
    console.log(interval)
    let data=[{
        apiVersion:'v2',
        interval:interval,
    }];
    console.log(JSON.stringify(data))
    return post(intervalUrl,JSON.stringify(data),success,error,final)
}

export function updateInterval(interval,success,error,final){
    let data=[{
       apiVersion:'v2',
        interval:interval
    }];
    console.log(JSON.stringify(data))
    return patch(`${intervalUrl}`,JSON.stringify(data),success,error,final)
}

export function getAllInterval(success,error,final){
    return get(`${intervalUrl}/all`,success,error,final);
}

export function getIntervalByName(name,success,error,final){
    return get(`${intervalUrl}/name/${name}`,success,error,final);
}
//
export function deleteInterval(name,success,error,final){
    //console.log(name)
    return del(`${intervalUrl}/name/${name}`,success,error,final);
}

export function addIntervalAction(intervalAction,success,error,final){
    console.log(intervalAction)
    let data=[{
        apiVersion:'v2',
        action:intervalAction,
    }]
    console.log(data)
    return post(intervalActionUrl,JSON.stringify(data),success,error,final)
}


export function updateIntervalAction(intervalAction,success,error,final){
    let data=[{
       apiVersion:'v2',
       action:intervalAction,
    }];
    console.log(JSON.stringify(data))
    return patch(`${intervalActionUrl}`,JSON.stringify(data),success,error,final)
}

export function getAllIntervalAction(success,error,final){
    return get(`${intervalActionUrl}/all`,success,error,final);
}
//
export function getIntervalActionByName(actionName,success,error,final){
    return get(`${intervalActionUrl}/name/${actionName}`,success,error,final);
}
//
export function deleteIntervalAction(actionName,success,error,final){
    //console.log(actionName)
    return del(`${intervalActionUrl}/name/${actionName}`,success,error,final);
}