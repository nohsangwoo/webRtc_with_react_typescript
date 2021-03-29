import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    ${reset};    
    * {
        /* box-sizing:border-box; */
        /* -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none; */
    }
    body {        
        background:#fff;
        color:black;
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;        
        height:100vh;
        overflow:auto;
    }
    a {
        color:${props => props.theme.blueColor};
        text-decoration:none;
        
    }
    input:focus{
        outline:none;
    }
`;
