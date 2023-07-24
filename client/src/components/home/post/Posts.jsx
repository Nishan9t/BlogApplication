
import {useEffect, useState} from 'react';
import {Box, Grid, Typography,styled} from '@mui/material';
import {useSearchParams,Link} from 'react-router-dom';


import {API} from '../../../service/api';
import Post from './Post.jsx';




const Posts=()=>{

    const [posts,setPosts]=useState([]);
    
    const [searchParams]=useSearchParams();
    const category=searchParams.get('category');
    
    useEffect(()=>{
            const fetchData=async()=>{
                let response= await API.getAllPosts({category:category||''});
                if(response.isSuccess)
                {
                    setPosts(response.data);
                    
                }
            }
            fetchData();
    },[category]);

   



    return(
       <>
       <Box style={{width:"100%",marginLeft:"10px",color:"#002E94"}}><Typography variant="h3">{category===null?"All Categories":category}</Typography></Box>
            

            {
                posts && posts.length > 0 ? posts.map(post =>(
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`details/${post._id}`} style={{textDecoration:"none",color:"inherit"}}>
                        <Post post={post}/>
                        </Link>
                    </Grid>
                )) : <Box style={{color: '#878787' , margin:'30px 80px', fontSize:18}}>No data available to display</Box>
            }

       </>
    )
}
export default Posts;