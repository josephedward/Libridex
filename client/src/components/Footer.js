import React from "react";
import { Header } from 'semantic-ui-react'

function Footer (){
    return(
<div 

style={{bottom:"0%!important"}}
className="layout text-center lightblue"><Header className="border" inverted color="black">
    {/* "This is the Footer component" */}
&copy; Joseph Edward
</Header>
</div>
    )
}

export default Footer