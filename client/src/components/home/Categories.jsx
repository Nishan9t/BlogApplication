
import {Button,Table, TableBody, TableCell, TableHead, TableRow,styled} from '@mui/material';
import { categories } from '../../constraints/data';

import {Link,useSearchParams} from "react-router-dom";
import { useState } from 'react';



const StyledTable=styled(Table)`
        border: 2px solid #083AA9;
`;

const StyledButton=styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #FFF;
    text-decoration:none;
`;  

const StyledLink=styled(Link)`
    text-decoration:none;
    color:inherit;
`;


const StyledCell=styled(TableCell)`
    border:2px solid #083AA9;
       
`;


const Categories=() =>{

    const [searchParams]=useSearchParams();

    const category=searchParams.get('category');


    return(
        <>
        <StyledLink to={`/create?category=${category || ''}`} >
            <StyledButton variant="contained"> Create BLog </StyledButton>
        </StyledLink>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <StyledLink to='/'>
                            All Categories
                        </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    categories.map(category=>(
                        <TableRow key={category.id}>
                            <StyledCell>
                            <StyledLink to={`?category=${category.type}`}>
                                {category.type}
                            </StyledLink>
                            </StyledCell>
                    </TableRow>
                    ))
                }
                    
                </TableBody>
            </StyledTable>
        </>
    );
}

export default Categories;