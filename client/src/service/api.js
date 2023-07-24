import { getTablePaginationUnstyledUtilityClass } from "@mui/base";
import axios from "axios";

import { API_NOTIFICATION_MESSAGES ,SERVICE_URLS} from "../constraints/config.js";
import { getAccessToken,getType } from "../utils/common-utils.js";

const API_URL="http://localhost:8000";

//creating an instance with custom config
const axiosInstance= axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers:{
        "content-type":"application/json"
    }
})

//You can intercept requests or responses before they are handled by then or catch

//adding a request interceptor
axiosInstance.interceptors.request.use(
    function(config){
        //do something before request is sent
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url=config.url + '/' + config.TYPE.query;
        }
        return config;
    }
    ,
    function(error){
        //do something with request error
        return Promise.reject(error);
    }
)


//adding a response interceptor
axiosInstance.interceptors.response.use(
    function(response){
        //stop global loader here 


         // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return processResponse(response);
    }
    ,
    function(error)
    {

         // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
        return Promise.reject(processError(error));    }
)


//if success=>return{isSucess:true, data:object}
//if fail=> return { isfailure :true, status :string ,msg:string ,code :int}

const processResponse=(response)=>{
    if(response.status===200){
        return {isSuccess:true,data:response.data}
    }
    else
    {
        return {
            isFailure:true,
            status :response?.status,
            msg: response?.msg,
            code:response?.code

        }
    }
}


const processError=(error)=>{
    if(error.response){
        //request is successful but server responded with a status other than range of 200
        console.log("error in response: ",error.toJSON());
        return {
                isError:true,
                msg: API_NOTIFICATION_MESSAGES.responseFailure,
                code: error.response.status
        }
    }
    else if(error.request){
        //request is successfull but no response is received
        console.log("error in request: ",error.toJSON());
        return {
                isError:true,
                msg: API_NOTIFICATION_MESSAGES.requestFailure,
                code: error.response.status
        }
    }
    else{
        //something happend in setting up request that triggers an error
        console.log("error in network: ",error.toJSON());
        return {
                isError:true,
                msg: API_NOTIFICATION_MESSAGES.networkFailure,
                
        }
    }
}


const API={};


//for of loop
for(const [key, value] of Object.entries(SERVICE_URLS))
{
    API[key]=(body, showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method: value.method,
            url:value.url,
            data: value.method==='DELETE'?{}:body,
            responseType: value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}

export {API};